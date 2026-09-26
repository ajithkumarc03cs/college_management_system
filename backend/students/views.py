# from datetime import datetime

# from django.db.models import Q
# from django.utils import timezone

# from rest_framework import generics
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response

# from academics.models import Subject
# from academics.serializers import SubjectSerializer

# from accounts.models import StaffAssignment

# from exams.models import ExamParticipation

# from assignments.models import (
#     Assignment,
#     AssignmentSubmission
# )

# from reexams.models import ReExam

# from attendance.models import Attendance

# from .models import Student

# from .serializers import (
#     StudentSerializer,
#     StudentCreateSerializer,
# )

# from .permissions import (
#     IsAdmin,
#     IsStaffOrAdmin,
#     IsStudent,
# )


# # ============================================================
# # STAFF STUDENT QUERYSET HELPER
# # ============================================================

# def get_staff_student_queryset(user):

#     assignments = StaffAssignment.objects.filter(
#         staff=user
#     ).select_related(
#         "subject",
#         "subject__course",
#         "subject__department",
#     )

#     current_year = datetime.now().year

#     query = Q()

#     for assignment in assignments:

#         subject = assignment.subject

#         course = subject.course

#         department = subject.department

#         subject_year = subject.year


#         # ----------------------------------------------------
#         # NON-FINAL YEAR
#         # ----------------------------------------------------

#         if subject_year < course.duration:

#             admission_year = (
#                 current_year - subject_year + 1
#             )

#             query |= Q(
#                 course=course,
#                 department=department,
#                 admission_year=admission_year,
#             )


#         # ----------------------------------------------------
#         # FINAL YEAR
#         # ----------------------------------------------------

#         else:

#             admission_year = (
#                 current_year - subject_year + 1
#             )

#             query |= Q(
#                 course=course,
#                 department=department,
#                 admission_year__lte=admission_year,
#             )


#     # --------------------------------------------------------
#     # NO SUBJECT ASSIGNMENT
#     # --------------------------------------------------------

#     if not query:

#         return Student.objects.none()


#     return Student.objects.filter(
#         query
#     ).select_related(
#         "course",
#         "department",
#         "user",
#     ).distinct()


# # ============================================================
# # STUDENT LIST + CREATE
# # ============================================================

# class StudentListCreateView(
#     generics.ListCreateAPIView
# ):

#     queryset = Student.objects.all().select_related(
#         "course",
#         "department",
#         "user",
#     )


#     # ========================================================
#     # PERMISSION
#     # ========================================================

#     def get_permissions(self):

#         if self.request.method == "POST":

#             return [
#                 IsAuthenticated(),
#                 IsAdmin()
#             ]

#         return [
#             IsAuthenticated(),
#             IsStaffOrAdmin()
#         ]


#     # ========================================================
#     # SERIALIZER
#     # ========================================================

#     def get_serializer_class(self):

#         if self.request.method == "POST":

#             return StudentCreateSerializer

#         return StudentSerializer


#     # ========================================================
#     # QUERYSET
#     # ========================================================

#     def get_queryset(self):

#         user = self.request.user


#         # ----------------------------------------------------
#         # GET USER ROLE
#         # ----------------------------------------------------

#         try:

#             role = user.userprofile.role.name

#         except:

#             return Student.objects.none()


#         # ====================================================
#         # ADMIN
#         # ====================================================

#         if role == "Admin":

#             queryset = Student.objects.all().select_related(
#                 "course",
#                 "department",
#                 "user",
#             )


#         # ====================================================
#         # STAFF
#         # ====================================================

#         elif role == "Staff":

#             queryset = get_staff_student_queryset(
#                 user
#             )


#         # ====================================================
#         # OTHER ROLES
#         # ====================================================

#         else:

#             return Student.objects.none()


#         # ====================================================
#         # SEARCH
#         # ====================================================

#         search = self.request.query_params.get(
#             "search"
#         )


#         if search:

#             search = search.strip()


#             if search:

#                 queryset = queryset.filter(

#                     Q(name__icontains=search)

#                     | Q(email__icontains=search)

#                     | Q(phone__icontains=search)

#                     | Q(user__username__icontains=search)

#                     | Q(course__name__icontains=search)

#                     | Q(department__name__icontains=search)

#                 )


#         # ====================================================
#         # COURSE FILTER
#         # ====================================================

