from django.urls import path

from .views import (
    StudentListCreateView,
    StudentDetailView,
    StudentProfileView,
    StudentDashboardView,
    StaffStudentListView,
    StaffStudentFilterOptionsView,
    HODStudentListView,
    HODStudentDetailView,
    StudentSubjectListView,
)


urlpatterns = [

    # ========================================================
    # STUDENT SUBJECTS
    # ========================================================

    path(
        "student/subjects/",
        StudentSubjectListView.as_view(),
        name="student-subjects"
    ),


    # ========================================================
    # ADMIN / STAFF - STUDENTS
    # ========================================================

    path(
        "students/",
        StudentListCreateView.as_view(),
        name="student-list-create"
    ),

    path(
        "students/<int:pk>/",
        StudentDetailView.as_view(),
        name="student-detail"
    ),


    # ========================================================
    # STAFF - STUDENTS
    # ========================================================

    path(
        "staff/students/",
        StaffStudentListView.as_view(),
        name="staff-students"
    ),

    path(
        "staff/student-filter-options/",
        StaffStudentFilterOptionsView.as_view(),
        name="staff-student-filter-options"
    ),


    # ========================================================
    # STUDENT
    # ========================================================

    path(
        "student/profile/",
        StudentProfileView.as_view(),
        name="student-profile"
    ),

    path(
        "student/dashboard/",
        StudentDashboardView.as_view(),
        name="student-dashboard"
    ),


    # ========================================================
    # HOD
    # ========================================================

    path(
        "hod/students/",
        HODStudentListView.as_view(),
        name="hod-students"
    ),

    path(
        "hod/students/<int:pk>/",
        HODStudentDetailView.as_view(),
        name="hod-student-detail"
    ),

]