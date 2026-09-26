from django.contrib import admin
from .models import Exam, ExamParticipation


@admin.register(Exam)
class ExamAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "name",
        "course",
        "department",
        "year",
        "exam_date",
        "start_time",
        "end_time",
        "created_by",
    )


@admin.register(ExamParticipation)
class ExamParticipationAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "exam",
        "student",
        "status",
        "marks",
    )