#         course = self.request.query_params.get(
#             "course"
#         )


#         if course:

#             queryset = queryset.filter(
#                 course_id=course
#             )


#         # ====================================================
#         # DEPARTMENT FILTER
#         # ====================================================

#         department = self.request.query_params.get(
#             "department"
#         )


#         if department:

#             queryset = queryset.filter(
#                 department_id=department
#             )


#         # ====================================================
#         # ADMISSION YEAR FILTER
#         # ====================================================

#         admission_year = self.request.query_params.get(
#             "admission_year"
#         )


#         if admission_year:

#             queryset = queryset.filter(
#                 admission_year=admission_year
#             )


#         # ====================================================
#         # EXISTING STUDENT FILTER
#         # ====================================================

#         is_existing_student = (
#             self.request.query_params.get(
#                 "is_existing_student"
#             )
#         )


#         if is_existing_student is not None:

#             value = is_existing_student.lower()


#             if value == "true":

#                 queryset = queryset.filter(
#                     is_existing_student=True
#                 )


#             elif value == "false":

#                 queryset = queryset.filter(
#                     is_existing_student=False
#                 )


#         # ====================================================
#         # CURRENT YEAR FILTER
#         # ====================================================
#         #
#         # current_year is calculated using:
#         #
#         # current calendar year
#         # -
#         # admission year
#         # +
#         # 1
#         #
#         # Example:
#         #
#         # 2026 - 2026 + 1 = Year 1
#         #
#         # 2026 - 2025 + 1 = Year 2
#         #
#         # 2026 - 2024 + 1 = Year 3
#         #
#         # ====================================================

#         current_year_filter = (
#             self.request.query_params.get(
#                 "year"
#             )
#         )


#         if current_year_filter:

#             try:

#                 year_value = int(
#                     current_year_filter
#                 )


#                 current_calendar_year = (
#                     datetime.now().year
#                 )


#                 # ------------------------------------------------
#                 # Convert current year to admission year
#                 # ------------------------------------------------

#                 expected_admission_year = (
#                     current_calendar_year
#                     - year_value
#                     + 1
#                 )


#                 queryset = queryset.filter(
#                     admission_year=expected_admission_year
#                 )


#             except (ValueError, TypeError):

#                 queryset = queryset.none()


#         # ====================================================
#         # ORDERING
#         # ====================================================

#         ordering = self.request.query_params.get(
#             "ordering"
#         )


#         allowed_ordering = [
#             "name",
#             "-name",
#             "email",
#             "-email",
#             "admission_year",
#             "-admission_year",
#         ]


#         if ordering in allowed_ordering:

#             queryset = queryset.order_by(
#                 ordering
#             )


#         else:

#             queryset = queryset.order_by(
#                 "name"
#             )


#         return queryset.distinct()


# # ============================================================
# # STUDENT DETAIL
# # ============================================================

# class StudentDetailView(
#     generics.RetrieveUpdateDestroyAPIView
# ):

#     serializer_class = StudentSerializer


#     # ========================================================
#     # PERMISSION
#     # ========================================================

#     def get_permissions(self):

#         if self.request.method == "DELETE":

#             return [
#                 IsAuthenticated(),
#                 IsAdmin()
#             ]

#         return [
#             IsAuthenticated(),
#             IsStaffOrAdmin()
#         ]


#     # ========================================================
#     # QUERYSET
#     # ========================================================

#     def get_queryset(self):

#         user = self.request.user


#         try:

#             role = user.userprofile.role.name

#         except:

#             return Student.objects.none()


#         # ====================================================
#         # ADMIN
#         # ====================================================

#         if role == "Admin":

#             return Student.objects.all().select_related(
#                 "course",
#                 "department",
#                 "user",
#             )


#         # ====================================================
#         # STAFF
#         # ====================================================

#         if role == "Staff":

#             return get_staff_student_queryset(
#                 user
#             )


#         return Student.objects.none()


# # ============================================================
# # STAFF STUDENT LIST
# # ============================================================

# class StaffStudentListView(
#     generics.ListAPIView
# ):

#     serializer_class = StudentSerializer

#     permission_classes = [
#         IsAuthenticated,
#         IsStaffOrAdmin
#     ]


#     def get_queryset(self):

#         user = self.request.user


#         try:

