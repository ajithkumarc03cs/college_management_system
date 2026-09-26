from django.urls import path

from rest_framework_simplejwt.views import TokenRefreshView


from .views import (
    # ========================================================
    # AUTHENTICATION
    # ========================================================

    LoginView,


    # ========================================================
    # PROFILE
    # ========================================================

    ProfileView,
    MyPermissionsView,


    # ========================================================
    # STAFF
    # ========================================================

    StaffDashboardView,
    StaffSubjectListView,


    # ========================================================
    # ADMIN DASHBOARD
    # ========================================================

    AdminDashboardView,


    # ========================================================
    # ADMIN STAFF
    # ========================================================

    AdminStaffListView,
    AdminStaffCreateView,


    # ========================================================
    # ADMIN USERS
    # ========================================================

    AdminUserCreateView,
    AdminUserListView,
    AdminUserUpdateView,
    AdminUserDeactivateView,


    # ========================================================
    # ADMIN ROLES
    # ========================================================

    AdminRoleListView,
    AdminRoleDetailView,
    AdminRoleMenuView,


    # ========================================================
    # ADMIN SIDEBAR
    # ========================================================

    AdminSidebarMenuView,
    AdminSidebarMenuDetailView,


    # ========================================================
    # ADMIN PERMISSIONS
    # ========================================================

    AdminPermissionView,


    # ========================================================
    # HOD
    # ========================================================

    HODDashboardView,
    HODStaffListView,

    HODStaffAssignmentCreateView,
    HODStaffAssignmentListView,
    HODStaffAssignmentUpdateView,
    HODStaffAssignmentDeleteView,


    # ========================================================
    # PRINCIPAL
    # ========================================================

    PrincipalDashboardView,

    PrincipalStudentListView,
    PrincipalStaffListView,
    PrincipalHODListView,

    PrincipalCourseListView,
    PrincipalDepartmentListView,
    PrincipalSubjectListView,

    PrincipalExamListView,
    PrincipalAssignmentListView,
    PrincipalAttendanceListView,


    # ========================================================
    # PUBLIC WEBSITE
    # ========================================================

    PublicWebsiteSettingsView,
    PublicWebsiteMenuView,

    PublicHomeView,
    PublicCoursesView,
    PublicAboutView,
    PublicDepartmentsView,

    PublicAdmissionsView,
    PublicEventsView,
    PublicGalleryView,
    PublicContactView,

    PublicNoticesView,
    PublicPlacementsView,


    # ========================================================
    # ADMIN WEBSITE
    # ========================================================

    AdminWebsiteMenuView,
    AdminWebsiteMenuDetailView,


    # ========================================================
    # ADMIN HOME
    # ========================================================

    AdminHomeView,

    AdminHomeStatisticView,
    AdminHomeStatisticDetailView,

    AdminHomeCourseView,
    AdminHomeCourseDetailView,


    # ========================================================
    # ADMIN COURSES
    # ========================================================

    AdminCoursesPageView,

    AdminCoursePageCourseView,
    AdminCoursePageCourseDetailView,


    # ========================================================
    # ADMIN ABOUT
    # ========================================================

    AdminAboutView,

    AdminAboutValueView,
    AdminAboutValueDetailView,

    AdminAboutFacilityView,
    AdminAboutFacilityDetailView,


    # ========================================================
    # ADMIN DEPARTMENTS
    # ========================================================

    AdminWebsiteDepartmentView,
    AdminWebsiteDepartmentDetailView,
    AdminWebsiteDepartmentsPageView,


    # ========================================================
    # ADMIN ADMISSIONS / EVENTS / GALLERY
    # ========================================================

    # These will be added here when their admin views
    # are implemented.


    # ========================================================
    # ADMIN CONTACT
    # ========================================================

    AdminWebsiteContactPageView,
    AdminWebsiteContactMessageView,
    AdminWebsiteContactMessageDetailView,


    # ========================================================
    # ADMIN NOTICES
    # ========================================================

    AdminWebsiteNoticesPageView,
    AdminWebsiteNoticeView,
    AdminWebsiteNoticeDetailView,


    # ========================================================
    # ADMIN PLACEMENTS
    # ========================================================

    AdminWebsitePlacementsPageView,
    AdminWebsitePlacementFeatureView,
    AdminWebsitePlacementFeatureDetailView,
    PublicCourseApplicationView,
    AdminCourseApplicationListView,
    AdminCourseApplicationUpdateView,
)


