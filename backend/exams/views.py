from django.utils import timezone
from django.db import transaction
from django.db.models import Q

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from academics.models import Course, Department, Subject
from accounts.models import StaffAssignment
from .models import (
    Exam,
    ExamParticipation
)

from .serializers import (
    ExamSerializer,
    ExamParticipationSerializer
)

from students.models import Student

from students.permissions import (
    IsStaffOrAdmin,
    IsStudent
)

from accounts.models import StaffAssignment

from accounts.permissions import (
    IsHOD
)


# ============================================================
# HELPER
# ============================================================

def get_staff_subject_ids(user):

    return StaffAssignment.objects.filter(

        staff=user

    ).values_list(

        "subject_id",
        flat=True

    )


# ============================================================
# EXAM LIST + CREATE
# ============================================================

class ExamListCreateView(
    generics.ListCreateAPIView
):

    serializer_class = ExamSerializer

    permission_classes = [
        IsAuthenticated,
        IsStaffOrAdmin
    ]

    def get_queryset(self):

        user = self.request.user

        try:

            role = user.userprofile.role.name

        except Exception:

            return Exam.objects.none()


        # ====================================================
        # ADMIN
        # ====================================================

        if role == "Admin":

            queryset = Exam.objects.all()


        # ====================================================
        # STAFF
        # ====================================================

        elif role == "Staff":

            subject_ids = get_staff_subject_ids(
                user
            )

            queryset = Exam.objects.filter(
                subject_id__in=subject_ids
            )


        else:

            return Exam.objects.none()


        # ====================================================
        # SELECT RELATED
        # ====================================================

        queryset = queryset.select_related(

            "subject",
            "course",
            "department",
            "created_by"

        )


        # ====================================================
        # SEARCH
        # ====================================================

        search = self.request.query_params.get(
            "search"
        )

        if search:

            search = search.strip()

            if search:

                queryset = queryset.filter(

                    Q(
                        name__icontains=search
                    )

                    |

                    Q(
                        subject__name__icontains=search
                    )

                    |

                    Q(
                        subject__code__icontains=search
                    )

                )


        # ====================================================
        # SUBJECT FILTER
        # ====================================================

        subject = self.request.query_params.get(
            "subject"
        )

        if subject:

            queryset = queryset.filter(
                subject_id=subject
            )


        # ====================================================
        # COURSE FILTER
        # ====================================================

        course = self.request.query_params.get(
            "course"
        )

        if course:

            queryset = queryset.filter(
                course_id=course
            )


        # ====================================================
        # DEPARTMENT FILTER
        # ====================================================

        department = self.request.query_params.get(
            "department"
        )

        if department:

            queryset = queryset.filter(
                department_id=department
            )


        # ====================================================
        # YEAR FILTER
        # ====================================================

        year = self.request.query_params.get(
            "year"
        )

        if year:

            queryset = queryset.filter(
                year=year
            )


        # ====================================================
        # EXAM DATE FILTER
        # ====================================================

        exam_date = self.request.query_params.get(
            "exam_date"
        )

        if exam_date:

            queryset = queryset.filter(
                exam_date=exam_date
            )


        # ====================================================
        # UPCOMING / COMPLETED
        # ====================================================

        exam_type = self.request.query_params.get(
            "type"
        )

        today = timezone.now().date()


        if exam_type == "upcoming":

            queryset = queryset.filter(
                exam_date__gte=today
            )


        elif exam_type == "completed":

            queryset = queryset.filter(
                exam_date__lt=today
            )


        # ====================================================
        # ORDER
        # ====================================================

        return queryset.order_by(

            "exam_date",
            "start_time"

        )


    # ========================================================
    # CREATE EXAM
    # ========================================================

    @transaction.atomic
    def perform_create(
        self,
        serializer
    ):

        exam = serializer.save(
            created_by=self.request.user
        )


        # ====================================================
        # FIND ELIGIBLE STUDENTS
        # ====================================================

        students = Student.objects.filter(

            course=exam.course,

            department=exam.department

        )


        # ====================================================
        # CREATE PARTICIPATION OBJECTS
        # ====================================================

        participation_objects = []


        for student in students:

            if (

                student.get_current_year()

                ==

                exam.year

            ):

                participation_objects.append(

                    ExamParticipation(

                        exam=exam,

                        student=student,

                        status="PENDING"

                    )

                )


        # ====================================================
        # BULK CREATE
        # ====================================================

        if participation_objects:

            ExamParticipation.objects.bulk_create(

                participation_objects,

                ignore_conflicts=True

            )


# ============================================================
# STAFF EXAM FILTER OPTIONS
# ============================================================


# ============================================================
# STAFF EXAM FILTER OPTIONS
# ============================================================

