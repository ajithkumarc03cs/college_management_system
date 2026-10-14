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





class HasRolePermission(BasePermission):

    def has_permission(self, request, view):

        if not request.user.is_authenticated:
            return False

        try:
            profile = request.user.userprofile
            role = profile.role
        except Exception:
            return False

        permission_code = getattr(
            view,
            "permission_code",
            None
        )

        if not permission_code:
            return False

        try:

            from .models import RolePermission

            role_permission = (
                RolePermission.objects
                .select_related("permission")
                .get(
                    role=role,
                    permission__code=permission_code
                )
            )

        except RolePermission.DoesNotExist:

            return False

        method = request.method.upper()

        # GET
        if method in ["GET", "HEAD", "OPTIONS"]:

            return role_permission.can_view

        # POST
        if method == "POST":

            return role_permission.can_create

        # PUT / PATCH
        if method in ["PUT", "PATCH"]:

            return role_permission.can_edit

        # DELETE
        if method == "DELETE":

            return role_permission.can_delete

        return False