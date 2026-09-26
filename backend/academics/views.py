from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import (
    CourseLevel,
    Course,
    Department,
    Subject,
)

from students.permissions import IsAdmin

from .serializers import (
    CourseLevelSerializer,
    CourseSerializer,
    DepartmentSerializer,
    SubjectSerializer,
)

from accounts.permissions import IsHOD


# ============================================================
# COURSE LEVEL
# ============================================================

class CourseLevelListCreateView(
    generics.ListCreateAPIView
):
    queryset = CourseLevel.objects.all().order_by("name")

    serializer_class = CourseLevelSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]


class CourseLevelDetailView(
    generics.RetrieveUpdateDestroyAPIView
):
    queryset = CourseLevel.objects.all()

    serializer_class = CourseLevelSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]


# ============================================================
# COURSE
# ============================================================

class CourseListCreateView(
    generics.ListCreateAPIView
):
    serializer_class = CourseSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    def get_queryset(self):

        queryset = Course.objects.select_related(
            "level"
        ).order_by("name")

        # ----------------------------------------------------
        # SEARCH
        # ----------------------------------------------------

        search = self.request.query_params.get(
            "search"
        )

        if search:

            queryset = queryset.filter(
                name__icontains=search
            )

        # ----------------------------------------------------
        # FILTER BY LEVEL
        # ----------------------------------------------------

        level = self.request.query_params.get(
            "level"
        )

        if level:

            queryset = queryset.filter(
                level_id=level
            )

        return queryset


class CourseDetailView(
    generics.RetrieveUpdateDestroyAPIView
):
    queryset = Course.objects.select_related(
        "level"
    )

    serializer_class = CourseSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]


# ============================================================
# DEPARTMENT
# ============================================================

class DepartmentListCreateView(
    generics.ListCreateAPIView
):
    serializer_class = DepartmentSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    def get_queryset(self):

        queryset = Department.objects.all().order_by(
            "name"
        )

        # ----------------------------------------------------
        # SEARCH
        # ----------------------------------------------------

        search = self.request.query_params.get(
            "search"
        )

        if search:

            queryset = queryset.filter(
                name__icontains=search
            )

        return queryset


class DepartmentDetailView(
    generics.RetrieveUpdateDestroyAPIView
):
    queryset = Department.objects.all()

    serializer_class = DepartmentSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]


# ============================================================
# SUBJECT
# ============================================================

class SubjectListCreateView(
    generics.ListCreateAPIView
):
    serializer_class = SubjectSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    def get_queryset(self):

        queryset = Subject.objects.select_related(
            "course",
            "department"
        ).order_by("name")

        # ----------------------------------------------------
        # SEARCH BY SUBJECT NAME
        # ----------------------------------------------------

        search = self.request.query_params.get(
            "search"
        )

        if search:

            queryset = queryset.filter(
                name__icontains=search
            )

        # ----------------------------------------------------
        # FILTER BY COURSE
        # ----------------------------------------------------

        course = self.request.query_params.get(
            "course"
        )

        if course:

            queryset = queryset.filter(
                course_id=course
            )

        # ----------------------------------------------------
        # FILTER BY DEPARTMENT
        # ----------------------------------------------------

        department = self.request.query_params.get(
            "department"
        )

        if department:

            queryset = queryset.filter(
                department_id=department
            )

        # ----------------------------------------------------
        # FILTER BY YEAR
        # ----------------------------------------------------

        year = self.request.query_params.get(
            "year"
        )

        if year:

            queryset = queryset.filter(
                year=year
            )

        return queryset


class SubjectDetailView(
    generics.RetrieveUpdateDestroyAPIView
):
    queryset = Subject.objects.select_related(
        "course",
        "department"
    )

    serializer_class = SubjectSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]


# ============================================================
# HOD SUBJECT LIST
# ============================================================

class HODSubjectListCreateView(
    generics.ListCreateAPIView
):
    serializer_class = SubjectSerializer

    permission_classes = [
        IsAuthenticated,
        IsHOD
    ]

    def get_queryset(self):

        department = (
            self.request.user.userprofile.department
        )

        queryset = Subject.objects.filter(
            department=department
        ).select_related(
            "course",
            "department"
        ).order_by("name")

        # ----------------------------------------------------
        # SEARCH
        # ----------------------------------------------------

        search = self.request.query_params.get(
            "search"
        )

        if search:

            queryset = queryset.filter(
                name__icontains=search
            )

        # ----------------------------------------------------
        # COURSE FILTER
        # ----------------------------------------------------

        course = self.request.query_params.get(
            "course"
        )

        if course:

            queryset = queryset.filter(
                course_id=course
            )

        # ----------------------------------------------------
        # YEAR FILTER
        # ----------------------------------------------------

        year = self.request.query_params.get(
            "year"
        )

        if year:

            queryset = queryset.filter(
                year=year
            )

        return queryset

    def perform_create(self, serializer):

        department = (
            self.request.user.userprofile.department
        )

        serializer.save(
            department=department
        )


# ============================================================
# HOD SUBJECT DETAIL
# ============================================================

class HODSubjectDetailView(
    generics.RetrieveUpdateDestroyAPIView
):
    serializer_class = SubjectSerializer

    permission_classes = [
        IsAuthenticated,
        IsHOD
    ]

    def get_queryset(self):

        department = (
            self.request.user.userprofile.department
        )

        return Subject.objects.filter(
            department=department
        ).select_related(
            "course",
            "department"
        )