#             role = user.userprofile.role.name

#         except:

#             return Student.objects.none()


#         # ====================================================
#         # ADMIN
#         # ====================================================

#         if role == "Admin":

#             queryset = Student.objects.all().select_related(
#                 "course",
#                 "department",
#                 "user",
#             )


#         # ====================================================
#         # STAFF
#         # ====================================================

#         elif role == "Staff":

#             queryset = get_staff_student_queryset(
#                 user
#             )


#         else:

#             return Student.objects.none()


#         # ====================================================
#         # SEARCH
#         # ====================================================

#         search = self.request.query_params.get(
#             "search"
#         )


#         if search:

#             search = search.strip()


#             if search:

#                 queryset = queryset.filter(

#                     Q(name__icontains=search)

#                     | Q(email__icontains=search)

#                     | Q(phone__icontains=search)

#                     | Q(user__username__icontains=search)

#                     | Q(course__name__icontains=search)

#                     | Q(department__name__icontains=search)

#                 )


#         # ====================================================
#         # COURSE
#         # ====================================================

#         course = self.request.query_params.get(
#             "course"
#         )


#         if course:

#             queryset = queryset.filter(
#                 course_id=course
#             )


#         # ====================================================
#         # DEPARTMENT
#         # ====================================================

#         department = self.request.query_params.get(
#             "department"
#         )


#         if department:

#             queryset = queryset.filter(
#                 department_id=department
#             )


#         # ====================================================
#         # ADMISSION YEAR
#         # ====================================================

#         admission_year = self.request.query_params.get(
#             "admission_year"
#         )


#         if admission_year:

#             queryset = queryset.filter(
#                 admission_year=admission_year
#             )


#         # ====================================================
#         # CURRENT YEAR
#         # ====================================================

#         year = self.request.query_params.get(
#             "year"
#         )


#         if year:

#             try:

#                 year_value = int(year)

#                 current_calendar_year = (
#                     datetime.now().year
#                 )

#                 expected_admission_year = (
#                     current_calendar_year
#                     - year_value
#                     + 1
#                 )

#                 queryset = queryset.filter(
#                     admission_year=expected_admission_year
#                 )


#             except (ValueError, TypeError):

#                 queryset = queryset.none()


#         # ====================================================
#         # ORDERING
#         # ====================================================

#         ordering = self.request.query_params.get(
#             "ordering"
#         )


#         allowed_ordering = [
#             "name",
#             "-name",
#             "email",
#             "-email",
#             "admission_year",
#             "-admission_year",
#         ]


#         if ordering in allowed_ordering:

#             queryset = queryset.order_by(
#                 ordering
#             )

#         else:

#             queryset = queryset.order_by(
#                 "name"
#             )


#         return queryset.distinct()


# # ============================================================
# # STUDENT OWN PROFILE
# # ============================================================

# class StudentProfileView(
#     generics.RetrieveAPIView
# ):

#     serializer_class = StudentSerializer

#     permission_classes = [
#         IsAuthenticated,
#         IsStudent
#     ]


#     def get_object(self):

#         return Student.objects.select_related(
#             "course",
#             "department",
#             "user",
#         ).get(
#             user=self.request.user
#         )


# # ============================================================
# # STUDENT DASHBOARD
# # ============================================================

# class StudentDashboardView(
#     generics.RetrieveAPIView
# ):

#     permission_classes = [
#         IsAuthenticated,
#         IsStudent
#     ]


#     def get(
#         self,
#         request,
#         *args,
#         **kwargs
#     ):

#         student = Student.objects.select_related(
#             "course",
#             "department",
#             "user",
#         ).get(
#             user=request.user
#         )


#         today = timezone.now().date()


#         # ====================================================
#         # EXAMS
#         # ====================================================

#         exam_participations = ExamParticipation.objects.filter(
#             student=student
#         )


#         upcoming_exams = exam_participations.filter(
#             exam__exam_date__gte=today
#         )


#         completed_exams = exam_participations.filter(
#             exam__exam_date__lt=today
#         )


#         absent_exams = exam_participations.filter(
#             status="ABSENT"
#         )


#         # ====================================================
#         # ASSIGNMENTS
#         # ====================================================

#         assignments = Assignment.objects.filter(
#             student=student
#         )


