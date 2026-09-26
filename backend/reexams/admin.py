from django.contrib import admin
from .models import ReExam


@admin.register(ReExam)
class ReExamAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "exam",
        "student",
        "reexam_date",
        "start_time",
        "end_time",
        "reason",
        "created_at",
    )