urlpatterns = [

    # ========================================================
    # AUTHENTICATION
    # ========================================================

    path(
        "login/",
        LoginView.as_view(),
        name="login",
    ),

    path(
        "token/refresh/",
        TokenRefreshView.as_view(),
        name="token-refresh",
    ),


    # ========================================================
    # PROFILE
    # ========================================================

    path(
        "profile/",
        ProfileView.as_view(),
        name="profile",
    ),

    path(
        "me/permissions/",
        MyPermissionsView.as_view(),
        name="my-permissions",
    ),


    # ========================================================
    # STAFF
    # ========================================================

    path(
        "staff/dashboard/",
        StaffDashboardView.as_view(),
        name="staff-dashboard",
    ),

    path(
        "staff/subjects/",
        StaffSubjectListView.as_view(),
        name="staff-subjects",
    ),


    # ========================================================
    # ADMIN DASHBOARD
    # ========================================================

    path(
        "admin/dashboard/",
        AdminDashboardView.as_view(),
        name="admin-dashboard",
    ),


    # ========================================================
    # ADMIN STAFF
    # ========================================================

    path(
        "admin/staff/",
        AdminStaffListView.as_view(),
        name="admin-staff-list",
    ),

    path(
        "admin/staff/create/",
        AdminStaffCreateView.as_view(),
        name="admin-staff-create",
    ),


    # ========================================================
    # ADMIN USERS
    # ========================================================

    path(
        "admin/users/",
        AdminUserListView.as_view(),
        name="admin-user-list",
    ),

    path(
        "admin/users/create/",
        AdminUserCreateView.as_view(),
        name="admin-user-create",
    ),

    path(
        "admin/users/<int:pk>/update/",
        AdminUserUpdateView.as_view(),
        name="admin-user-update",
    ),

    path(
        "admin/users/<int:pk>/deactivate/",
        AdminUserDeactivateView.as_view(),
        name="admin-user-deactivate",
    ),


    # ========================================================
    # ADMIN SIDEBAR MENUS
    # ========================================================

    path(
        "admin/sidebar-menus/",
        AdminSidebarMenuView.as_view(),
        name="admin-sidebar-menus",
    ),

    path(
        "admin/sidebar-menus/<int:pk>/",
        AdminSidebarMenuDetailView.as_view(),
        name="admin-sidebar-menu-detail",
    ),


    # ========================================================
    # ADMIN WEBSITE MENUS
    # ========================================================

    path(
        "admin/website-menus/",
        AdminWebsiteMenuView.as_view(),
        name="admin-website-menus",
    ),

    path(
        "admin/website-menus/<int:pk>/",
        AdminWebsiteMenuDetailView.as_view(),
        name="admin-website-menu-detail",
    ),


    # ========================================================
    # ADMIN HOME
    # ========================================================

    path(
        "admin/home/",
        AdminHomeView.as_view(),
        name="admin-home",
    ),

    path(
        "admin/home/statistics/",
        AdminHomeStatisticView.as_view(),
        name="admin-home-statistics",
    ),

    path(
        "admin/home/statistics/<int:pk>/",
        AdminHomeStatisticDetailView.as_view(),
        name="admin-home-statistic-detail",
    ),

    path(
        "admin/home/courses/",
        AdminHomeCourseView.as_view(),
        name="admin-home-courses",
    ),

    path(
        "admin/home/courses/<int:pk>/",
        AdminHomeCourseDetailView.as_view(),
        name="admin-home-course-detail",
    ),


    # ========================================================
    # ADMIN ROLES
    # ========================================================

    path(
        "admin/roles/",
        AdminRoleListView.as_view(),
        name="admin-roles",
    ),

    path(
        "admin/roles/<int:pk>/",
        AdminRoleDetailView.as_view(),
        name="admin-role-detail",
    ),

    path(
        "admin/role-menus/",
        AdminRoleMenuView.as_view(),
        name="admin-role-menus",
    ),


    # ========================================================
    # ADMIN PERMISSIONS
    # ========================================================

    path(
        "admin/permissions/",
        AdminPermissionView.as_view(),
        name="admin-permissions",
    ),


    # ========================================================
    # HOD DASHBOARD
    # ========================================================

    path(
        "hod/dashboard/",
        HODDashboardView.as_view(),
        name="hod-dashboard",
    ),


    # ========================================================
    # HOD STAFF
    # ========================================================

    path(
        "hod/staff/",
        HODStaffListView.as_view(),
        name="hod-staff",
    ),


    # ========================================================
    # HOD STAFF SUBJECT ASSIGNMENT
    # ========================================================

    path(
        "hod/staff/assign-subject/",
        HODStaffAssignmentCreateView.as_view(),
        name="hod-assign-subject",
    ),

    path(
        "hod/staff/assignments/",
        HODStaffAssignmentListView.as_view(),
        name="hod-staff-assignments",
    ),

    path(
        "hod/staff/assignments/<int:pk>/update/",
        HODStaffAssignmentUpdateView.as_view(),
        name="hod-staff-assignment-update",
    ),

    path(
        "hod/staff/assignments/<int:pk>/remove/",
        HODStaffAssignmentDeleteView.as_view(),
        name="hod-remove-subject",
    ),


    # ========================================================
    # PRINCIPAL DASHBOARD
    # ========================================================

    path(
        "principal/dashboard/",
        PrincipalDashboardView.as_view(),
        name="principal-dashboard",
    ),


    # ========================================================
    # PRINCIPAL STUDENTS
    # ========================================================

    path(
        "principal/students/",
        PrincipalStudentListView.as_view(),
        name="principal-students",
    ),


    # ========================================================
    # PRINCIPAL STAFF
    # ========================================================

    path(
        "principal/staff/",
        PrincipalStaffListView.as_view(),
        name="principal-staff",
    ),


    # ========================================================
    # PRINCIPAL HOD
    # ========================================================

    path(
        "principal/hod/",
        PrincipalHODListView.as_view(),
        name="principal-hod",
    ),


    # ========================================================
    # PRINCIPAL COURSES
    # ========================================================

    path(
        "principal/courses/",
        PrincipalCourseListView.as_view(),
        name="principal-courses",
    ),


    # ========================================================
    # PRINCIPAL DEPARTMENTS
    # ========================================================

    path(
        "principal/departments/",
        PrincipalDepartmentListView.as_view(),
        name="principal-departments",
    ),


    # ========================================================
    # PRINCIPAL SUBJECTS
    # ========================================================

    path(
        "principal/subjects/",
        PrincipalSubjectListView.as_view(),
        name="principal-subjects",
    ),


    # ========================================================
    # PRINCIPAL EXAMS
    # ========================================================

    path(
        "principal/exams/",
        PrincipalExamListView.as_view(),
        name="principal-exams",
    ),


    # ========================================================
    # PRINCIPAL ASSIGNMENTS
    # ========================================================

    path(
        "principal/assignments/",
        PrincipalAssignmentListView.as_view(),
        name="principal-assignments",
    ),


    # ========================================================
    # PRINCIPAL ATTENDANCE
    # ========================================================

    path(
        "principal/attendance/",
        PrincipalAttendanceListView.as_view(),
        name="principal-attendance",
    ),


    # ========================================================
    # PUBLIC WEBSITE SETTINGS
    # ========================================================

    path(
        "public/website-settings/",
        PublicWebsiteSettingsView.as_view(),
        name="public-website-settings",
    ),


    # ========================================================
    # PUBLIC WEBSITE MENUS
    # ========================================================

    path(
        "public/website-menus/",
        PublicWebsiteMenuView.as_view(),
        name="public-website-menus",
    ),


    # ========================================================
    # PUBLIC HOME
    # ========================================================

    path(
        "public/home/",
        PublicHomeView.as_view(),
        name="public-home",
    ),


    # ========================================================
    # PUBLIC COURSES
    # ========================================================

    path(
        "public/courses/",
        PublicCoursesView.as_view(),
        name="public-courses",
    ),

    path(
        "public/course-applications/",
        PublicCourseApplicationView.as_view(),
    ),
    path(
        "admin/course-applications/",
        AdminCourseApplicationListView.as_view(),
    ),
    path(
        "admin/course-applications/<int:pk>/status/",
        AdminCourseApplicationUpdateView.as_view(),
        name="admin-course-application-status-update",
    ),
    # ========================================================
    # PUBLIC ABOUT
    # ========================================================

    path(
        "public/about/",
        PublicAboutView.as_view(),
        name="public-about",
    ),


    # ========================================================
    # PUBLIC DEPARTMENTS
    # ========================================================

    path(
        "public/departments/",
        PublicDepartmentsView.as_view(),
        name="public-departments",
    ),


    # ========================================================
    # PUBLIC ADMISSIONS
    # ========================================================

    path(
        "public/admissions/",
        PublicAdmissionsView.as_view(),
        name="public-admissions",
    ),


    # ========================================================
    # PUBLIC EVENTS
    # ========================================================

    path(
        "public/events/",
        PublicEventsView.as_view(),
        name="public-events",
    ),


    # ========================================================
    # PUBLIC GALLERY
    # ========================================================

    path(
        "public/gallery/",
        PublicGalleryView.as_view(),
        name="public-gallery",
    ),


    # ========================================================
    # PUBLIC CONTACT
    # ========================================================

    path(
        "public/contact/",
        PublicContactView.as_view(),
        name="public-contact",
    ),


    # ========================================================
    # PUBLIC NOTICES
    # ========================================================

    path(
        "public/notices/",
        PublicNoticesView.as_view(),
        name="public-notices",
    ),


    # ========================================================
    # PUBLIC PLACEMENTS
    # ========================================================

    path(
        "public/placements/",
        PublicPlacementsView.as_view(),
        name="public-placements",
    ),


    # ========================================================
    # ADMIN COURSES PAGE
    # ========================================================

    path(
        "admin/courses/",
        AdminCoursesPageView.as_view(),
        name="admin-courses",
    ),

    path(
        "admin/courses/items/",
        AdminCoursePageCourseView.as_view(),
        name="admin-course-items",
    ),

    path(
        "admin/courses/items/<int:pk>/",
        AdminCoursePageCourseDetailView.as_view(),
        name="admin-course-item-detail",
    ),


    # ========================================================
    # ADMIN ABOUT
    # ========================================================

    path(
        "admin/about/",
        AdminAboutView.as_view(),
        name="admin-about",
    ),

    path(
        "admin/about/values/",
        AdminAboutValueView.as_view(),
        name="admin-about-values",
    ),

    path(
        "admin/about/values/<int:pk>/",
        AdminAboutValueDetailView.as_view(),
        name="admin-about-value-detail",
    ),

    path(
        "admin/about/facilities/",
        AdminAboutFacilityView.as_view(),
        name="admin-about-facilities",
    ),

    path(
        "admin/about/facilities/<int:pk>/",
        AdminAboutFacilityDetailView.as_view(),
        name="admin-about-facility-detail",
    ),


    # ========================================================
    # ADMIN WEBSITE DEPARTMENTS
    # ========================================================

    path(
        "admin/departments/page/",
        AdminWebsiteDepartmentsPageView.as_view(),
        name="admin-website-departments-page",
    ),

    path(
        "admin/departments/",
        AdminWebsiteDepartmentView.as_view(),
        name="admin-website-departments",
    ),

    path(
        "admin/departments/<int:pk>/",
        AdminWebsiteDepartmentDetailView.as_view(),
        name="admin-website-department-detail",
    ),


    # ========================================================
    # ADMIN WEBSITE CONTACT
    # ========================================================

    path(
        "admin/contact/page/",
        AdminWebsiteContactPageView.as_view(),
        name="admin-website-contact-page",
    ),

    path(
        "admin/contact/messages/",
        AdminWebsiteContactMessageView.as_view(),
        name="admin-website-contact-messages",
    ),

    path(
        "admin/contact/messages/<int:pk>/",
        AdminWebsiteContactMessageDetailView.as_view(),
        name="admin-website-contact-message-detail",
    ),


    # ========================================================
    # ADMIN WEBSITE NOTICES
    # ========================================================

    path(
        "admin/notices/page/",
        AdminWebsiteNoticesPageView.as_view(),
        name="admin-website-notices-page",
    ),

    path(
        "admin/notices/",
        AdminWebsiteNoticeView.as_view(),
        name="admin-website-notices",
    ),

    path(
        "admin/notices/<int:pk>/",
        AdminWebsiteNoticeDetailView.as_view(),
        name="admin-website-notice-detail",
    ),


    # ========================================================
    # ADMIN WEBSITE PLACEMENTS
    # ========================================================

    path(
        "admin/placements/page/",
        AdminWebsitePlacementsPageView.as_view(),
        name="admin-placements-page",
    ),

    path(
        "admin/placements/features/",
        AdminWebsitePlacementFeatureView.as_view(),
        name="admin-placement-features",
    ),

    path(
        "admin/placements/features/<int:pk>/",
        AdminWebsitePlacementFeatureDetailView.as_view(),
        name="admin-placement-feature-detail",
    ),
 
]