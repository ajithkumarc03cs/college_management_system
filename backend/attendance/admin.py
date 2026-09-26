from django.contrib import admin
from .models import Attendance


@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "student",
        "course",
        "department",
        "year",
        "date",
        "status",
        "marked_by",
        "created_at",
    )

    list_filter = (
        "status",
        "course",
        "department",
        "year",
        "date",
    )

    search_fields = (
        "student__name",
        "student__email",
    )