from django.urls import path

from .views import (
    AttendanceListView,
    AttendanceCreateView,
    BulkAttendanceCreateView,
    StudentAttendanceListView,
    StudentAttendancePercentageView,
    StaffAttendanceClassView,
    HODAttendanceListView,
)


urlpatterns = [

    # ========================================================
    # STAFF / ADMIN ATTENDANCE
    # ========================================================

    path(
        "attendance/",
        AttendanceListView.as_view(),
        name="attendance-list"
    ),

    path(
        "attendance/mark/",
        AttendanceCreateView.as_view(),
        name="attendance-mark"
    ),

    path(
        "attendance/bulk/",
        BulkAttendanceCreateView.as_view(),
        name="attendance-bulk"
    ),


    # ========================================================
    # STAFF CLASSES
    # ========================================================

    path(
        "staff/attendance/classes/",
        StaffAttendanceClassView.as_view(),
        name="staff-attendance-classes"
    ),


    # ========================================================
    # STUDENT ATTENDANCE
    # ========================================================

    path(
        "student/attendance/",
        StudentAttendanceListView.as_view(),
        name="student-attendance"
    ),

    path(
        "student/attendance/percentage/",
        StudentAttendancePercentageView.as_view(),
        name="student-attendance-percentage"
    ),


    # ========================================================
    # HOD ATTENDANCE
    # ========================================================

    path(
        "hod/attendance/",
        HODAttendanceListView.as_view(),
        name="hod-attendance"
    ),
]