class StaffExamFilterOptionsView(generics.GenericAPIView):

    permission_classes = [
        IsAuthenticated,
        IsStaffOrAdmin,
    ]

    def get(self, request):
        """
        Return all courses, departments, and subjects
        created in the Academics module.
        """

        # ----------------------------------------------------
        # 1. GET ALL COURSES
        # ----------------------------------------------------

        all_courses = Course.objects.all().order_by("name")

        courses = [
            {
                "id": course.id,
                "name": course.name,
                "code": course.code,
            }
            for course in all_courses
        ]

        # ----------------------------------------------------
        # 2. GET ALL DEPARTMENTS
        # ----------------------------------------------------

        all_departments = Department.objects.all().order_by("name")

        departments = [
            {
                "id": department.id,
                "name": department.name,
            }
            for department in all_departments
        ]

        # ----------------------------------------------------
        # 3. GET ALL SUBJECTS
        # ----------------------------------------------------

        all_subjects = (
            Subject.objects
            .select_related("course", "department")
            .order_by("name")
        )

        subjects = [
            {
                "id": subject.id,
                "name": subject.name,
                "code": subject.code,
                "year": subject.year,
                "course_id": subject.course_id,
                "department_id": subject.department_id,
            }
            for subject in all_subjects
        ]

        # ----------------------------------------------------
        # 4. COURSE - DEPARTMENT RELATIONSHIP
        # ----------------------------------------------------
        # A department is shown for a course when at least
        # one subject connects that course and department.

        course_departments = list(
            Subject.objects
            .values("course_id", "department_id")
            .distinct()
            .order_by("course_id", "department_id")
        )

        # ----------------------------------------------------
        # 5. RETURN DATA TO FRONTEND
        # ----------------------------------------------------

        return Response({
            "courses": courses,
            "departments": departments,
            "subjects": subjects,
            "course_departments": course_departments,
        })


# ============================================================
# EXAM DETAIL
# ============================================================

class ExamDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    serializer_class = ExamSerializer

    permission_classes = [
        IsAuthenticated,
        IsStaffOrAdmin
    ]

    def get_queryset(self):

        user = self.request.user

        try:

            role = user.userprofile.role.name

        except Exception:

            return Exam.objects.none()


        # ====================================================
        # ADMIN
        # ====================================================

        if role == "Admin":

            return Exam.objects.all().select_related(

                "subject",
                "course",
                "department",
                "created_by"

            )


        # ====================================================
        # STAFF
        # ====================================================

        if role == "Staff":

            subject_ids = get_staff_subject_ids(
                user
            )

            return Exam.objects.filter(

                subject_id__in=subject_ids

            ).select_related(

                "subject",
                "course",
                "department",
                "created_by"

            )


        return Exam.objects.none()


# ============================================================
# EXAM PARTICIPATION LIST
# ============================================================

class ExamParticipationListView(
    generics.ListAPIView
):

    serializer_class = ExamParticipationSerializer

    permission_classes = [
        IsAuthenticated,
        IsStaffOrAdmin
    ]

    def get_queryset(self):

        user = self.request.user

        try:

            role = user.userprofile.role.name

        except Exception:

            return ExamParticipation.objects.none()


        # ====================================================
        # ADMIN
        # ====================================================

        if role == "Admin":

            queryset = ExamParticipation.objects.all()


        # ====================================================
        # STAFF
        # ====================================================

        elif role == "Staff":

            subject_ids = get_staff_subject_ids(
                user
            )

            queryset = ExamParticipation.objects.filter(

                exam__subject_id__in=subject_ids

            )


        else:

            return ExamParticipation.objects.none()


        # ====================================================
        # SELECT RELATED
        # ====================================================

        queryset = queryset.select_related(

            "exam",
            "exam__subject",
            "exam__course",
            "exam__department",
            "student",
            "student__course",
            "student__department"

        )


        # ====================================================
        # EXAM FILTER
        # ====================================================

        exam = self.request.query_params.get(
            "exam"
        )

        if exam:

            queryset = queryset.filter(
                exam_id=exam
            )


        # ====================================================
        # STUDENT FILTER
        # ====================================================

        student = self.request.query_params.get(
            "student"
        )

        if student:

            queryset = queryset.filter(
                student_id=student
            )


        # ====================================================
        # STATUS FILTER
        # ====================================================

        status_value = self.request.query_params.get(
            "status"
        )

        if status_value:

            queryset = queryset.filter(
                status=status_value.upper()
            )


        return queryset.order_by(

            "exam__exam_date",

            "student__name"

        )


# ============================================================
# UPDATE EXAM PARTICIPATION
# ============================================================

