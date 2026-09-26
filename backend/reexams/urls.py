from django.urls import path

from .views import (
    ReExamListCreateView,
    ReExamDetailView,
    StudentReExamListView,
    HODReExamListView,
)


urlpatterns = [

    # ========================================================
    # RE-EXAMS
    # ========================================================

    path(
        "reexams/",
        ReExamListCreateView.as_view(),
        name="reexam-list-create"
    ),

    path(
        "reexams/<int:pk>/",
        ReExamDetailView.as_view(),
        name="reexam-detail"
    ),


    # ========================================================
    # STUDENT RE-EXAMS
    # ========================================================

    path(
        "student/reexams/",
        StudentReExamListView.as_view(),
        name="student-reexams"
    ),


    # ========================================================
    # HOD RE-EXAMS
    # ========================================================

    path(
        "hod/reexams/",
        HODReExamListView.as_view(),
        name="hod-reexams"
    ),
]
