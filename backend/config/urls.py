"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.contrib import admin
# from django.urls import path

# urlpatterns = [
#     path('admin/', admin.site.urls),
# ]

from django.contrib import admin

from django.urls import path, include

from django.conf import settings

from django.conf.urls.static import static

from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
)
urlpatterns = [

    # ========================================================
    # DJANGO ADMIN
    # ========================================================

    path(
        "admin/",
        admin.site.urls
    ),


    # ========================================================
    # ACCOUNTS
    # ========================================================

    path(
        "api/",
        include("accounts.urls")
    ),


    # ========================================================
    # STUDENTS
    # ========================================================

    path(
        "api/",
        include("students.urls")
    ),


    # ========================================================
    # ACADEMICS
    # ========================================================

    path(
        "api/",
        include("academics.urls")
    ),


    # ========================================================
    # EXAMS
    # ========================================================

    path(
        "api/",
        include("exams.urls")
    ),


    # ========================================================
    # RE-EXAMS
    # ========================================================

    path(
        "api/",
        include("reexams.urls")
    ),


    # ========================================================
    # ASSIGNMENTS
    # ========================================================

    path(
        "api/",
        include("assignments.urls")
    ),

    path("api/assignments/", include("assignments.urls")),
    # ========================================================
    # ATTENDANCE
    # ========================================================

    path(
        "api/",
        include("attendance.urls")
    ),


    
    path(
        "api/schema/",
        SpectacularAPIView.as_view(),
        name="schema"
    ),

    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(
            url_name="schema"
        ),
        name="swagger-ui"
    ),
]


# ============================================================
# MEDIA FILES - DEVELOPMENT
# ============================================================

if settings.DEBUG:

    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )
