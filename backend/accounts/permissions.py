from rest_framework.permissions import BasePermission


class IsStaffRole(BasePermission):

    def has_permission(self, request, view):

        if not request.user.is_authenticated:
            return False

        try:
            return request.user.userprofile.role.name == "Staff"
        except:
            return False



class IsPrincipal(BasePermission):

    def has_permission(self, request, view):

        if not request.user.is_authenticated:
            return False

        try:
            return request.user.userprofile.role.name == "Principal"
        except:
            return False



class IsHOD(BasePermission):

    def has_permission(self, request, view):

        if not request.user.is_authenticated:
            return False

        try:
            profile = request.user.userprofile

            return (
                profile.role.name == "HOD"
                and profile.department is not None
            )

        except:
            return False