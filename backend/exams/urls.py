from django.urls import path

from .views import (
    ExamListCreateView,
    ExamDetailView,
    ExamParticipationListView,
    ExamParticipationUpdateView,
    StudentExamListView,
    StaffExamFilterOptionsView,
    HODExamListView,
)


urlpatterns = [

    # ========================================================
    # EXAMS
    # ========================================================

    path(
        "exams/",
        ExamListCreateView.as_view(),
        name="exam-list-create"
    ),

    path(
        "exams/<int:pk>/",
        ExamDetailView.as_view(),
        name="exam-detail"
    ),


    # ========================================================
    # STAFF EXAM FILTER OPTIONS
    # ========================================================

    path(
        "staff/exam-filter-options/",
        StaffExamFilterOptionsView.as_view(),
        name="staff-exam-filter-options"
    ),


    # ========================================================
    # EXAM PARTICIPATION
    # ========================================================

    path(
        "exam-participation/",
        ExamParticipationListView.as_view(),
        name="exam-participation-list"
    ),

    path(
        "exam-participation/<int:pk>/",
        ExamParticipationUpdateView.as_view(),
        name="exam-participation-update"
    ),


    # ========================================================
    # STUDENT EXAMS
    # ========================================================

    path(
        "student/exams/",
        StudentExamListView.as_view(),
        name="student-exams"
    ),


    # ========================================================
    # HOD EXAMS
    # ========================================================

    path(
        "hod/exams/",
        HODExamListView.as_view(),
        name="hod-exams"
    ),
]
