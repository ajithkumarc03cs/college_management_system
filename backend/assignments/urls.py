from django.urls import path

from .views import (
    AssignmentListCreateView,
    AssignmentDetailView,
    StudentAssignmentListView,
    AssignmentSubmissionCreateView,
    StudentSubmissionListView,
    AssignmentSubmissionListView,
    AssignmentSubmissionReviewView,
    HODAssignmentListView,
)


urlpatterns = [

    # ========================================================
    # ASSIGNMENTS
    # ========================================================

    path(
        "",
        AssignmentListCreateView.as_view(),
        name="assignment-list-create"
    ),

    path(
        "<int:pk>/",
        AssignmentDetailView.as_view(),
        name="assignment-detail"
    ),


    # ========================================================
    # STUDENT ASSIGNMENTS
    # ========================================================

    path(
        "student/",
        StudentAssignmentListView.as_view(),
        name="student-assignments"
    ),


    # ========================================================
    # STUDENT SUBMISSION
    # ========================================================

    path(
        "submit/",
        AssignmentSubmissionCreateView.as_view(),
        name="assignment-submit"
    ),

    path(
        "submissions/",
        StudentSubmissionListView.as_view(),
        name="student-submissions"
    ),


    # ========================================================
    # STAFF / ADMIN SUBMISSIONS
    # ========================================================

    path(
        "submission-list/",
        AssignmentSubmissionListView.as_view(),
        name="assignment-submission-list"
    ),

    path(
        "submissions/<int:pk>/review/",
        AssignmentSubmissionReviewView.as_view(),
        name="assignment-submission-review"
    ),


    # ========================================================
    # HOD ASSIGNMENTS
    # ========================================================

    path(
        "hod/assignments/",
        HODAssignmentListView.as_view(),
        name="hod-assignments"
    ),
]