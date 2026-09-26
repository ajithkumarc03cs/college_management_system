from django.contrib import admin

from .models import Assignment, AssignmentSubmission


@admin.register(Assignment)
class AssignmentAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "title",
        "exam",
        "student",
        "assigned_by",
        "due_date",
        "created_at",
    )


@admin.register(AssignmentSubmission)
class AssignmentSubmissionAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "assignment",
        "student",
        "status",
        "submitted_at",
        "reviewed_at",
    )
    