#         submissions = AssignmentSubmission.objects.filter(
#             student=student
#         )


#         submitted_assignments = submissions.filter(
#             status="SUBMITTED"
#         ).count()


#         approved_assignments = submissions.filter(
#             status="APPROVED"
#         ).count()


#         rejected_assignments = submissions.filter(
#             status="REJECTED"
#         ).count()


#         # ====================================================
#         # RE-EXAMS
#         # ====================================================

#         reexams = ReExam.objects.filter(
#             student=student
#         )


#         # ====================================================
#         # ATTENDANCE
#         # ====================================================

#         attendance = Attendance.objects.filter(
#             student=student
#         )


#         total_attendance = attendance.count()


#         present_attendance = attendance.filter(
#             status="PRESENT"
#         ).count()


#         absent_attendance = attendance.filter(
#             status="ABSENT"
#         ).count()


#         if total_attendance > 0:

#             attendance_percentage = round(
#                 (
#                     present_attendance
#                     /
#                     total_attendance
#                 ) * 100,
#                 2
#             )

#         else:

#             attendance_percentage = 0


#         # ====================================================
#         # RESPONSE
#         # ====================================================

#         return Response({

#             "student": {

#                 "id": student.id,

#                 "name": student.name,

#                 "email": student.email,

#                 "phone": student.phone,

#                 "course": student.course.name,

#                 "department": student.department.name,

#                 "admission_year": student.admission_year,

#                 "current_year": student.get_current_year(),

#             },


#             "exams": {

#                 "total":
#                     exam_participations.count(),

#                 "upcoming":
#                     upcoming_exams.count(),

#                 "completed":
#                     completed_exams.count(),

#                 "absent":
#                     absent_exams.count(),

#             },


#             "assignments": {

#                 "total":
#                     assignments.count(),

#                 "submitted":
#                     submitted_assignments,

#                 "approved":
#                     approved_assignments,

#                 "rejected":
#                     rejected_assignments,

#             },


#             "reexams": {

#                 "total":
#                     reexams.count(),

#             },


#             "attendance": {

#                 "total":
#                     total_attendance,

#                 "present":
#                     present_attendance,

#                 "absent":
#                     absent_attendance,

#                 "percentage":
#                     attendance_percentage,

#             }

#         })


# # ============================================================
# # HOD STUDENT LIST
# # ============================================================

# class HODStudentListView(
#     generics.ListAPIView
# ):

#     serializer_class = StudentSerializer

#     permission_classes = [
#         IsAuthenticated
#     ]


#     def get_queryset(self):

#         user = self.request.user


#         try:

#             profile = user.userprofile


#             if (
#                 profile.role.name != "HOD"
#                 or profile.department is None
#             ):

#                 return Student.objects.none()


#             queryset = Student.objects.filter(
#                 department=profile.department
#             ).select_related(
#                 "course",
#                 "department",
#                 "user",
#             )


#             # =================================================
#             # SEARCH
#             # =================================================

#             search = self.request.query_params.get(
#                 "search"
#             )


#             if search:

#                 search = search.strip()


#                 if search:

#                     queryset = queryset.filter(

#                         Q(name__icontains=search)

#                         | Q(email__icontains=search)

#                         | Q(phone__icontains=search)

#                         | Q(user__username__icontains=search)

#                         | Q(course__name__icontains=search)

#                     )


#             # =================================================
#             # COURSE
#             # =================================================

#             course = self.request.query_params.get(
#                 "course"
#             )


#             if course:

#                 queryset = queryset.filter(
#                     course_id=course
#                 )


#             # =================================================
#             # ADMISSION YEAR
#             # =================================================

#             admission_year = self.request.query_params.get(
#                 "admission_year"
#             )


#             if admission_year:

#                 queryset = queryset.filter(
#                     admission_year=admission_year
#                 )


#             return queryset.order_by(
#                 "name"
#             )


#         except:

#             return Student.objects.none()


# # ============================================================
# # HOD STUDENT DETAIL
# # ============================================================

# class HODStudentDetailView(
#     generics.RetrieveUpdateAPIView
# ):

#     serializer_class = StudentSerializer

#     permission_classes = [
#         IsAuthenticated
#     ]


#     def get_queryset(self):

#         user = self.request.user


#         try:

#             profile = user.userprofile


