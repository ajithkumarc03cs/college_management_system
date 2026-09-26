from django.contrib import admin
from .models import Student


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "name",
        "email",
        "phone",
        "course",
        "department",
        "admission_year",
        "get_year",
    )

    def get_year(self, obj):
        return obj.get_current_year()

    get_year.short_description = "Current Year"