class ExamParticipationUpdateView(
    generics.UpdateAPIView
):

    serializer_class = ExamParticipationSerializer

    permission_classes = [
        IsAuthenticated,
        IsStaffOrAdmin
    ]

    http_method_names = [
        "patch"
    ]

    def get_queryset(self):

        user = self.request.user

        try:

            role = user.userprofile.role.name

        except Exception:

            return ExamParticipation.objects.none()


        # ====================================================
        # ADMIN
        # ====================================================

        if role == "Admin":

            return ExamParticipation.objects.all()


        # ====================================================
        # STAFF
        # ====================================================

        if role == "Staff":

            subject_ids = get_staff_subject_ids(
                user
            )

            return ExamParticipation.objects.filter(

                exam__subject_id__in=subject_ids

            )


        return ExamParticipation.objects.none()


# ============================================================
# STUDENT EXAM LIST
# ============================================================

class StudentExamListView(
    generics.ListAPIView
):

    serializer_class = ExamParticipationSerializer

    permission_classes = [
        IsAuthenticated,
        IsStudent
    ]

    def get_queryset(self):

        queryset = ExamParticipation.objects.filter(

            student__user=self.request.user

        ).select_related(

            "exam",
            "student",
            "exam__subject",
            "exam__course",
            "exam__department"

        )


        # ====================================================
        # SEARCH
        # ====================================================

        search = self.request.query_params.get(
            "search"
        )

        if search:

            search = search.strip()

            if search:

                queryset = queryset.filter(

                    Q(
                        exam__name__icontains=search
                    )

                    |

                    Q(
                        exam__subject__name__icontains=search
                    )

                    |

                    Q(
                        exam__subject__code__icontains=search
                    )

                )


        # ====================================================
        # SUBJECT FILTER
        # ====================================================

        subject = self.request.query_params.get(
            "subject"
        )

        if subject:

            queryset = queryset.filter(

                exam__subject_id=subject

            )


        # ====================================================
        # STATUS FILTER
        # ====================================================

        status_value = self.request.query_params.get(
            "status"
        )

        if status_value:

            queryset = queryset.filter(

                status=status_value.upper()

            )


        # ====================================================
        # TYPE FILTER
        # ====================================================

        exam_type = self.request.query_params.get(
            "type"
        )

        today = timezone.now().date()


        if exam_type == "upcoming":

            queryset = queryset.filter(

                exam__exam_date__gte=today

            )


        elif exam_type == "completed":

            queryset = queryset.filter(

                exam__exam_date__lt=today

            )


        elif exam_type == "absent":

            queryset = queryset.filter(

                status="ABSENT"

            )


        return queryset.order_by(

            "exam__exam_date",

            "exam__start_time"

        )


# ============================================================
# HOD EXAM LIST
# ============================================================

class HODExamListView(
    generics.ListAPIView
):

    serializer_class = ExamSerializer

    permission_classes = [
        IsAuthenticated,
        IsHOD
    ]

    def get_queryset(self):

        # ====================================================
        # HOD PROFILE
        # ====================================================

        profile = self.request.user.userprofile

        department = profile.department


        if department is None:

            return Exam.objects.none()


        # ====================================================
        # DEPARTMENT EXAMS ONLY
        # ====================================================

        queryset = Exam.objects.filter(

            department=department

        ).select_related(

            "subject",
            "course",
            "department",
            "created_by"

        )


        # ====================================================
        # SEARCH
        # ====================================================

        search = self.request.query_params.get(
            "search"
        )

        if search:

            search = search.strip()

            if search:

                queryset = queryset.filter(

                    Q(
                        name__icontains=search
                    )

                    |

                    Q(
                        subject__name__icontains=search
                    )

                    |

                    Q(
                        subject__code__icontains=search
                    )

                )


        # ====================================================
        # SUBJECT FILTER
        # ====================================================

        subject = self.request.query_params.get(
            "subject"
        )

        if subject:

            queryset = queryset.filter(

                subject_id=subject

            )


        # ====================================================
        # COURSE FILTER
        # ====================================================

        course = self.request.query_params.get(
            "course"
        )

        if course:

            queryset = queryset.filter(

                course_id=course

            )


        # ====================================================
        # YEAR FILTER
        # ====================================================

        year = self.request.query_params.get(
            "year"
        )

        if year:

            queryset = queryset.filter(

                year=year

            )


        # ====================================================
        # EXAM DATE FILTER
        # ====================================================

        exam_date = self.request.query_params.get(
            "exam_date"
        )

        if exam_date:

            queryset = queryset.filter(

                exam_date=exam_date

            )


        # ====================================================
        # UPCOMING / COMPLETED
        # ====================================================

        exam_type = self.request.query_params.get(
            "type"
        )

        today = timezone.now().date()


        # ----------------------------------------------------
        # UPCOMING
        # ----------------------------------------------------

        if exam_type == "upcoming":

            queryset = queryset.filter(

                exam_date__gte=today

            )


        # ----------------------------------------------------
        # COMPLETED
        # ----------------------------------------------------

        elif exam_type == "completed":

            queryset = queryset.filter(

                exam_date__lt=today

            )


        # ====================================================
        # ORDER
        # ====================================================

        return queryset.order_by(

            "exam_date",

            "start_time"

        )
