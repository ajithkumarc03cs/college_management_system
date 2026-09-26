from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db.models import Q, Count
from django.utils import timezone

from rest_framework import generics, status, serializers
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.tokens import RefreshToken

from drf_spectacular.utils import (
    extend_schema,
    OpenApiParameter,
    OpenApiTypes,
)


# ============================================================
# MODELS
# ============================================================

from .models import (
    Role,
    UserProfile,
    StaffAssignment,
    Permission,
    RolePermission,
    SidebarMenu,
    RoleMenu,
    WebsiteSettings,
    WebsiteMenu,

    # HOME
    HomePage,
    HomeStatistic,
    HomeCourse,
    HomeOffer,
    HomeDepartment,
    HomeWhyChoose,
    HomeFacility,
    HomeEvent,
    HomeNotice,
    HomeGallery,
    HomeTestimonial,

    # COURSES
    CoursePage,
    CoursePageCourse,
    CourseApplication,

    # ABOUT
    AboutPage,
    AboutValue,
    AboutFacility,

    # WEBSITE DEPARTMENTS
    WebsiteDepartment,
    WebsiteDepartmentsPage,

    # WEBSITE ADMISSIONS
    WebsiteAdmissionsPage,
    WebsiteAdmissionStep,
    WebsiteAdmissionDocument,

    # WEBSITE EVENTS
    WebsiteEventsPage,
    WebsiteEvent,

    # WEBSITE GALLERY
    WebsiteGalleryPage,
    WebsiteGalleryItem,

    # WEBSITE CONTACT
    WebsiteContactPage,
    WebsiteContactMessage,

    # WEBSITE NOTICES
    WebsiteNoticesPage,
    WebsiteNotice,

    # WEBSITE PLACEMENTS
    WebsitePlacementsPage,
    WebsitePlacementFeature,
    # CourseApplication,
)

from students.models import Student


from academics.models import (
    Course,
    Department,
    Subject,
)


from exams.models import Exam


from reexams.models import ReExam


from assignments.models import (
    Assignment,
    AssignmentSubmission,
)


from attendance.models import Attendance


# ============================================================
# SERIALIZERS
# ============================================================

from .serializers import (
    # LOGIN
    LoginSerializer,

    # STAFF
    StaffAssignmentSerializer,
    StaffSerializer,
    StaffAssignmentCreateSerializer,
    StaffCreateSerializer,

    # USERS
    AdminUserCreateSerializer,
    AdminUserListSerializer,
    AdminUserUpdateSerializer,

    # ROLES
    RoleSerializer,

    # SIDEBAR / ROLE MENUS
    SidebarMenuSerializer,
    RoleMenuSerializer,

    # WEBSITE SETTINGS / MENU
    WebsiteMenuSerializer,
    WebsiteSettingsSerializer,

    # HOME
    HomePageSerializer,
    HomeStatisticSerializer,
    HomeCourseSerializer,
    HomeOfferSerializer,
    HomeDepartmentSerializer,
    HomeWhyChooseSerializer,
    HomeFacilitySerializer,
    HomeEventSerializer,
    HomeNoticeSerializer,
    HomeGallerySerializer,
    HomeTestimonialSerializer,

    # COURSES
    CoursePageCourseSerializer,
    CoursePageSerializer,
    # CoursePageSerializer,
    CourseApplicationSerializer,

    # ABOUT
    AboutPageSerializer,
    AboutValueSerializer,
    AboutFacilitySerializer,

    # WEBSITE DEPARTMENTS
    WebsiteDepartmentSerializer,
    WebsiteDepartmentsPageSerializer,

    # WEBSITE ADMISSIONS
    WebsiteAdmissionsPageSerializer,
    WebsiteAdmissionStepSerializer,
    WebsiteAdmissionDocumentSerializer,

    # WEBSITE EVENTS
    WebsiteEventsPageSerializer,
    WebsiteEventSerializer,

    # WEBSITE GALLERY
    WebsiteGalleryPageSerializer,
    WebsiteGalleryItemSerializer,

    # WEBSITE CONTACT
    WebsiteContactPageSerializer,
    WebsiteContactMessageSerializer,
        # WEBSITE NOTICES
    WebsiteNoticesPageSerializer,
    WebsiteNoticeSerializer,

    # WEBSITE PLACEMENTS
    WebsitePlacementsPageSerializer,
    WebsitePlacementFeatureSerializer,
    CourseApplicationSerializer,
    AdminCourseApplicationStatusSerializer,
    
)


from students.serializers import StudentSerializer


from academics.serializers import (
    CourseSerializer,
    DepartmentSerializer,
    SubjectSerializer,
)


from exams.serializers import ExamSerializer


from assignments.serializers import AssignmentSerializer


from attendance.serializers import AttendanceSerializer


# ============================================================
# PERMISSIONS
# ============================================================

from .permissions import (
    IsStaffRole,
    IsPrincipal,
    IsHOD,
)


from students.permissions import IsAdmin
# ============================================================
# LOGIN
# ============================================================