#             if (
#                 profile.role.name != "HOD"
#                 or profile.department is None
#             ):

#                 return Student.objects.none()


#             return Student.objects.filter(
#                 department=profile.department
#             ).select_related(
#                 "course",
#                 "department",
#                 "user",
#             )


#         except:

#             return Student.objects.none()


# # ============================================================
# # STUDENT SUBJECT LIST
# # ============================================================

# class StudentSubjectListView(
#     generics.ListAPIView
# ):

#     serializer_class = SubjectSerializer

#     permission_classes = [
#         IsAuthenticated,
#         IsStudent
#     ]


#     def get_queryset(self):

#         student = self.request.user.student


#         return Subject.objects.filter(
#             course=student.course,
#             department=student.department,
#             year=student.get_current_year()
#         ).select_related(
#             "course",
#             "department"
#         ).order_by(
#             "name"
#         )



# # ============================================================
# # STAFF FILTER OPTIONS
# # ============================================================

# class StaffStudentFilterOptionsView(
#     generics.GenericAPIView
# ):

#     permission_classes = [
#         IsAuthenticated,
#         IsStaffOrAdmin
#     ]

#     def get(self, request, *args, **kwargs):

#         user = request.user

#         # ====================================================
#         # ADMIN
#         # ====================================================

#         if user.userprofile.role.name == "Admin":

#             assignments = StaffAssignment.objects.select_related(
#                 "subject",
#                 "subject__course",
#                 "subject__department",
#             )

#         # ====================================================
#         # STAFF
#         # ====================================================

#         elif user.userprofile.role.name == "Staff":

#             assignments = StaffAssignment.objects.filter(
#                 staff=user
#             ).select_related(
#                 "subject",
#                 "subject__course",
#                 "subject__department",
#             )

#         else:

#             return Response({
#                 "courses": [],
#                 "departments": []
#             })


#         # ====================================================
#         # COURSE DATA
#         # ====================================================

#         courses = {}

#         # ====================================================
#         # DEPARTMENT DATA
#         # ====================================================

#         departments = {}


#         for assignment in assignments:

#             subject = assignment.subject

#             course = subject.course

#             department = subject.department


#             # ------------------------------------------------
#             # COURSE
#             # ------------------------------------------------

#             courses[course.id] = {
#                 "id": course.id,
#                 "name": course.name,
#                 "code": course.code,
#             }


#             # ------------------------------------------------
#             # DEPARTMENT
#             # ------------------------------------------------

#             departments[department.id] = {
#                 "id": department.id,
#                 "name": department.name,
#             }


#         return Response({

#             "courses": list(
#                 courses.values()
#             ),

#             "departments": list(
#                 departments.values()
#             )

#         })



from datetime import datetime

from django.db.models import Q
from django.utils import timezone

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from academics.models import Subject
from academics.serializers import SubjectSerializer

from accounts.models import StaffAssignment

from exams.models import ExamParticipation

from assignments.models import (
    Assignment,
    AssignmentSubmission
)

from reexams.models import ReExam

from attendance.models import Attendance

from .models import Student

from .serializers import (
    StudentSerializer,
    StudentCreateSerializer,
)

from .permissions import (
    IsAdmin,
    IsStaffOrAdmin,
    IsStudent,
)


# ============================================================
# STAFF STUDENT QUERYSET HELPER
# ============================================================

def get_staff_student_queryset(user):

    assignments = StaffAssignment.objects.filter(
        staff=user
    ).select_related(
        "subject",
        "subject__course",
        "subject__department",
    )

    current_year = datetime.now().year

    query = Q()


    for assignment in assignments:

        subject = assignment.subject

        course = subject.course

        department = subject.department

        subject_year = subject.year


        # ====================================================
        # NON-FINAL YEAR
        # ====================================================

        if subject_year < course.duration:

            admission_year = (
                current_year
                - subject_year
                + 1
            )

            query |= Q(
                course=course,
                department=department,
                admission_year=admission_year,
            )


        # ====================================================
        # FINAL YEAR
        # ====================================================

        else:

            admission_year = (
                current_year
                - subject_year
                + 1
            )

            query |= Q(
                course=course,
                department=department,
                admission_year__lte=admission_year,
            )


    # ========================================================
    # NO ASSIGNMENT
    # ========================================================

    if not query:

        return Student.objects.none()


    return Student.objects.filter(
        query
    ).select_related(
        "course",
        "department",
        "user",
    ).distinct()


