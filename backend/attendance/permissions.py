from rest_framework.permissions import BasePermission


class IsStaffOrAdmin(BasePermission):

    def has_permission(self, request, view):

        if not request.user.is_authenticated:
            return False

        try:
            role = request.user.userprofile.role.name

            return role in ["Staff", "Admin"]

        except:
            return False