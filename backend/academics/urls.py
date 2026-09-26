from django.urls import path

from .views import (
    CourseLevelListCreateView,
    CourseLevelDetailView,

    CourseListCreateView,
    CourseDetailView,

    DepartmentListCreateView,
    DepartmentDetailView,

    SubjectListCreateView,
    SubjectDetailView,

    HODSubjectListCreateView,
    HODSubjectDetailView,
    # PublicDepartmentsView,
    # AdminWebsiteDepartmentView,
    # AdminWebsiteDepartmentDetailView,
    )


urlpatterns = [

    # ========================================================
    # COURSE LEVEL
    # ========================================================

    path(
        "course-levels/",
        CourseLevelListCreateView.as_view(),
        name="course-level-list-create"
    ),

    path(
        "course-levels/<int:pk>/",
        CourseLevelDetailView.as_view(),
        name="course-level-detail"
    ),


    # ========================================================
    # COURSE
    # ========================================================

    path(
        "courses/",
        CourseListCreateView.as_view(),
        name="course-list-create"
    ),

    path(
        "courses/<int:pk>/",
        CourseDetailView.as_view(),
        name="course-detail"
    ),


    # ========================================================
    # ACADEMIC DEPARTMENT
    # ========================================================

    path(
        "departments/",
        DepartmentListCreateView.as_view(),
        name="department-list-create"
    ),

    path(
        "departments/<int:pk>/",
        DepartmentDetailView.as_view(),
        name="department-detail"
    ),


    # ========================================================
    # SUBJECT
    # ========================================================

    path(
        "subjects/",
        SubjectListCreateView.as_view(),
        name="subject-list-create"
    ),

    path(
        "subjects/<int:pk>/",
        SubjectDetailView.as_view(),
        name="subject-detail"
    ),


    # ========================================================
    # HOD SUBJECT
    # ========================================================

    path(
        "hod/subjects/",
        HODSubjectListCreateView.as_view(),
        name="hod-subject-list-create"
    ),

    path(
        "hod/subjects/<int:pk>/",
        HODSubjectDetailView.as_view(),
        name="hod-subject-detail"
    ),
    # ============================================================
    # WEBSITE DEPARTMENTS
    # ============================================================

    # path(
    #     "public/departments/",
    #     PublicDepartmentsView.as_view(),
    #     name="public-departments"
    # ),

    # path(
    #     "admin/departments/",
    #     AdminWebsiteDepartmentView.as_view(),
    #     name="admin-website-departments"
    # ),

    # path(
    #     "admin/departments/<int:pk>/",
    #     AdminWebsiteDepartmentDetailView.as_view(),
    #     name="admin-website-department-detail"
    # ),
]