@extend_schema(
    request=LoginSerializer
)
class LoginView(APIView):

    def post(
        self,
        request
    ):

        serializer = LoginSerializer(
            data=request.data
        )

        if not serializer.is_valid():

            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        username = serializer.validated_data[
            "username"
        ]

        password = serializer.validated_data[
            "password"
        ]

        user = authenticate(
            username=username,
            password=password
        )

        if user is None:

            return Response(
                {
                    "message":
                        "Invalid username or password"
                },
                status=status.HTTP_401_UNAUTHORIZED
            )

        if not user.is_active:

            return Response(
                {
                    "message":
                        "User account is inactive."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        try:

            profile = (
                UserProfile.objects
                .select_related(
                    "role",
                    "department"
                )
                .get(
                    user=user
                )
            )

        except UserProfile.DoesNotExist:

            return Response(
                {
                    "message":
                        "User profile not found"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        refresh = RefreshToken.for_user(
            user
        )

        return Response({

            "message":
                "Login successful",

            "username":
                user.username,

            "email":
                user.email,

            "role":
                profile.role.name,

            "department":
                (
                    profile.department.name
                    if profile.department
                    else None
                ),

            "access":
                str(
                    refresh.access_token
                ),

            "refresh":
                str(refresh),

        })


# ============================================================
# PROFILE
# ============================================================

class ProfileView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(
        self,
        request
    ):

        try:

            profile = (
                UserProfile.objects
                .select_related(
                    "role",
                    "department"
                )
                .get(
                    user=request.user
                )
            )

        except UserProfile.DoesNotExist:

            return Response(
                {
                    "message":
                        "User profile not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        return Response({

            "username":
                request.user.username,

            "email":
                request.user.email,

            "role":
                profile.role.name,

            "department":
                (
                    profile.department.name
                    if profile.department
                    else None
                ),

        })


# ============================================================
# STAFF DASHBOARD
# ============================================================

class StaffDashboardView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsStaffRole
    ]

    def get(
        self,
        request
    ):

        # ====================================================
        # STAFF PROFILE
        # ====================================================

        try:

            profile = (
                UserProfile.objects
                .select_related(
                    "role",
                    "department"
                )
                .get(
                    user=request.user
                )
            )

        except UserProfile.DoesNotExist:

            return Response(
                {
                    "message":
                        "Staff profile not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        # ====================================================
        # STAFF ASSIGNED SUBJECTS
        # ====================================================

        staff_assignments = (
            StaffAssignment.objects
            .filter(
                staff=request.user
            )
            .select_related(
                "subject",
                "subject__course",
                "subject__department"
            )
            .order_by(
                "subject__course__name",
                "subject__year",
                "subject__name"
            )
        )

        subject_ids = (
            staff_assignments
            .values_list(
                "subject_id",
                flat=True
            )
        )

        # ====================================================
        # ASSIGNED SUBJECT COUNT
        # ====================================================

        total_assigned_subjects = (
            staff_assignments.count()
        )

        # ====================================================
        # ASSIGNED CLASS DETAILS
        # ====================================================

        classes = []

        overall_student_ids = set()

        for assignment in staff_assignments:

            subject = assignment.subject

            # ------------------------------------------------
            # STUDENTS IN COURSE + DEPARTMENT
            # ------------------------------------------------

            students = Student.objects.filter(

                course_id=subject.course_id,

                department_id=subject.department_id

            )

            # ------------------------------------------------
            # STUDENTS IN THIS YEAR
            # ------------------------------------------------

            class_students = [

                student

                for student in students

                if student.get_current_year()
                == subject.year

            ]

            # ------------------------------------------------
            # UNIQUE OVERALL STUDENTS
            # ------------------------------------------------

            for student in class_students:

                overall_student_ids.add(
                    student.id
                )

            # ------------------------------------------------
            # CLASS DETAILS
            # ------------------------------------------------

            classes.append({

                "subject_id":
                    subject.id,

                "subject_name":
                    subject.name,

                "subject_code":
                    subject.code,

                "course_id":
                    subject.course_id,

                "course_name":
                    subject.course.name,

                "department_id":
                    subject.department_id,

                "department_name":
                    subject.department.name,

                "year":
                    subject.year,

                "student_count":
                    len(class_students),

            })

        # ====================================================
        # UNIQUE CLASS COUNT
        # ====================================================

        unique_class_keys = set()

        for item in classes:

            unique_class_keys.add(

                (
                    item["course_id"],
                    item["department_id"],
                    item["year"]
                )

            )

        total_assigned_classes = len(
            unique_class_keys
        )

        # ====================================================
        # OVERALL STUDENT COUNT
        # ====================================================

        total_students = len(
            overall_student_ids
        )

        # ====================================================
        # EXAMS
        # ====================================================

        exams = Exam.objects.filter(
            subject_id__in=subject_ids
        )

        total_exams = exams.count()

        today = timezone.now().date()

        upcoming_exams = exams.filter(
            exam_date__gte=today
        ).count()

        completed_exams = exams.filter(
            exam_date__lt=today
        ).count()

        # ====================================================
        # ASSIGNMENTS
        # ====================================================

        assignments = Assignment.objects.filter(
            subject_id__in=subject_ids
        )

        total_assignments = assignments.count()

        # ====================================================
        # ASSIGNMENT SUBMISSIONS
        # ====================================================

        pending_submissions = (
            AssignmentSubmission.objects
            .filter(
                assignment__subject_id__in=subject_ids,
                status="SUBMITTED"
            )
            .count()
        )

        approved_submissions = (
            AssignmentSubmission.objects
            .filter(
                assignment__subject_id__in=subject_ids,
                status="APPROVED"
            )
            .count()
        )

        rejected_submissions = (
            AssignmentSubmission.objects
            .filter(
                assignment__subject_id__in=subject_ids,
                status="REJECTED"
            )
            .count()
        )

        # ====================================================
        # ATTENDANCE
        # ====================================================

        total_attendance = (
            Attendance.objects
            .filter(
                subject_id__in=subject_ids
            )
            .count()
        )

        # ====================================================
        # RE-EXAMS
        # ====================================================

        total_reexams = (
            ReExam.objects
            .filter(
                exam__subject_id__in=subject_ids
            )
            .count()
        )

        # ====================================================
        # RESPONSE
        # ====================================================

        return Response({

            "message":
                "Welcome to Staff Dashboard",

            "username":
                request.user.username,

            "email":
                request.user.email,

            "role":
                profile.role.name,

            "department":
                (
                    profile.department.name
                    if profile.department
                    else None
                ),

            "assigned_subjects":
                total_assigned_subjects,

            "assigned_classes":
                total_assigned_classes,

            "overall_students":
                total_students,

            "classes":
                classes,

            "exams":
                total_exams,

            "upcoming_exams":
                upcoming_exams,

            "completed_exams":
                completed_exams,

            "assignments":
                total_assignments,

            "pending_submissions":
                pending_submissions,

            "approved_submissions":
                approved_submissions,

            "rejected_submissions":
                rejected_submissions,

            "attendance_records":
                total_attendance,

            "reexams":
                total_reexams,

        })


# ============================================================
# STAFF SUBJECT LIST
# ============================================================

class StaffSubjectListView(
    generics.ListAPIView
):

    serializer_class = StaffAssignmentSerializer

    permission_classes = [
        IsAuthenticated,
        IsStaffRole
    ]

    def get_queryset(
        self
    ):

        return (
            StaffAssignment.objects
            .filter(
                staff=self.request.user
            )
            .select_related(
                "subject",
                "subject__course",
                "subject__department"
            )
            .order_by(
                "-assigned_at"
            )
        )


# ============================================================
# PRINCIPAL DASHBOARD
# ============================================================

class PrincipalDashboardView(
    generics.GenericAPIView
):

    permission_classes = [
        IsAuthenticated,
        IsPrincipal
    ]

    def get(
        self,
        request
    ):

        total_students = Student.objects.count()

        total_staff = UserProfile.objects.filter(
            role__name="Staff"
        ).count()

        total_hod = UserProfile.objects.filter(
            role__name="HOD"
        ).count()

        total_principals = UserProfile.objects.filter(
            role__name="Principal"
        ).count()

        total_courses = Course.objects.count()

        total_departments = Department.objects.count()

        total_subjects = Subject.objects.count()

        total_exams = Exam.objects.count()

        total_assignments = Assignment.objects.count()

        total_attendance = Attendance.objects.count()

        return Response({

            "message":
                "Welcome to Principal Dashboard",

            "users": {

                "students":
                    total_students,

                "staff":
                    total_staff,

                "hod":
                    total_hod,

                "principals":
                    total_principals,

            },

            "academics": {

                "courses":
                    total_courses,

                "departments":
                    total_departments,

                "subjects":
                    total_subjects,

            },

            "activities": {

                "exams":
                    total_exams,

                "assignments":
                    total_assignments,

                "attendance_records":
                    total_attendance,

            },

        })


# ============================================================
# HOD DASHBOARD
# ============================================================

class HODDashboardView(
    generics.GenericAPIView
):

    permission_classes = [
        IsAuthenticated,
        IsHOD
    ]

    def get(
        self,
        request
    ):

        # ====================================================
        # HOD PROFILE
        # ====================================================

        try:

            profile = (
                UserProfile.objects
                .select_related(
                    "role",
                    "department"
                )
                .get(
                    user=request.user
                )
            )

        except UserProfile.DoesNotExist:

            return Response(
                {
                    "message":
                        "HOD profile not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        # ====================================================
        # DEPARTMENT
        # ====================================================

        department = profile.department

        if department is None:

            return Response(
                {
                    "message":
                        "HOD is not assigned to a department."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # ====================================================
        # STUDENTS
        # ====================================================

        total_students = Student.objects.filter(
            department=department
        ).count()

        # ====================================================
        # STAFF
        # ====================================================

        total_staff = User.objects.filter(

            userprofile__role__name="Staff",

            userprofile__department=department

        ).count()

        # ====================================================
        # SUBJECTS
        # ====================================================

        total_subjects = Subject.objects.filter(
            department=department
        ).count()

        # ====================================================
        # EXAMS
        # ====================================================

        total_exams = Exam.objects.filter(
            department=department
        ).count()

        # ====================================================
        # UPCOMING EXAMS
        # ====================================================

        today = timezone.now().date()

        upcoming_exams = Exam.objects.filter(

            department=department,

            exam_date__gte=today

        ).count()

        # ====================================================
        # ASSIGNMENTS
        # ====================================================

        total_assignments = Assignment.objects.filter(
            subject__department=department
        ).count()

        # ====================================================
        # ATTENDANCE
        # ====================================================

        total_attendance = Attendance.objects.filter(
            department=department
        ).count()

        # ====================================================
        # RE-EXAMS
        # ====================================================

        total_reexams = (
            ReExam.objects
            .filter(
                Q(
                    exam__department=department
                )
                |
                Q(
                    exam__subject__department=department
                )
            )
            .distinct()
            .count()
        )

        # ====================================================
        # STAFF SUBJECT ASSIGNMENTS
        # ====================================================

        total_staff_assignments = (
            StaffAssignment.objects
            .filter(
                staff__userprofile__department=department
            )
            .count()
        )

        # ====================================================
        # RESPONSE
        # ====================================================

        return Response({

            "message":
                "Welcome to HOD Dashboard",

            "department": {

                "id":
                    department.id,

                "name":
                    department.name,

            },

            "students":
                total_students,

            "staff":
                total_staff,

            "subjects":
                total_subjects,

            "exams":
                total_exams,

            "upcoming_exams":
                upcoming_exams,

            "assignments":
                total_assignments,

            "attendance_records":
                total_attendance,

            "reexams":
                total_reexams,

            "staff_subject_assignments":
                total_staff_assignments,

        })


# ============================================================
# HOD STAFF LIST
# ============================================================

class HODStaffListView(
    generics.ListAPIView
):

    serializer_class = StaffSerializer

    permission_classes = [
        IsAuthenticated,
        IsHOD
    ]

    def get_queryset(
        self
    ):

        profile = self.request.user.userprofile

        department = profile.department

        return (
            User.objects
            .filter(
                userprofile__role__name="Staff",
                userprofile__department=department
            )
            .select_related(
                "userprofile",
                "userprofile__role",
                "userprofile__department"
            )
            .order_by(
                "username"
            )
            .distinct()
        )


# ============================================================
# HOD ASSIGN SUBJECT TO STAFF
# ============================================================

class HODStaffAssignmentCreateView(
    generics.CreateAPIView
):

    serializer_class = StaffAssignmentCreateSerializer

    permission_classes = [
        IsAuthenticated,
        IsHOD
    ]


# ============================================================
# HOD STAFF ASSIGNMENTS LIST
# ============================================================

class HODStaffAssignmentListView(
    generics.ListAPIView
):

    serializer_class = StaffAssignmentSerializer

    permission_classes = [
        IsAuthenticated,
        IsHOD
    ]

    def get_queryset(
        self
    ):

        profile = self.request.user.userprofile

        department = profile.department

        return (
            StaffAssignment.objects
            .filter(
                staff__userprofile__department_id=department.id,
                subject__department_id=department.id,
                staff__userprofile__role__name="Staff"
            )
            .select_related(
                "staff",
                "subject",
                "subject__course",
                "subject__department"
            )
            .order_by(
                "-assigned_at"
            )
        )


# ============================================================
# HOD UPDATE STAFF SUBJECT ASSIGNMENT
# ============================================================

class HODStaffAssignmentUpdateView(
    generics.UpdateAPIView
):

    serializer_class = StaffAssignmentCreateSerializer

    permission_classes = [
        IsAuthenticated,
        IsHOD
    ]

    http_method_names = [
        "patch"
    ]

    def get_queryset(
        self
    ):

        profile = self.request.user.userprofile

        department = profile.department

        return (
            StaffAssignment.objects
            .filter(
                staff__userprofile__department_id=department.id,
                subject__department_id=department.id,
                staff__userprofile__role__name="Staff"
            )
            .select_related(
                "staff",
                "subject",
                "subject__course",
                "subject__department"
            )
        )


# ============================================================
# HOD REMOVE SUBJECT FROM STAFF
# ============================================================

class HODStaffAssignmentDeleteView(
    generics.DestroyAPIView
):

    serializer_class = StaffAssignmentSerializer

    permission_classes = [
        IsAuthenticated,
        IsHOD
    ]

    def get_queryset(
        self
    ):

        profile = self.request.user.userprofile

        department = profile.department

        return (
            StaffAssignment.objects
            .filter(
                staff__userprofile__department_id=department.id,
                subject__department_id=department.id,
                staff__userprofile__role__name="Staff"
            )
        )


# ============================================================
# ADMIN STAFF LIST
# ============================================================

class AdminStaffListView(
    generics.ListAPIView
):

    serializer_class = StaffSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    def get_queryset(
        self
    ):

        queryset = (
            User.objects
            .filter(
                userprofile__role__name="Staff"
            )
            .select_related(
                "userprofile",
                "userprofile__role",
                "userprofile__department"
            )
            .distinct()
        )

        search = self.request.query_params.get(
            "search"
        )

        if search:

            queryset = queryset.filter(

                Q(
                    username__icontains=search
                )
                |
                Q(
                    email__icontains=search
                )

            )

        department = self.request.query_params.get(
            "department"
        )

        if department:

            queryset = queryset.filter(
                userprofile__department_id=department
            )

        return queryset.order_by(
            "username"
        )


# ============================================================
# ADMIN CREATE STAFF
# ============================================================

class AdminStaffCreateView(
    generics.CreateAPIView
):

    serializer_class = StaffCreateSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]


# ============================================================
# ADMIN CREATE USER
# ============================================================

class AdminUserCreateView(
    generics.CreateAPIView
):

    serializer_class = AdminUserCreateSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]


# ============================================================
# ADMIN ROLE LIST / CREATE
# ============================================================

class AdminRoleListView(
    generics.ListCreateAPIView
):

    serializer_class = RoleSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    def get_queryset(
        self
    ):

        return (
            Role.objects
            .annotate(
                user_count=Count(
                    "userprofile"
                )
            )
            .order_by(
                "name"
            )
        )


# ============================================================
# ADMIN ROLE DETAIL / UPDATE / DELETE
# ============================================================

class AdminRoleDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    serializer_class = RoleSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    def get_queryset(
        self
    ):

        return (
            Role.objects
            .annotate(
                user_count=Count(
                    "userprofile"
                )
            )
            .order_by(
                "name"
            )
        )

    def perform_destroy(
        self,
        instance
    ):

        user_count = (
            UserProfile.objects
            .filter(
                role=instance
            )
            .count()
        )

        if user_count > 0:

            raise serializers.ValidationError({

                "detail":
                    f'Role "{instance.name}" cannot be deleted '
                    f'because {user_count} user(s) are assigned to it.'

            })

        instance.delete()


# ============================================================
# ADMIN USER LIST
# ============================================================

class AdminUserListView(
    generics.ListAPIView
):

    serializer_class = AdminUserListSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    def get_queryset(
        self
    ):

        queryset = (
            User.objects
            .filter(
                userprofile__isnull=False
            )
            .select_related(
                "userprofile",
                "userprofile__role",
                "userprofile__department"
            )
        )

        search = self.request.query_params.get(
            "search"
        )

        if search:

            queryset = queryset.filter(

                Q(
                    username__icontains=search
                )
                |
                Q(
                    email__icontains=search
                )

            )

        role = self.request.query_params.get(
            "role"
        )

        if role:

            queryset = queryset.filter(
                userprofile__role__name__iexact=role
            )

        department = self.request.query_params.get(
            "department"
        )

        if department:

            queryset = queryset.filter(
                userprofile__department_id=department
            )

        return queryset.order_by(
            "username"
        )


# ============================================================
# ADMIN USER UPDATE
# ============================================================

class AdminUserUpdateView(
    generics.UpdateAPIView
):

    serializer_class = AdminUserUpdateSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    http_method_names = [
        "patch"
    ]

    def get_queryset(
        self
    ):

        return (
            User.objects
            .filter(
                userprofile__isnull=False
            )
            .select_related(
                "userprofile",
                "userprofile__role",
                "userprofile__department"
            )
        )


# ============================================================
# ADMIN USER DEACTIVATE
# ============================================================

class AdminUserDeactivateView(
    generics.UpdateAPIView
):

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    http_method_names = [
        "patch"
    ]

    def get_queryset(
        self
    ):

        return User.objects.filter(
            userprofile__isnull=False
        )

    def patch(
        self,
        request,
        *args,
        **kwargs
    ):

        user = self.get_object()

        if user == request.user:

            return Response(
                {
                    "message":
                        "Admin cannot deactivate own account."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        user.is_active = False

        user.save(
            update_fields=[
                "is_active"
            ]
        )

        return Response({

            "message":
                "User deactivated successfully.",

            "username":
                user.username,

            "is_active":
                user.is_active,

        })


# ============================================================
# PRINCIPAL - STUDENTS
# ============================================================

class PrincipalStudentListView(
    generics.ListAPIView
):

    serializer_class = StudentSerializer

    permission_classes = [
        IsAuthenticated,
        IsPrincipal
    ]

    def get_queryset(
        self
    ):

        queryset = (
            Student.objects
            .all()
            .select_related(
                "course",
                "department"
            )
        )

        search = self.request.query_params.get(
            "search"
        )

        if search:

            queryset = queryset.filter(

                Q(
                    name__icontains=search
                )
                |
                Q(
                    email__icontains=search
                )
                |
                Q(
                    phone__icontains=search
                )

            )

        course = self.request.query_params.get(
            "course"
        )

        if course:

            queryset = queryset.filter(
                course_id=course
            )

        department = self.request.query_params.get(
            "department"
        )

        if department:

            queryset = queryset.filter(
                department_id=department
            )

        year = self.request.query_params.get(
            "year"
        )

        if year:

            students = list(
                queryset
            )

            students = [

                student

                for student in students

                if student.get_current_year()
                == int(year)

            ]

            return students

        return queryset.order_by(
            "name"
        )


# ============================================================
# PRINCIPAL - STAFF
# ============================================================

class PrincipalStaffListView(
    generics.ListAPIView
):

    serializer_class = StaffSerializer

    permission_classes = [
        IsAuthenticated,
        IsPrincipal
    ]

    def get_queryset(
        self
    ):

        queryset = (
            User.objects
            .filter(
                userprofile__role__name="Staff"
            )
            .select_related(
                "userprofile",
                "userprofile__role",
                "userprofile__department"
            )
        )

        search = self.request.query_params.get(
            "search"
        )

        if search:

            queryset = queryset.filter(

                Q(
                    username__icontains=search
                )
                |
                Q(
                    email__icontains=search
                )

            )

        department = self.request.query_params.get(
            "department"
        )

        if department:

            queryset = queryset.filter(
                userprofile__department_id=department
            )

        return (
            queryset
            .order_by(
                "username"
            )
            .distinct()
        )


# ============================================================
# PRINCIPAL - HOD
# ============================================================

class PrincipalHODListView(
    generics.ListAPIView
):

    serializer_class = StaffSerializer

    permission_classes = [
        IsAuthenticated,
        IsPrincipal
    ]

    def get_queryset(
        self
    ):

        queryset = (
            User.objects
            .filter(
                userprofile__role__name="HOD"
            )
            .select_related(
                "userprofile",
                "userprofile__role",
                "userprofile__department"
            )
        )

        search = self.request.query_params.get(
            "search"
        )

        if search:

            queryset = queryset.filter(

                Q(
                    username__icontains=search
                )
                |
                Q(
                    email__icontains=search
                )

            )

        department = self.request.query_params.get(
            "department"
        )

        if department:

            queryset = queryset.filter(
                userprofile__department_id=department
            )

        return (
            queryset
            .order_by(
                "username"
            )
            .distinct()
        )


# ============================================================
# PRINCIPAL - COURSES
# ============================================================

class PrincipalCourseListView(
    generics.ListAPIView
):

    serializer_class = CourseSerializer

    permission_classes = [
        IsAuthenticated,
        IsPrincipal
    ]

    def get_queryset(
        self
    ):

        return (
            Course.objects
            .all()
            .select_related(
                "level"
            )
            .order_by(
                "name"
            )
        )


# ============================================================
# PRINCIPAL - DEPARTMENTS
# ============================================================

class PrincipalDepartmentListView(
    generics.ListAPIView
):

    serializer_class = DepartmentSerializer

    permission_classes = [
        IsAuthenticated,
        IsPrincipal
    ]

    def get_queryset(
        self
    ):

        return (
            Department.objects
            .all()
            .order_by(
                "name"
            )
        )


# ============================================================
# PRINCIPAL - SUBJECTS
# ============================================================

class PrincipalSubjectListView(
    generics.ListAPIView
):

    serializer_class = SubjectSerializer

    permission_classes = [
        IsAuthenticated,
        IsPrincipal
    ]

    def get_queryset(
        self
    ):

        queryset = (
            Subject.objects
            .all()
            .select_related(
                "course",
                "department"
            )
        )

        search = self.request.query_params.get(
            "search"
        )

        if search:

            queryset = queryset.filter(

                Q(
                    name__icontains=search
                )
                |
                Q(
                    code__icontains=search
                )

            )

        course = self.request.query_params.get(
            "course"
        )

        if course:

            queryset = queryset.filter(
                course_id=course
            )

        department = self.request.query_params.get(
            "department"
        )

        if department:

            queryset = queryset.filter(
                department_id=department
            )

        year = self.request.query_params.get(
            "year"
        )

        if year:

            queryset = queryset.filter(
                year=year
            )

        return queryset.order_by(
            "name"
        )


# ============================================================
# PRINCIPAL - EXAMS
# ============================================================

class PrincipalExamListView(
    generics.ListAPIView
):

    serializer_class = ExamSerializer

    permission_classes = [
        IsAuthenticated,
        IsPrincipal
    ]

    def get_queryset(
        self
    ):

        queryset = (
            Exam.objects
            .all()
            .select_related(
                "subject",
                "course",
                "department",
                "created_by"
            )
        )

        search = self.request.query_params.get(
            "search"
        )

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

        subject = self.request.query_params.get(
            "subject"
        )

        if subject:

            queryset = queryset.filter(
                subject_id=subject
            )

        course = self.request.query_params.get(
            "course"
        )

        if course:

            queryset = queryset.filter(
                course_id=course
            )

        department = self.request.query_params.get(
            "department"
        )

        if department:

            queryset = queryset.filter(
                department_id=department
            )

        year = self.request.query_params.get(
            "year"
        )

        if year:

            queryset = queryset.filter(
                year=year
            )

        return (
            queryset
            .order_by(
                "-exam_date",
                "start_time"
            )
        )


# ============================================================
# PRINCIPAL - ASSIGNMENTS
# ============================================================

class PrincipalAssignmentListView(
    generics.ListAPIView
):

    serializer_class = AssignmentSerializer

    permission_classes = [
        IsAuthenticated,
        IsPrincipal
    ]

    def get_queryset(
        self
    ):

        queryset = (
            Assignment.objects
            .all()
            .select_related(
                "subject",
                "exam",
                "student",
                "assigned_by"
            )
        )

        search = self.request.query_params.get(
            "search"
        )

        if search:

            queryset = queryset.filter(

                Q(
                    title__icontains=search
                )
                |
                Q(
                    subject__name__icontains=search
                )
                |
                Q(
                    exam__name__icontains=search
                )
                |
                Q(
                    student__name__icontains=search
                )

            )

        subject = self.request.query_params.get(
            "subject"
        )

        if subject:

            queryset = queryset.filter(
                subject_id=subject
            )

        exam = self.request.query_params.get(
            "exam"
        )

        if exam:

            queryset = queryset.filter(
                exam_id=exam
            )

        department = self.request.query_params.get(
            "department"
        )

        if department:

            queryset = queryset.filter(
                subject__department_id=department
            )

        return queryset.order_by(
            "-created_at"
        )


# ============================================================
# PRINCIPAL - ATTENDANCE
# ============================================================

class PrincipalAttendanceListView(
    generics.ListAPIView
):

    serializer_class = AttendanceSerializer

    permission_classes = [
        IsAuthenticated,
        IsPrincipal
    ]

    def get_queryset(
        self
    ):

        queryset = (
            Attendance.objects
            .all()
            .select_related(
                "student",
                "subject",
                "course",
                "department",
                "marked_by"
            )
        )

        search = self.request.query_params.get(
            "search"
        )

        if search:

            queryset = queryset.filter(

                Q(
                    student__name__icontains=search
                )
                |
                Q(
                    student__email__icontains=search
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

        student = self.request.query_params.get(
            "student"
        )

        if student:

            queryset = queryset.filter(
                student_id=student
            )

        subject = self.request.query_params.get(
            "subject"
        )

        if subject:

            queryset = queryset.filter(
                subject_id=subject
            )

        course = self.request.query_params.get(
            "course"
        )

        if course:

            queryset = queryset.filter(
                course_id=course
            )

        department = self.request.query_params.get(
            "department"
        )

        if department:

            queryset = queryset.filter(
                department_id=department
            )

        year = self.request.query_params.get(
            "year"
        )

        if year:

            queryset = queryset.filter(
                year=year
            )

        attendance_status = (
            self.request.query_params.get(
                "status"
            )
        )

        if attendance_status:

            queryset = queryset.filter(
                status=attendance_status.upper()
            )

        attendance_date = (
            self.request.query_params.get(
                "date"
            )
        )

        if attendance_date:

            queryset = queryset.filter(
                date=attendance_date
            )

        return (
            queryset
            .order_by(
                "-date",
                "student__name"
            )
        )


# ============================================================
# ADMIN DASHBOARD
# ============================================================

class AdminDashboardView(
    generics.GenericAPIView
):

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    def get(
        self,
        request
    ):

        # ====================================================
        # USERS
        # ====================================================

        total_users = User.objects.count()

        total_students = Student.objects.count()

        total_staff = User.objects.filter(
            userprofile__role__name="Staff"
        ).count()

        total_hod = User.objects.filter(
            userprofile__role__name="HOD"
        ).count()

        total_principal = User.objects.filter(
            userprofile__role__name="Principal"
        ).count()

        # ====================================================
        # ACADEMICS
        # ====================================================

        total_courses = Course.objects.count()

        total_departments = Department.objects.count()

        total_subjects = Subject.objects.count()

        # ====================================================
        # ACTIVITIES
        # ====================================================

        total_exams = Exam.objects.count()

        total_assignments = Assignment.objects.count()

        total_attendance = Attendance.objects.count()

        # ====================================================
        # ROLES
        # ====================================================

        roles = (
            Role.objects
            .annotate(
                user_count=Count(
                    "userprofile"
                )
            )
            .order_by(
                "name"
            )
        )

        role_data = [

            {
                "id":
                    role.id,

                "name":
                    role.name,

                "user_count":
                    role.user_count,

            }

            for role in roles

        ]

        # ====================================================
        # RESPONSE
        # ====================================================

        return Response({

            "users": {

                "total":
                    total_users,

                "students":
                    total_students,

                "staff":
                    total_staff,

                "hod":
                    total_hod,

                "principal":
                    total_principal,

            },

            "roles": {

                "total":
                    roles.count(),

                "items":
                    role_data,

            },

            "academics": {

                "courses":
                    total_courses,

                "departments":
                    total_departments,

                "subjects":
                    total_subjects,

            },

            "activities": {

                "exams":
                    total_exams,

                "assignments":
                    total_assignments,

                "attendance_records":
                    total_attendance,

            },

        })


# ============================================================
# ADMIN PERMISSIONS
# ============================================================

@extend_schema(
    parameters=[
        OpenApiParameter(
            name="role_id",
            description="Role ID",
            required=True,
            type=OpenApiTypes.INT,
            location=OpenApiParameter.QUERY,
        )
    ]
)
class AdminPermissionView(
    APIView
):

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    # ========================================================
    # GET PERMISSIONS
    # ========================================================

    def get(
        self,
        request
    ):

        role_id = request.query_params.get(
            "role_id"
        )

        if not role_id:

            return Response(
                {
                    "detail":
                        "role_id is required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        try:

            role = Role.objects.get(
                id=role_id
            )

        except Role.DoesNotExist:

            return Response(
                {
                    "detail":
                        "Role not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        permissions = (
            Permission.objects
            .all()
            .order_by(
                "id"
            )
        )

        result = []

        for permission in permissions:

            role_permission = (
                RolePermission.objects
                .filter(
                    role=role,
                    permission=permission
                )
                .first()
            )

            result.append({

                "permission_id":
                    permission.id,

                "permission_name":
                    permission.name,

                "permission_code":
                    permission.code,

                "can_view":
                    (
                        role_permission.can_view
                        if role_permission
                        else False
                    ),

                "can_create":
                    (
                        role_permission.can_create
                        if role_permission
                        else False
                    ),

                "can_edit":
                    (
                        role_permission.can_edit
                        if role_permission
                        else False
                    ),

                "can_delete":
                    (
                        role_permission.can_delete
                        if role_permission
                        else False
                    ),

            })

        return Response({

            "role": {

                "id":
                    role.id,

                "name":
                    role.name,

            },

            "permissions":
                result,

        })

    # ========================================================
    # UPDATE PERMISSIONS
    # ========================================================

    def put(
        self,
        request
    ):

        role_id = request.data.get(
            "role_id"
        )

        permissions_data = request.data.get(
            "permissions",
            []
        )

        if not role_id:

            return Response(
                {
                    "detail":
                        "role_id is required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        try:

            role = Role.objects.get(
                id=role_id
            )

        except Role.DoesNotExist:

            return Response(
                {
                    "detail":
                        "Role not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        if not isinstance(
            permissions_data,
            list
        ):

            return Response(
                {
                    "detail":
                        "permissions must be a list."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        for item in permissions_data:

            permission_id = item.get(
                "permission_id"
            )

            if not permission_id:
                continue

            try:

                permission = Permission.objects.get(
                    id=permission_id
                )

            except Permission.DoesNotExist:

                continue

            RolePermission.objects.update_or_create(

                role=role,

                permission=permission,

                defaults={

                    "can_view":
                        bool(
                            item.get(
                                "can_view",
                                False
                            )
                        ),

                    "can_create":
                        bool(
                            item.get(
                                "can_create",
                                False
                            )
                        ),

                    "can_edit":
                        bool(
                            item.get(
                                "can_edit",
                                False
                            )
                        ),

                    "can_delete":
                        bool(
                            item.get(
                                "can_delete",
                                False
                            )
                        ),

                }

            )

        return Response({

            "detail":
                "Permissions updated successfully."

        })


# ============================================================
# ADMIN SIDEBAR MENUS
# ============================================================

class AdminSidebarMenuView(
    generics.ListCreateAPIView
):

    serializer_class = SidebarMenuSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    def get_queryset(
        self
    ):

        return (
            SidebarMenu.objects
            .all()
            .order_by(
                "order",
                "id"
            )
        )


# ============================================================
# ADMIN SIDEBAR MENU DETAIL
# ============================================================

class AdminSidebarMenuDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    serializer_class = SidebarMenuSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    queryset = SidebarMenu.objects.all()


# ============================================================
# ADMIN ROLE MENU
# ============================================================

@extend_schema(
    parameters=[
        OpenApiParameter(
            name="role_id",
            description="Role ID",
            required=True,
            type=OpenApiTypes.INT,
            location=OpenApiParameter.QUERY,
        )
    ]
)
class AdminRoleMenuView(
    APIView
):

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    # ========================================================
    # GET ROLE MENUS
    # ========================================================

    def get(
        self,
        request
    ):

        role_id = request.query_params.get(
            "role_id"
        )

        if not role_id:

            return Response(
                {
                    "detail":
                        "role_id is required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        try:

            role = Role.objects.get(
                id=role_id
            )

        except Role.DoesNotExist:

            return Response(
                {
                    "detail":
                        "Role not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        menus = (
            SidebarMenu.objects
            .all()
            .order_by(
                "order",
                "id"
            )
        )

        role_menus = {

            role_menu.menu_id:
                role_menu

            for role_menu in (
                RoleMenu.objects
                .filter(
                    role=role
                )
            )

        }

        result = []

        for menu in menus:

            role_menu = role_menus.get(
                menu.id
            )

            result.append({

                "menu_id":
                    menu.id,

                "menu_name":
                    menu.name,

                "menu_path":
                    menu.path,

                "menu_icon":
                    menu.icon,

                "is_active":
                    menu.is_active,

                "is_visible":
                    (
                        role_menu.is_visible
                        if role_menu
                        else False
                    ),

            })

        return Response({

            "role": {

                "id":
                    role.id,

                "name":
                    role.name,

            },

            "menus":
                result,

        })

    # ========================================================
    # UPDATE ROLE MENUS
    # ========================================================

    def put(
        self,
        request
    ):

        role_id = request.data.get(
            "role_id"
        )

        menus_data = request.data.get(
            "menus",
            []
        )

        if not role_id:

            return Response(
                {
                    "detail":
                        "role_id is required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        try:

            role = Role.objects.get(
                id=role_id
            )

        except Role.DoesNotExist:

            return Response(
                {
                    "detail":
                        "Role not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        if not isinstance(
            menus_data,
            list
        ):

            return Response(
                {
                    "detail":
                        "menus must be a list."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        for item in menus_data:

            menu_id = item.get(
                "menu_id"
            )

            if not menu_id:
                continue

            try:

                menu = SidebarMenu.objects.get(
                    id=menu_id
                )

            except SidebarMenu.DoesNotExist:

                continue

            is_visible = item.get(
                "is_visible",
                False
            )

            RoleMenu.objects.update_or_create(

                role=role,

                menu=menu,

                defaults={

                    "is_visible":
                        bool(is_visible)

                }

            )

        return Response({

            "detail":
                "Sidebar menu permissions updated successfully."

        })
class MyPermissionsView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        try:

            profile = (
                UserProfile.objects
                .select_related(
                    "role",
                    "department"
                )
                .get(
                    user=request.user
                )
            )

            role = profile.role

        except UserProfile.DoesNotExist:

            return Response(
                {
                    "detail":
                        "User profile or role not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )


        # =====================================================
        # ROLE PERMISSIONS
        # =====================================================

        role_permissions = (
            RolePermission.objects
            .filter(
                role=role
            )
            .select_related(
                "permission"
            )
        )


        permission_data = {}


        for role_permission in role_permissions:

            permission = role_permission.permission

            permission_data[
                permission.code
            ] = {

                "name":
                    permission.name,

                "code":
                    permission.code,

                "view":
                    role_permission.can_view,

                "create":
                    role_permission.can_create,

                "edit":
                    role_permission.can_edit,

                "delete":
                    role_permission.can_delete,

            }


        # =====================================================
        # ROLE SIDEBAR MENUS
        # =====================================================

        menus = (
            SidebarMenu.objects
            .filter(
                is_active=True,
                roles__role=role,
                roles__is_visible=True
            )
            .distinct()
            .order_by(
                "order",
                "id"
            )
        )


        menu_data = []


        for menu in menus:

            # ---------------------------------------------
            # Convert menu name → permission code
            # ---------------------------------------------

            permission_code = (
                menu.name
                .lower()
                .replace(" ", "")
                .replace("-", "")
            )


            permission = (
                permission_data.get(
                    permission_code
                )
            )


            menu_data.append({

                "id":
                    menu.id,

                "name":
                    menu.name,

                "path":
                    menu.path,

                "icon":
                    menu.icon,

                "order":
                    menu.order,

                "permission_code":
                    permission_code,

                "permission":
                    permission
                    if permission
                    else {

                        "name":
                            menu.name,

                        "code":
                            permission_code,

                        "view":
                            False,

                        "create":
                            False,

                        "edit":
                            False,

                        "delete":
                            False,

                    }

            })


        return Response({

            "user": {

                "id":
                    request.user.id,

                "username":
                    request.user.username,

                "email":
                    request.user.email,

            },

            "role": {

                "id":
                    role.id,

                "name":
                    role.name,

            },

            "menus":
                menu_data,

            "permissions":
                permission_data,

        })


# ============================================================
# PUBLIC WEBSITE SETTINGS
# ============================================================

class PublicWebsiteSettingsView(APIView):

    authentication_classes = []

    permission_classes = [
        AllowAny
    ]

    def get(self, request):

        settings = WebsiteSettings.objects.first()

        if not settings:

            return Response({

                "college_name":
                    "EduManage College",

                "tagline":
                    "Excellence in Education",

                "description":
                    "",

                "address":
                    "",

                "phone":
                    "",

                "email":
                    "",

                "logo":
                    None,

                "facebook":
                    "",

                "instagram":
                    "",

                "youtube":
                    "",

                "linkedin":
                    "",

            })

        serializer = WebsiteSettingsSerializer(
            settings
        )

        return Response(
            serializer.data
        )

class PublicWebsiteMenuView(APIView):

    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):

        menus = WebsiteMenu.objects.filter(
            is_active=True
        ).order_by("order", "id")

        serializer = WebsiteMenuSerializer(
            menus,
            many=True
        )

        return Response(serializer.data)



# ============================================================
# ADMIN WEBSITE MENUS
# ============================================================

class AdminWebsiteMenuView(
    generics.ListCreateAPIView
):

    serializer_class = WebsiteMenuSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    def get_queryset(self):

        return WebsiteMenu.objects.all().order_by(
            "order",
            "id"
        )


# ============================================================
# ADMIN WEBSITE MENU DETAIL
# ============================================================

class AdminWebsiteMenuDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    serializer_class = WebsiteMenuSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    queryset = WebsiteMenu.objects.all()




class PublicHomeView(APIView):

    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):

        home, created = HomePage.objects.get_or_create(
            pk=1
        )

        serializer = HomePageSerializer(home)

        return Response(serializer.data)






class AdminHomeView(APIView):

    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):

        home, created = HomePage.objects.get_or_create(
            pk=1
        )

        serializer = HomePageSerializer(home)

        return Response(serializer.data)

    def patch(self, request):

        home, created = HomePage.objects.get_or_create(
            pk=1
        )

        serializer = HomePageSerializer(
            home,
            data=request.data,
            partial=True
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)








class AdminHomeStatisticView(generics.ListCreateAPIView):

    serializer_class = HomeStatisticSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    def get_queryset(self):
        return HomeStatistic.objects.filter(
            home_id=1
        ).order_by("order", "id")

    def perform_create(self, serializer):
        home, created = HomePage.objects.get_or_create(pk=1)

        serializer.save(home=home)


class AdminHomeStatisticDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    serializer_class = HomeStatisticSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    def get_queryset(self):
        return HomeStatistic.objects.filter(
            home_id=1
        )










class AdminHomeStatisticView(generics.ListCreateAPIView):

    serializer_class = HomeStatisticSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    def get_queryset(self):
        return HomeStatistic.objects.filter(
            home_id=1
        ).order_by("order", "id")

    def perform_create(self, serializer):
        home, created = HomePage.objects.get_or_create(
            pk=1
        )

        serializer.save(home=home)


class AdminHomeStatisticDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    serializer_class = HomeStatisticSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    def get_queryset(self):
        return HomeStatistic.objects.filter(
            home_id=1
        )




class AdminHomeCourseView(generics.ListCreateAPIView):

    serializer_class = HomeCourseSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    def get_queryset(self):
        return HomeCourse.objects.filter(
            home_id=1
        ).order_by("order", "id")

    def perform_create(self, serializer):
        home, created = HomePage.objects.get_or_create(
            pk=1
        )

        serializer.save(home=home)


class AdminHomeCourseDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    serializer_class = HomeCourseSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    def get_queryset(self):
        return HomeCourse.objects.filter(
            home_id=1
        )



class PublicCoursesView(APIView):

    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):

        page, created = CoursePage.objects.get_or_create(
            pk=1
        )

        serializer = CoursePageSerializer(page)

        return Response(serializer.data)




class AdminCoursesPageView(APIView):

    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):

        page, created = CoursePage.objects.get_or_create(
            pk=1
        )

        serializer = CoursePageSerializer(page)

        return Response(serializer.data)

    def patch(self, request):

        page, created = CoursePage.objects.get_or_create(
            pk=1
        )

        serializer = CoursePageSerializer(
            page,
            data=request.data,
            partial=True
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)




class AdminCoursePageCourseView(
    generics.ListCreateAPIView
):

    serializer_class = CoursePageCourseSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    def get_queryset(self):

        return CoursePageCourse.objects.filter(
            page_id=1
        ).order_by(
            "order",
            "id"
        )

    def perform_create(self, serializer):

        page, created = CoursePage.objects.get_or_create(
            pk=1
        )

        serializer.save(page=page)







class AdminCoursePageCourseDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    serializer_class = CoursePageCourseSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    def get_queryset(self):

        return CoursePageCourse.objects.filter(
            page_id=1
        )



class PublicAboutView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):
        page, created = AboutPage.objects.get_or_create(
            pk=1
        )

        serializer = AboutPageSerializer(page)

        return Response(serializer.data)







class AdminAboutValueView(
    generics.ListCreateAPIView
):
    serializer_class = AboutValueSerializer
    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    def get_queryset(self):
        return AboutValue.objects.filter(
            page_id=1
        ).order_by("order", "id")

    def perform_create(self, serializer):
        page, created = AboutPage.objects.get_or_create(
            pk=1
        )

        serializer.save(page=page)


class AdminAboutValueDetailView(
    generics.RetrieveUpdateDestroyAPIView
):
    serializer_class = AboutValueSerializer
    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    def get_queryset(self):
        return AboutValue.objects.filter(
            page_id=1
        )




class AdminAboutFacilityView(
    generics.ListCreateAPIView
):
    serializer_class = AboutFacilitySerializer
    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    def get_queryset(self):
        return AboutFacility.objects.filter(
            page_id=1
        ).order_by("order", "id")

    def perform_create(self, serializer):
        page, created = AboutPage.objects.get_or_create(
            pk=1
        )

        serializer.save(page=page)


class AdminAboutFacilityDetailView(
    generics.RetrieveUpdateDestroyAPIView
):
    serializer_class = AboutFacilitySerializer
    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    def get_queryset(self):
        return AboutFacility.objects.filter(
            page_id=1
        )



class AdminAboutView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        page, created = AboutPage.objects.get_or_create(pk=1)
        serializer = AboutPageSerializer(page)
        return Response(serializer.data)

    def patch(self, request):
        page, created = AboutPage.objects.get_or_create(pk=1)

        serializer = AboutPageSerializer(
            page,
            data=request.data,
            partial=True
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)





class AdminAboutValueView(generics.ListCreateAPIView):
    serializer_class = AboutValueSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    def get_queryset(self):
        return AboutValue.objects.filter(
            page_id=1
        ).order_by("order", "id")

    def perform_create(self, serializer):
        page, created = AboutPage.objects.get_or_create(pk=1)
        serializer.save(page=page)


class AdminAboutValueDetailView(
    generics.RetrieveUpdateDestroyAPIView
):
    serializer_class = AboutValueSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    def get_queryset(self):
        return AboutValue.objects.filter(page_id=1)





class AdminAboutFacilityView(generics.ListCreateAPIView):
    serializer_class = AboutFacilitySerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    def get_queryset(self):
        return AboutFacility.objects.filter(
            page_id=1
        ).order_by("order", "id")

    def perform_create(self, serializer):
        page, created = AboutPage.objects.get_or_create(pk=1)
        serializer.save(page=page)


class AdminAboutFacilityDetailView(
    generics.RetrieveUpdateDestroyAPIView
):
    serializer_class = AboutFacilitySerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    def get_queryset(self):
        return AboutFacility.objects.filter(page_id=1)





class WebsiteDepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebsiteDepartment
        fields = [
            "id",
            "name",
            "icon",
            "description",
            "order",
            "is_active",
        ]
        read_only_fields = ["id"]



# ============================================================
# PUBLIC DEPARTMENTS
# ============================================================

class PublicDepartmentsView(
    generics.ListAPIView
):

    authentication_classes = []

    permission_classes = [
        AllowAny
    ]

    serializer_class = WebsiteDepartmentSerializer

    def get_queryset(self):

        return (
            WebsiteDepartment.objects
            .filter(
                is_active=True
            )
            .order_by(
                "order",
                "id"
            )
        )


# ============================================================
# ADMIN WEBSITE DEPARTMENTS
# ============================================================

class AdminWebsiteDepartmentView(
    generics.ListCreateAPIView
):

    serializer_class = WebsiteDepartmentSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    def get_queryset(self):

        return (
            WebsiteDepartment.objects
            .all()
            .order_by(
                "order",
                "id"
            )
        )


# ============================================================
# ADMIN WEBSITE DEPARTMENT DETAIL
# ============================================================

class AdminWebsiteDepartmentDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    serializer_class = WebsiteDepartmentSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    queryset = WebsiteDepartment.objects.all()










    # ============================================================
# PUBLIC WEBSITE DEPARTMENTS
# ============================================================

class PublicDepartmentsView(APIView):

    authentication_classes = []

    permission_classes = [
        AllowAny
    ]

    def get(self, request):

        page, created = (
            WebsiteDepartmentsPage.objects.get_or_create(
                pk=1
            )
        )

        departments = (
            WebsiteDepartment.objects
            .filter(
                is_active=True
            )
            .order_by(
                "order",
                "id"
            )
        )

        page_serializer = (
            WebsiteDepartmentsPageSerializer(
                page
            )
        )

        department_serializer = (
            WebsiteDepartmentSerializer(
                departments,
                many=True
            )
        )

        return Response({

            "page": page_serializer.data,

            "departments":
                department_serializer.data,

        })






# ============================================================
# ADMIN WEBSITE DEPARTMENTS PAGE
# ============================================================

class AdminWebsiteDepartmentsPageView(
    APIView
):

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    def get(self, request):

        page, created = (
            WebsiteDepartmentsPage.objects.get_or_create(
                pk=1
            )
        )

        serializer = (
            WebsiteDepartmentsPageSerializer(
                page
            )
        )

        return Response(
            serializer.data
        )

    def patch(self, request):

        page, created = (
            WebsiteDepartmentsPage.objects.get_or_create(
                pk=1
            )
        )

        serializer = (
            WebsiteDepartmentsPageSerializer(
                page,
                data=request.data,
                partial=True
            )
        )

        serializer.is_valid(
            raise_exception=True
        )

        serializer.save()

        return Response(
            serializer.data
        )





class PublicAdmissionsView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):
        page, _ = WebsiteAdmissionsPage.objects.get_or_create(pk=1)

        steps = WebsiteAdmissionStep.objects.filter(
            is_active=True
        ).order_by("order", "id")

        documents = WebsiteAdmissionDocument.objects.filter(
            is_active=True
        ).order_by("order", "id")

        return Response({
            "page": WebsiteAdmissionsPageSerializer(page).data,
            "steps": WebsiteAdmissionStepSerializer(
                steps,
                many=True
            ).data,
            "documents": WebsiteAdmissionDocumentSerializer(
                documents,
                many=True
            ).data,
        })







class PublicEventsView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):
        page, _ = WebsiteEventsPage.objects.get_or_create(pk=1)

        events = WebsiteEvent.objects.filter(
            is_active=True
        ).order_by("date", "order", "id")

        return Response({
            "page": WebsiteEventsPageSerializer(page).data,
            "events": WebsiteEventSerializer(
                events,
                many=True,
                context={"request": request}
            ).data,
        })











class PublicGalleryView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):
        page, _ = WebsiteGalleryPage.objects.get_or_create(pk=1)

        images = WebsiteGalleryItem.objects.filter(
            is_active=True
        ).order_by("order", "id")

        return Response({
            "page": WebsiteGalleryPageSerializer(page).data,
            "images": WebsiteGalleryItemSerializer(
                images,
                many=True,
                context={"request": request}
            ).data,
        })



class PublicContactView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):
        page, _ = WebsiteContactPage.objects.get_or_create(pk=1)

        return Response(
            WebsiteContactPageSerializer(page).data
        )

    def post(self, request):
        serializer = WebsiteContactMessageSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        serializer.save()

        return Response(
            {
                "message": "Thank you. Your message has been submitted."
            },
            status=201
        )







# ============================================================
# ADMIN WEBSITE CONTACT PAGE
# ============================================================

class AdminWebsiteContactPageView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    def get(self, request):

        page, created = (
            WebsiteContactPage.objects.get_or_create(
                pk=1
            )
        )

        serializer = WebsiteContactPageSerializer(
            page
        )

        return Response(
            serializer.data
        )

    def patch(self, request):

        page, created = (
            WebsiteContactPage.objects.get_or_create(
                pk=1
            )
        )

        serializer = WebsiteContactPageSerializer(
            page,
            data=request.data,
            partial=True
        )

        serializer.is_valid(
            raise_exception=True
        )

        serializer.save()

        return Response(
            serializer.data
        )


# ============================================================
# ADMIN WEBSITE CONTACT MESSAGES
# ============================================================

class AdminWebsiteContactMessageView(
    generics.ListAPIView
):

    serializer_class = WebsiteContactMessageSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    def get_queryset(self):

        return WebsiteContactMessage.objects.all().order_by(
            "-created_at"
        )


# ============================================================
# ADMIN WEBSITE CONTACT MESSAGE DETAIL
# ============================================================

class AdminWebsiteContactMessageDetailView(
    generics.RetrieveUpdateAPIView
):

    serializer_class = WebsiteContactMessageSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    queryset = WebsiteContactMessage.objects.all()








# ============================================================
# PUBLIC NOTICES
# ============================================================

class PublicNoticesView(APIView):

    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):

        page, created = WebsiteNoticesPage.objects.get_or_create(
            pk=1
        )

        notices = WebsiteNotice.objects.filter(
            is_active=True
        ).order_by(
            "-date",
            "order",
            "id"
        )

        return Response({
            "page": WebsiteNoticesPageSerializer(page).data,
            "notices": WebsiteNoticeSerializer(
                notices,
                many=True
            ).data,
        })










# ============================================================
# PUBLIC PLACEMENTS
# ============================================================

class PublicPlacementsView(APIView):

    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):

        page, created = WebsitePlacementsPage.objects.get_or_create(
            pk=1
        )

        features = WebsitePlacementFeature.objects.filter(
            is_active=True
        ).order_by(
            "order",
            "id"
        )

        return Response({
            "page": WebsitePlacementsPageSerializer(
                page,
                context={"request": request}
            ).data,

            "features": WebsitePlacementFeatureSerializer(
                features,
                many=True
            ).data,
        })









# ============================================================
# ADMIN WEBSITE NOTICES PAGE
# ============================================================

class AdminWebsiteNoticesPageView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    def get(self, request):

        page, created = WebsiteNoticesPage.objects.get_or_create(
            pk=1
        )

        serializer = WebsiteNoticesPageSerializer(page)

        return Response(serializer.data)

    def patch(self, request):

        page, created = WebsiteNoticesPage.objects.get_or_create(
            pk=1
        )

        serializer = WebsiteNoticesPageSerializer(
            page,
            data=request.data,
            partial=True
        )

        serializer.is_valid(
            raise_exception=True
        )

        serializer.save()

        return Response(
            serializer.data
        )


# ============================================================
# ADMIN WEBSITE NOTICES
# ============================================================

class AdminWebsiteNoticeView(generics.ListCreateAPIView):

    serializer_class = WebsiteNoticeSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    def get_queryset(self):

        return WebsiteNotice.objects.all().order_by(
            "-date",
            "order",
            "id"
        )


# ============================================================
# ADMIN WEBSITE NOTICE DETAIL
# ============================================================

class AdminWebsiteNoticeDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    serializer_class = WebsiteNoticeSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    queryset = WebsiteNotice.objects.all()








class PublicPlacementsView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):

        page, _ = WebsitePlacementsPage.objects.get_or_create(
            pk=1
        )

        features = WebsitePlacementFeature.objects.filter(
            is_active=True
        ).order_by(
            "order",
            "id"
        )

        return Response({
            "page": WebsitePlacementsPageSerializer(page).data,
            "features": WebsitePlacementFeatureSerializer(
                features,
                many=True
            ).data,
        })



# ============================================================
# PUBLIC PLACEMENTS
# ============================================================

class PublicPlacementsView(APIView):

    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):

        page, _ = WebsitePlacementsPage.objects.get_or_create(
            pk=1
        )

        features = WebsitePlacementFeature.objects.filter(
            is_active=True
        ).order_by(
            "order",
            "id"
        )

        return Response({
            "page": WebsitePlacementsPageSerializer(
                page
            ).data,

            "features": WebsitePlacementFeatureSerializer(
                features,
                many=True
            ).data,
        })


# ============================================================
# ADMIN PLACEMENTS PAGE
# ============================================================

class AdminWebsitePlacementsPageView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    def get(self, request):

        page, _ = WebsitePlacementsPage.objects.get_or_create(
            pk=1
        )

        serializer = WebsitePlacementsPageSerializer(
            page
        )

        return Response(
            serializer.data
        )

    def patch(self, request):

        page, _ = WebsitePlacementsPage.objects.get_or_create(
            pk=1
        )

        serializer = WebsitePlacementsPageSerializer(
            page,
            data=request.data,
            partial=True
        )

        serializer.is_valid(
            raise_exception=True
        )

        serializer.save()

        return Response(
            serializer.data
        )


# ============================================================
# ADMIN PLACEMENT FEATURES
# ============================================================

class AdminWebsitePlacementFeatureView(
    generics.ListCreateAPIView
):

    serializer_class = WebsitePlacementFeatureSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    def get_queryset(self):

        return WebsitePlacementFeature.objects.all().order_by(
            "order",
            "id"
        )


# ============================================================
# ADMIN PLACEMENT FEATURE DETAIL
# ============================================================

class AdminWebsitePlacementFeatureDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    serializer_class = WebsitePlacementFeatureSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    queryset = WebsitePlacementFeature.objects.all()

class PublicCourseApplicationView(
    generics.CreateAPIView
):

    serializer_class = CourseApplicationSerializer

    authentication_classes = []

    permission_classes = [
        AllowAny


    ]





class AdminCourseApplicationListView(generics.ListAPIView):

    serializer_class = CourseApplicationSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    def get_queryset(self):

        return (
            CourseApplication.objects
            .select_related("course")
            .order_by("-created_at")
        )





# ============================================================
# ADMIN COURSE APPLICATION STATUS UPDATE
# ============================================================

class AdminCourseApplicationUpdateView(
    generics.UpdateAPIView
):

    serializer_class = (
        AdminCourseApplicationStatusSerializer
    )

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    queryset = CourseApplication.objects.all()

    http_method_names = [
        "patch"
    ]