# ============================================================
# STUDENT LIST + CREATE
# ============================================================

class StudentListCreateView(
    generics.ListCreateAPIView
):

    queryset = Student.objects.all().select_related(
        "course",
        "department",
        "user",
    )


    # ========================================================
    # PERMISSION
    # ========================================================

    def get_permissions(self):

        if self.request.method == "POST":

            return [
                IsAuthenticated(),
                IsAdmin()
            ]

        return [
            IsAuthenticated(),
            IsStaffOrAdmin()
        ]


    # ========================================================
    # SERIALIZER
    # ========================================================

    def get_serializer_class(self):

        if self.request.method == "POST":

            return StudentCreateSerializer

        return StudentSerializer


    # ========================================================
    # QUERYSET
    # ========================================================

    def get_queryset(self):

        user = self.request.user


        try:

            role = user.userprofile.role.name

        except:

            return Student.objects.none()


        # ====================================================
        # ADMIN
        # ====================================================

        if role == "Admin":

            queryset = Student.objects.all().select_related(
                "course",
                "department",
                "user",
            )


        # ====================================================
        # STAFF
        # ====================================================

        elif role == "Staff":

            queryset = get_staff_student_queryset(
                user
            )


        else:

            return Student.objects.none()


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

                    Q(name__icontains=search)

                    | Q(email__icontains=search)

                    | Q(phone__icontains=search)

                    | Q(user__username__icontains=search)

                    | Q(course__name__icontains=search)

                    | Q(department__name__icontains=search)

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
        # ADMISSION YEAR FILTER
        # ====================================================

        admission_year = self.request.query_params.get(
            "admission_year"
        )


        if admission_year:

            queryset = queryset.filter(
                admission_year=admission_year
            )


        # ====================================================
        # EXISTING STUDENT FILTER
        # ====================================================

        existing = self.request.query_params.get(
            "is_existing_student"
        )


        if existing is not None:

            if existing.lower() == "true":

                queryset = queryset.filter(
                    is_existing_student=True
                )

            elif existing.lower() == "false":

                queryset = queryset.filter(
                    is_existing_student=False
                )


        # ====================================================
        # CURRENT YEAR FILTER
        # ====================================================

        year = self.request.query_params.get(
            "year"
        )


        if year:

            try:

                year_value = int(year)

                current_calendar_year = (
                    datetime.now().year
                )

                expected_admission_year = (
                    current_calendar_year
                    - year_value
                    + 1
                )


                queryset = queryset.filter(
                    admission_year=expected_admission_year
                )


            except (
                ValueError,
                TypeError
            ):

                queryset = queryset.none()


        # ====================================================
        # ORDERING
        # ====================================================

        ordering = self.request.query_params.get(
            "ordering"
        )


        allowed_ordering = [
            "name",
            "-name",
            "email",
            "-email",
            "admission_year",
            "-admission_year",
        ]


        if ordering in allowed_ordering:

            queryset = queryset.order_by(
                ordering
            )

        else:

            queryset = queryset.order_by(
                "name"
            )


        return queryset.distinct()


# ============================================================
# STUDENT DETAIL
# ============================================================

class StudentDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    serializer_class = StudentSerializer


    def get_permissions(self):

        if self.request.method == "DELETE":

            return [
                IsAuthenticated(),
                IsAdmin()
            ]

        return [
            IsAuthenticated(),
            IsStaffOrAdmin()
        ]


    def get_queryset(self):

        user = self.request.user


        try:

            role = user.userprofile.role.name

        except:

            return Student.objects.none()


        if role == "Admin":

            return Student.objects.all().select_related(
                "course",
                "department",
                "user",
            )


        if role == "Staff":

            return get_staff_student_queryset(
                user
            )


        return Student.objects.none()


# ============================================================
# STAFF STUDENT LIST
# ============================================================

