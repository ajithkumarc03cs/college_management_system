from django.utils import timezone
from django.db import transaction
from django.db.models import Q

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from academics.models import Course, Department, Subject
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
def perform_create(self, serializer):
    exam = serializer.save(created_by=self.request.user)

    students = Student.objects.filter(
        course=exam.course,
        department=exam.department,
    )

    eligible_students = [
        student
        for student in students
        if student.get_current_year() == exam.year
    ]

    ExamParticipation.objects.bulk_create(
        [
            ExamParticipation(
                exam=exam,
                student=student,
                status="PENDING",
            )
            for student in eligible_students
        ],
        ignore_conflicts=True,
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

        # 1. All courses
        all_courses = Course.objects.all().order_by("name")

        courses = [
            {
                "id": item.id,
                "name": item.name,
                "code": item.code,
                "department_id": item.department_id,
            }
            for item in all_courses
        ]

        # 2. All departments
        all_departments = Department.objects.all().order_by("name")

        departments = [
            {
                "id": item.id,
                "name": item.name,
                "code": item.code,
            }
            for item in all_departments
        ]

        # 3. All subjects
        all_subjects = (
            Subject.objects
            .select_related("course", "department")
            .order_by("name")
        )

        subjects = [
            {
                "id": item.id,
                "name": item.name,
                "code": item.code,
                "year": item.year,
                "course_id": item.course_id,
                "department_id": item.department_id,
            }
            for item in all_subjects
        ]

        # 4. Course-department mappings from Course model
        course_departments = [
            {
                "course_id": item.id,
                "department_id": item.department_id,
            }
            for item in all_courses
        ]

        # 5. Return response
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

class ExamParticipationListView(generics.ListAPIView):

    serializer_class = ExamParticipationSerializer
    permission_classes = [IsAuthenticated, IsStaffOrAdmin]

    def get_queryset(self):
        user = self.request.user

        try:
            role = user.userprofile.role.name
        except Exception:
            return ExamParticipation.objects.none()

        queryset = ExamParticipation.objects.none()

        if role == "Admin":
            queryset = ExamParticipation.objects.all()

        elif role == "Staff":
            # Staff can see participation for exams in their department.
            profile = user.userprofile
            department = profile.department

            if department is None:
                return ExamParticipation.objects.none()

            queryset = ExamParticipation.objects.filter(
                exam__department=department
            )

        queryset = queryset.select_related(
            "exam",
            "exam__subject",
            "exam__course",
            "exam__department",
            "student",
            "student__course",
            "student__department",
        )

        exam_id = self.request.query_params.get("exam")
        if exam_id:
            queryset = queryset.filter(exam_id=exam_id)

        student_id = self.request.query_params.get("student")
        if student_id:
            queryset = queryset.filter(student_id=student_id)

        status_value = self.request.query_params.get("status")
        if status_value:
            queryset = queryset.filter(status=status_value.upper())

        return queryset.order_by("student__name")

# ============================================================
# UPDATE EXAM PARTICIPATION
# ============================================================

class ExamParticipationUpdateView(generics.UpdateAPIView):

    serializer_class = ExamParticipationSerializer
    permission_classes = [IsAuthenticated, IsStaffOrAdmin]
    http_method_names = ["patch"]

    def get_queryset(self):
        user = self.request.user

        try:
            role = user.userprofile.role.name
        except Exception:
            return ExamParticipation.objects.none()

        if role == "Admin":
            return ExamParticipation.objects.all()

        if role == "Staff":
            department = user.userprofile.department

            if department is None:
                return ExamParticipation.objects.none()

            return ExamParticipation.objects.filter(
                exam__department=department
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
