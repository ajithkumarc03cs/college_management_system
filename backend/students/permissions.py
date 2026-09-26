from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):

    def has_permission(self, request, view):

        if not request.user.is_authenticated:
            return False

        try:
            return request.user.userprofile.role.name == "Admin"
        except:
            return False


class IsStaffOrAdmin(BasePermission):

    def has_permission(self, request, view):

        if not request.user.is_authenticated:
            return False

        try:
            role = request.user.userprofile.role.name

            return role in ["Staff", "Admin"]

        except:
            return False






class IsStudent(BasePermission):

    def has_permission(self, request, view):

        if not request.user.is_authenticated:
            return False

        try:
            return request.user.userprofile.role.name == "Student"
        except:
            return False