class StaffStudentListView(
    generics.ListAPIView
):

    serializer_class = StudentSerializer

    permission_classes = [
        IsAuthenticated,
        IsStaffOrAdmin
    ]


    def get_queryset(self):

        user = self.request.user


        try:

            role = user.userprofile.role.name

        except:

            return Student.objects.none()


        if role == "Admin":

            queryset = Student.objects.all().select_related(
                "course",
                "department",
                "user",
            )


        elif role == "Staff":

            queryset = get_staff_student_queryset(
                user
            )


        else:

            return Student.objects.none()


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

                    Q(name__icontains=search)

                    | Q(email__icontains=search)

                    | Q(phone__icontains=search)

                    | Q(user__username__icontains=search)

                    | Q(course__name__icontains=search)

                    | Q(department__name__icontains=search)

                )


        # ====================================================
        # COURSE
        # ====================================================

        course = self.request.query_params.get(
            "course"
        )


        if course:

            queryset = queryset.filter(
                course_id=course
            )


        # ====================================================
        # DEPARTMENT
        # ====================================================

        department = self.request.query_params.get(
            "department"
        )


        if department:

            queryset = queryset.filter(
                department_id=department
            )


        # ====================================================
        # CURRENT YEAR
        # ====================================================

        year = self.request.query_params.get(
            "year"
        )


        if year:

            try:

                year_value = int(year)

                current_calendar_year = (
                    datetime.now().year
                )

                expected_admission_year = (
                    current_calendar_year
                    - year_value
                    + 1
                )


                queryset = queryset.filter(
                    admission_year=expected_admission_year
                )


            except (
                ValueError,
                TypeError
            ):

                queryset = queryset.none()


        return queryset.order_by(
            "name"
        ).distinct()


# ============================================================
# STAFF STUDENT FILTER OPTIONS
# ============================================================

class StaffStudentFilterOptionsView(
    generics.GenericAPIView
):

    permission_classes = [
        IsAuthenticated,
        IsStaffOrAdmin
    ]


    def get(
        self,
        request,
        *args,
        **kwargs
    ):

        user = request.user


        try:

            role = user.userprofile.role.name

        except:

            return Response({
                "courses": [],
                "departments": []
            })


        # ====================================================
        # GET STAFF ASSIGNMENTS
        # ====================================================

        if role == "Staff":

            assignments = StaffAssignment.objects.filter(
                staff=user
            ).select_related(
                "subject",
                "subject__course",
                "subject__department",
            )


        # ====================================================
        # ADMIN
        # ====================================================

        elif role == "Admin":

            assignments = StaffAssignment.objects.all().select_related(
                "subject",
                "subject__course",
                "subject__department",
            )


        else:

            return Response({
                "courses": [],
                "departments": []
            })


        # ====================================================
        # BUILD UNIQUE COURSES
        # ====================================================

        courses = {}

        departments = {}


        for assignment in assignments:

            subject = assignment.subject

            course = subject.course

            department = subject.department


            courses[course.id] = {
                "id": course.id,
                "name": course.name,
                "code": course.code,
            }


            departments[department.id] = {
                "id": department.id,
                "name": department.name,
            }


        return Response({

            "courses": list(
                courses.values()
            ),

            "departments": list(
                departments.values()
            )

        })


# ============================================================
# STUDENT OWN PROFILE
# ============================================================

class StudentProfileView(
    generics.RetrieveAPIView
):

    serializer_class = StudentSerializer

    permission_classes = [
        IsAuthenticated,
        IsStudent
    ]


    def get_object(self):

        return Student.objects.select_related(
            "course",
            "department",
            "user",
        ).get(
            user=self.request.user
        )


# ============================================================
# STUDENT DASHBOARD
# ============================================================

