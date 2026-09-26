from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Role, UserProfile, StaffAssignment
from django import forms
from .models import WebsiteSettings


@admin.register(WebsiteSettings)
class WebsiteSettingsAdmin(admin.ModelAdmin):
    list_display = (
        "college_name",
        "tagline",
        "phone",
        "email",
        "updated_at",
    )



    
@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ("id", "name")


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "role")



class StaffAssignmentForm(forms.ModelForm):

    class Meta:
        model = StaffAssignment
        fields = [
            "staff",
            "subject",
        ]

    def clean_staff(self):

        staff = self.cleaned_data["staff"]

        try:
            role = staff.userprofile.role.name
        except UserProfile.DoesNotExist:
            raise forms.ValidationError(
                "This user does not have a profile."
            )

        if role != "Staff":
            raise forms.ValidationError(
                "Only users with Staff role can be assigned."
            )

        return staff



@admin.register(StaffAssignment)
class StaffAssignmentAdmin(admin.ModelAdmin):

    form = StaffAssignmentForm

    list_display = (
        "id",
        "staff",
        "subject",
        "assigned_at",
    )