class StudentDashboardView(
    generics.RetrieveAPIView
):

    permission_classes = [
        IsAuthenticated,
        IsStudent
    ]


    def get(
        self,
        request,
        *args,
        **kwargs
    ):

        student = Student.objects.select_related(
            "course",
            "department",
            "user",
        ).get(
            user=request.user
        )


        today = timezone.now().date()


        # ====================================================
        # EXAMS
        # ====================================================

        exam_participations = ExamParticipation.objects.filter(
            student=student
        )


        upcoming_exams = exam_participations.filter(
            exam__exam_date__gte=today
        )


        completed_exams = exam_participations.filter(
            exam__exam_date__lt=today
        )


        absent_exams = exam_participations.filter(
            status="ABSENT"
        )


        # ====================================================
        # ASSIGNMENTS
        # ====================================================

        assignments = Assignment.objects.filter(
            student=student
        )


        submissions = AssignmentSubmission.objects.filter(
            student=student
        )


        submitted_assignments = submissions.filter(
            status="SUBMITTED"
        ).count()


        approved_assignments = submissions.filter(
            status="APPROVED"
        ).count()


        rejected_assignments = submissions.filter(
            status="REJECTED"
        ).count()


        # ====================================================
        # RE-EXAMS
        # ====================================================

        reexams = ReExam.objects.filter(
            student=student
        )


        # ====================================================
        # ATTENDANCE
        # ====================================================

        attendance = Attendance.objects.filter(
            student=student
        )


        total_attendance = attendance.count()


        present_attendance = attendance.filter(
            status="PRESENT"
        ).count()


        absent_attendance = attendance.filter(
            status="ABSENT"
        ).count()


        if total_attendance > 0:

            attendance_percentage = round(
                (
                    present_attendance
                    /
                    total_attendance
                ) * 100,
                2
            )

        else:

            attendance_percentage = 0


        # ====================================================
        # RESPONSE
        # ====================================================

        return Response({

            "student": {

                "id": student.id,

                "name": student.name,

                "email": student.email,

                "phone": student.phone,

                "course": student.course.name,

                "department": student.department.name,

                "admission_year":
                    student.admission_year,

                "current_year":
                    student.get_current_year(),

            },


            "exams": {

                "total":
                    exam_participations.count(),

                "upcoming":
                    upcoming_exams.count(),

                "completed":
                    completed_exams.count(),

                "absent":
                    absent_exams.count(),

            },


            "assignments": {

                "total":
                    assignments.count(),

                "submitted":
                    submitted_assignments,

                "approved":
                    approved_assignments,

                "rejected":
                    rejected_assignments,

            },


            "reexams": {

                "total":
                    reexams.count(),

            },


            "attendance": {

                "total":
                    total_attendance,

                "present":
                    present_attendance,

                "absent":
                    absent_attendance,

                "percentage":
                    attendance_percentage,

            }

        })


# ============================================================
# HOD STUDENT LIST
# ============================================================

class HODStudentListView(
    generics.ListAPIView
):

    serializer_class = StudentSerializer

    permission_classes = [
        IsAuthenticated
    ]


    def get_queryset(self):

        user = self.request.user


        try:

            profile = user.userprofile


            if (
                profile.role.name != "HOD"
                or profile.department is None
            ):

                return Student.objects.none()


            queryset = Student.objects.filter(
                department=profile.department
            ).select_related(
                "course",
                "department",
                "user",
            )


            search = self.request.query_params.get(
                "search"
            )


            if search:

                search = search.strip()


                if search:

                    queryset = queryset.filter(

                        Q(name__icontains=search)

                        | Q(email__icontains=search)

                        | Q(phone__icontains=search)

                        | Q(user__username__icontains=search)

                        | Q(course__name__icontains=search)

                    )


            course = self.request.query_params.get(
                "course"
            )


            if course:

                queryset = queryset.filter(
                    course_id=course
                )


            admission_year = (
                self.request.query_params.get(
                    "admission_year"
                )
            )


            if admission_year:

                queryset = queryset.filter(
                    admission_year=admission_year
                )


            return queryset.order_by(
                "name"
            )


        except:

            return Student.objects.none()


# ============================================================
# HOD STUDENT DETAIL
# ============================================================

class HODStudentDetailView(
    generics.RetrieveUpdateAPIView
):

    serializer_class = StudentSerializer

    permission_classes = [
        IsAuthenticated
    ]


    def get_queryset(self):

        user = self.request.user


        try:

            profile = user.userprofile


            if (
                profile.role.name != "HOD"
                or profile.department is None
            ):

                return Student.objects.none()


            return Student.objects.filter(
                department=profile.department
            ).select_related(
                "course",
                "department",
                "user",
            )


        except:

            return Student.objects.none()


# ============================================================
# STUDENT SUBJECT LIST
# ============================================================

class StudentSubjectListView(
    generics.ListAPIView
):

    serializer_class = SubjectSerializer

    permission_classes = [
        IsAuthenticated,
        IsStudent
    ]


    def get_queryset(self):

        student = self.request.user.student


        return Subject.objects.filter(
            course=student.course,
            department=student.department,
            year=student.get_current_year()
        ).select_related(
            "course",
            "department"
        ).order_by(
            "name"
        )