# # from django.contrib.auth.models import User

# # from rest_framework import serializers
# # from .models import WebsiteDepartment
# # from .models import (
# #     Role,
# #     UserProfile,
# #     StaffAssignment,
# #     Permission,
# #     RolePermission,
# #     SidebarMenu,
# #     RoleMenu,
# # )
# # from .models import (
# #     WebsiteMenu,
# #     HomePage,
# #     HomeStatistic,
# #     HomeCourse,
# #     HomeOffer,
# #     HomeDepartment,
# #     HomeWhyChoose,
# #     HomeFacility,
# #     HomeEvent,
# #     HomeNotice,
# #     HomeGallery,
# #     HomeTestimonial,
# #     CoursePage,
# #     CoursePageCourse,
# #     AboutPage,
# #     AboutValue,
# #     AboutFacility,
# # )
# # from academics.models import (
# #     Department,
# #     Subject,
# # )

# # # from .models import WebsiteMenu

# # from .models import WebsiteSettings


# # class WebsiteSettingsSerializer(serializers.ModelSerializer):

# #     class Meta:
# #         model = WebsiteSettings
# #         fields = "__all__"

# # # ============================================================
# # # LOGIN
# # # ============================================================

# # class LoginSerializer(serializers.Serializer):

# #     username = serializers.CharField(
# #         max_length=150
# #     )

# #     password = serializers.CharField(
# #         write_only=True,
# #         style={
# #             "input_type": "password"
# #         }
# #     )


# # # ============================================================
# # # STAFF ASSIGNMENT DISPLAY
# # # ============================================================

# # class StaffAssignmentSerializer(
# #     serializers.ModelSerializer
# # ):

# #     staff_name = serializers.CharField(
# #         source="staff.username",
# #         read_only=True
# #     )

# #     subject_name = serializers.CharField(
# #         source="subject.name",
# #         read_only=True
# #     )

# #     subject_code = serializers.CharField(
# #         source="subject.code",
# #         read_only=True
# #     )

# #     course_name = serializers.CharField(
# #         source="subject.course.name",
# #         read_only=True
# #     )

# #     department_name = serializers.CharField(
# #         source="subject.department.name",
# #         read_only=True
# #     )

# #     class Meta:

# #         model = StaffAssignment

# #         fields = [
# #             "id",
# #             "staff",
# #             "staff_name",
# #             "subject",
# #             "subject_name",
# #             "subject_code",
# #             "course_name",
# #             "department_name",
# #             "assigned_at",
# #         ]

# #         read_only_fields = [
# #             "id",
# #             "assigned_at",
# #             "staff_name",
# #             "subject_name",
# #             "subject_code",
# #             "course_name",
# #             "department_name",
# #         ]


# # # ============================================================
# # # STAFF LIST DISPLAY
# # # ============================================================

# # class StaffSerializer(
# #     serializers.ModelSerializer
# # ):

# #     role = serializers.CharField(
# #         source="userprofile.role.name",
# #         read_only=True
# #     )

# #     department = serializers.CharField(
# #         source="userprofile.department.name",
# #         read_only=True,
# #         allow_null=True
# #     )

# #     department_id = serializers.IntegerField(
# #         source="userprofile.department.id",
# #         read_only=True,
# #         allow_null=True
# #     )

# #     class Meta:

# #         model = User

# #         fields = [
# #             "id",
# #             "username",
# #             "email",
# #             "role",
# #             "department",
# #             "department_id",
# #             "is_active",
# #         ]

# #         read_only_fields = [
# #             "id",
# #             "username",
# #             "email",
# #             "role",
# #             "department",
# #             "department_id",
# #             "is_active",
# #         ]


# # # ============================================================
# # # HOD ASSIGN / UPDATE SUBJECT TO STAFF
# # # ============================================================

# # class StaffAssignmentCreateSerializer(
# #     serializers.Serializer
# # ):

# #     staff = serializers.PrimaryKeyRelatedField(
# #         queryset=User.objects.all(),
# #         required=False
# #     )

# #     subject = serializers.PrimaryKeyRelatedField(
# #         queryset=Subject.objects.all(),
# #         required=False
# #     )

# #     def validate(self, attrs):

# #         request = self.context.get(
# #             "request"
# #         )

# #         if request is None:

# #             raise serializers.ValidationError({
# #                 "request":
# #                     "Request context is required."
# #             })

# #         # ====================================================
# #         # HOD PROFILE
# #         # ====================================================

# #         try:

# #             hod_profile = (
# #                 request.user.userprofile
# #             )

# #         except UserProfile.DoesNotExist:

# #             raise serializers.ValidationError({
# #                 "user":
# #                     "HOD profile does not exist."
# #             })

# #         # ====================================================
# #         # HOD ROLE
# #         # ====================================================

# #         if (
# #             hod_profile.role.name.lower()
# #             != "hod"
# #         ):

# #             raise serializers.ValidationError({
# #                 "user":
# #                     "Only HOD can assign subjects."
# #             })

# #         # ====================================================
# #         # HOD DEPARTMENT
# #         # ====================================================

# #         hod_department = (
# #             hod_profile.department
# #         )

# #         if hod_department is None:

# #             raise serializers.ValidationError({
# #                 "department":
# #                     "HOD is not assigned to a department."
# #             })

# #         # ====================================================
# #         # CREATE / UPDATE VALUES
# #         # ====================================================

# #         if self.instance is not None:

# #             staff = attrs.get(
# #                 "staff",
# #                 self.instance.staff
# #             )

# #             subject = attrs.get(
# #                 "subject",
# #                 self.instance.subject
# #             )

# #         else:

# #             staff = attrs.get(
# #                 "staff"
# #             )

# #             subject = attrs.get(
# #                 "subject"
# #             )

# #             if staff is None:

# #                 raise serializers.ValidationError({
# #                     "staff":
# #                         "Staff is required."
# #                 })

# #             if subject is None:

# #                 raise serializers.ValidationError({
# #                     "subject":
# #                         "Subject is required."
# #                 })

# #         # ====================================================
# #         # STAFF PROFILE
# #         # ====================================================

# #         try:

# #             staff_profile = (
# #                 staff.userprofile
# #             )

# #         except UserProfile.DoesNotExist:

# #             raise serializers.ValidationError({
# #                 "staff":
# #                     "Selected staff profile does not exist."
# #             })

# #         # ====================================================
# #         # STAFF ROLE
# #         # ====================================================

# #         if (
# #             staff_profile.role.name.lower()
# #             != "staff"
# #         ):

# #             raise serializers.ValidationError({
# #                 "staff":
# #                     "Only Staff users can receive subjects."
# #             })

# #         # ====================================================
# #         # STAFF DEPARTMENT
# #         # ====================================================

# #         if (
# #             staff_profile.department_id
# #             != hod_department.id
# #         ):

# #             raise serializers.ValidationError({
# #                 "staff":
# #                     "Staff must belong to your department."
# #             })

# #         # ====================================================
# #         # SUBJECT DEPARTMENT
# #         # ====================================================

# #         if (
# #             subject.department_id
# #             != hod_department.id
# #         ):

# #             raise serializers.ValidationError({
# #                 "subject":
# #                     "Subject must belong to your department."
# #             })

# #         # ====================================================
# #         # DUPLICATE CHECK
# #         # ====================================================

# #         duplicate_query = (
# #             StaffAssignment.objects.filter(
# #                 staff=staff,
# #                 subject=subject
# #             )
# #         )

# #         if self.instance is None:

# #             if duplicate_query.exists():

# #                 raise serializers.ValidationError({
# #                     "subject":
# #                         "This subject is already assigned to this staff."
# #                 })

# #         else:

# #             if (
# #                 duplicate_query
# #                 .exclude(
# #                     id=self.instance.id
# #                 )
# #                 .exists()
# #             ):

# #                 raise serializers.ValidationError({
# #                     "subject":
# #                         "This subject is already assigned to this staff."
# #                 })

# #         return attrs

# #     # ========================================================
# #     # CREATE
# #     # ========================================================

# #     def create(
# #         self,
# #         validated_data
# #     ):

# #         return StaffAssignment.objects.create(
# #             **validated_data
# #         )

# #     # ========================================================
# #     # UPDATE
# #     # ========================================================

# #     def update(
# #         self,
# #         instance,
# #         validated_data
# #     ):

# #         if "staff" in validated_data:

# #             instance.staff = (
# #                 validated_data["staff"]
# #             )

# #         if "subject" in validated_data:

# #             instance.subject = (
# #                 validated_data["subject"]
# #             )

# #         instance.save()

# #         return instance


# # # ============================================================
# # # ADMIN CREATE STAFF
# # # ============================================================

# # class StaffCreateSerializer(
# #     serializers.Serializer
# # ):

# #     username = serializers.CharField(
# #         max_length=150
# #     )

# #     email = serializers.EmailField()

# #     password = serializers.CharField(
# #         write_only=True,
# #         min_length=6,
# #         style={
# #             "input_type": "password"
# #         }
# #     )

# #     department = serializers.PrimaryKeyRelatedField(
# #         queryset=Department.objects.all()
# #     )

# #     # ========================================================
# #     # USERNAME VALIDATION
# #     # ========================================================

# #     def validate_username(
# #         self,
# #         value
# #     ):

# #         value = value.strip()

# #         if not value:

# #             raise serializers.ValidationError(
# #                 "Username is required."
# #             )

# #         if (
# #             User.objects
# #             .filter(
# #                 username__iexact=value
# #             )
# #             .exists()
# #         ):

# #             raise serializers.ValidationError(
# #                 "Username already exists."
# #             )

# #         return value

# #     # ========================================================
# #     # EMAIL VALIDATION
# #     # ========================================================

# #     def validate_email(
# #         self,
# #         value
# #     ):

# #         value = value.strip().lower()

# #         if (
# #             User.objects
# #             .filter(
# #                 email__iexact=value
# #             )
# #             .exists()
# #         ):

# #             raise serializers.ValidationError(
# #                 "Email already exists."
# #             )

# #         return value

# #     # ========================================================
# #     # CREATE
# #     # ========================================================

# #     def create(
# #         self,
# #         validated_data
# #     ):

# #         username = validated_data[
# #             "username"
# #         ]

# #         email = validated_data[
# #             "email"
# #         ]

# #         password = validated_data[
# #             "password"
# #         ]

# #         department = validated_data[
# #             "department"
# #         ]

# #         # ====================================================
# #         # STAFF ROLE
# #         # ====================================================

# #         try:

# #             role = Role.objects.get(
# #                 name__iexact="Staff"
# #             )

# #         except Role.DoesNotExist:

# #             raise serializers.ValidationError({
# #                 "role":
# #                     "Staff role does not exist."
# #             })

# #         # ====================================================
# #         # USER
# #         # ====================================================

# #         user = User.objects.create_user(

# #             username=username,

# #             email=email,

# #             password=password

# #         )

# #         # ====================================================
# #         # PROFILE
# #         # ====================================================

# #         UserProfile.objects.create(

# #             user=user,

# #             role=role,

# #             department=department

# #         )

# #         return user

# #     # ========================================================
# #     # RESPONSE
# #     # ========================================================

# #     def to_representation(
# #         self,
# #         instance
# #     ):

# #         profile = instance.userprofile

# #         return {

# #             "id":
# #                 instance.id,

# #             "username":
# #                 instance.username,

# #             "email":
# #                 instance.email,

# #             "role":
# #                 profile.role.name,

# #             "department":
# #                 (
# #                     profile.department.name
# #                     if profile.department
# #                     else None
# #                 ),

# #             "department_id":
# #                 (
# #                     profile.department.id
# #                     if profile.department
# #                     else None
# #                 ),

# #             "is_active":
# #                 instance.is_active,

# #         }


# # # ============================================================
# # # ADMIN CREATE USER
# # # ============================================================

# # class AdminUserCreateSerializer(
# #     serializers.Serializer
# # ):

# #     username = serializers.CharField(
# #         max_length=150
# #     )

# #     email = serializers.EmailField()

# #     password = serializers.CharField(
# #         write_only=True,
# #         min_length=6,
# #         style={
# #             "input_type": "password"
# #         }
# #     )

# #     role = serializers.PrimaryKeyRelatedField(
# #         queryset=Role.objects.all()
# #     )

# #     department = serializers.PrimaryKeyRelatedField(
# #         queryset=Department.objects.all(),
# #         required=False,
# #         allow_null=True
# #     )

# #     # ========================================================
# #     # USERNAME
# #     # ========================================================

# #     def validate_username(
# #         self,
# #         value
# #     ):

# #         value = value.strip()

# #         if not value:

# #             raise serializers.ValidationError(
# #                 "Username is required."
# #             )

# #         if (
# #             User.objects
# #             .filter(
# #                 username__iexact=value
# #             )
# #             .exists()
# #         ):

# #             raise serializers.ValidationError(
# #                 "Username already exists."
# #             )

# #         return value

# #     # ========================================================
# #     # EMAIL
# #     # ========================================================

# #     def validate_email(
# #         self,
# #         value
# #     ):

# #         value = value.strip().lower()

# #         if (
# #             User.objects
# #             .filter(
# #                 email__iexact=value
# #             )
# #             .exists()
# #         ):

# #             raise serializers.ValidationError(
# #                 "Email already exists."
# #             )

# #         return value

# #     # ========================================================
# #     # VALIDATION
# #     # ========================================================

# #     def validate(
# #         self,
# #         attrs
# #     ):

# #         role = attrs["role"]

# #         department = attrs.get(
# #             "department"
# #         )

# #         role_name = role.name.lower()

# #         # ====================================================
# #         # HOD
# #         # ====================================================

# #         if (
# #             role_name == "hod"
# #             and department is None
# #         ):

# #             raise serializers.ValidationError({
# #                 "department":
# #                     "HOD must have a department."
# #             })

# #         # ====================================================
# #         # STAFF
# #         # ====================================================

# #         if (
# #             role_name == "staff"
# #             and department is None
# #         ):

# #             raise serializers.ValidationError({
# #                 "department":
# #                     "Staff must have a department."
# #             })

# #         # ====================================================
# #         # STUDENT
# #         # ====================================================

# #         if role_name == "student":

# #             raise serializers.ValidationError({
# #                 "role":
# #                     "Student must be created using the student creation API."
# #             })

# #         # ====================================================
# #         # ADMIN
# #         # ====================================================

# #         if (
# #             role_name == "admin"
# #             and department is not None
# #         ):

# #             raise serializers.ValidationError({
# #                 "department":
# #                     "Admin should not have a department."
# #             })

# #         return attrs

# #     # ========================================================
# #     # CREATE
# #     # ========================================================

# #     def create(
# #         self,
# #         validated_data
# #     ):

# #         user = User.objects.create_user(

# #             username=validated_data[
# #                 "username"
# #             ],

# #             email=validated_data[
# #                 "email"
# #             ],

# #             password=validated_data[
# #                 "password"
# #             ]

# #         )

# #         UserProfile.objects.create(

# #             user=user,

# #             role=validated_data[
# #                 "role"
# #             ],

# #             department=validated_data.get(
# #                 "department"
# #             )

# #         )

# #         return user

# #     # ========================================================
# #     # RESPONSE
# #     # ========================================================

# #     def to_representation(
# #         self,
# #         instance
# #     ):

# #         profile = instance.userprofile

# #         return {

# #             "id":
# #                 instance.id,

# #             "username":
# #                 instance.username,

# #             "email":
# #                 instance.email,

# #             "role":
# #                 profile.role.id,

# #             "role_name":
# #                 profile.role.name,

# #             "department":
# #                 (
# #                     profile.department.id
# #                     if profile.department
# #                     else None
# #                 ),

# #             "department_name":
# #                 (
# #                     profile.department.name
# #                     if profile.department
# #                     else None
# #                 ),

# #             "is_active":
# #                 instance.is_active,

# #         }


# # # ============================================================
# # # ROLE
# # # ============================================================

# # class RoleSerializer(
# #     serializers.ModelSerializer
# # ):

# #     user_count = serializers.IntegerField(
# #         read_only=True
# #     )

# #     class Meta:

# #         model = Role

# #         fields = [
# #             "id",
# #             "name",
# #             "user_count",
# #         ]

# #         read_only_fields = [
# #             "id",
# #             "user_count",
# #         ]

# #     # ========================================================
# #     # ROLE NAME VALIDATION
# #     # ========================================================

# #     def validate_name(
# #         self,
# #         value
# #     ):

# #         value = value.strip()

# #         if not value:

# #             raise serializers.ValidationError(
# #                 "Role name is required."
# #             )

# #         queryset = Role.objects.filter(
# #             name__iexact=value
# #         )

# #         if self.instance is not None:

# #             queryset = queryset.exclude(
# #                 pk=self.instance.pk
# #             )

# #         if queryset.exists():

# #             raise serializers.ValidationError(
# #                 "Role already exists."
# #             )

# #         return value


# # # ============================================================
# # # ADMIN USER LIST
# # # ============================================================

# # class AdminUserListSerializer(
# #     serializers.ModelSerializer
# # ):

# #     role = serializers.CharField(
# #         source="userprofile.role.name",
# #         read_only=True
# #     )

# #     role_id = serializers.IntegerField(
# #         source="userprofile.role.id",
# #         read_only=True
# #     )

# #     department = serializers.CharField(
# #         source="userprofile.department.name",
# #         read_only=True,
# #         allow_null=True
# #     )

# #     department_id = serializers.IntegerField(
# #         source="userprofile.department.id",
# #         read_only=True,
# #         allow_null=True
# #     )

# #     class Meta:

# #         model = User

# #         fields = [
# #             "id",
# #             "username",
# #             "email",
# #             "role",
# #             "role_id",
# #             "department",
# #             "department_id",
# #             "is_active",
# #         ]


# # # ============================================================
# # # ADMIN USER UPDATE
# # # ============================================================

# # class AdminUserUpdateSerializer(
# #     serializers.Serializer
# # ):

# #     username = serializers.CharField(
# #         max_length=150,
# #         required=False
# #     )

# #     email = serializers.EmailField(
# #         required=False
# #     )

# #     role = serializers.PrimaryKeyRelatedField(
# #         queryset=Role.objects.all(),
# #         required=False
# #     )

# #     department = serializers.PrimaryKeyRelatedField(
# #         queryset=Department.objects.all(),
# #         required=False,
# #         allow_null=True
# #     )

# #     is_active = serializers.BooleanField(
# #         required=False
# #     )

# #     # ========================================================
# #     # USERNAME
# #     # ========================================================

# #     def validate_username(
# #         self,
# #         value
# #     ):

# #         value = value.strip()

# #         if not value:

# #             raise serializers.ValidationError(
# #                 "Username is required."
# #             )

# #         queryset = User.objects.filter(
# #             username__iexact=value
# #         )

# #         if self.instance is not None:

# #             queryset = queryset.exclude(
# #                 pk=self.instance.pk
# #             )

# #         if queryset.exists():

# #             raise serializers.ValidationError(
# #                 "Username already exists."
# #             )

# #         return value

# #     # ========================================================
# #     # EMAIL
# #     # ========================================================

# #     def validate_email(
# #         self,
# #         value
# #     ):

# #         value = value.strip().lower()

# #         queryset = User.objects.filter(
# #             email__iexact=value
# #         )

# #         if self.instance is not None:

# #             queryset = queryset.exclude(
# #                 pk=self.instance.pk
# #             )

# #         if queryset.exists():

# #             raise serializers.ValidationError(
# #                 "Email already exists."
# #             )

# #         return value

# #     # ========================================================
# #     # VALIDATION
# #     # ========================================================

# #     def validate(
# #         self,
# #         attrs
# #     ):

# #         instance = self.instance

# #         profile = instance.userprofile

# #         role = attrs.get(
# #             "role",
# #             profile.role
# #         )

# #         department = attrs.get(
# #             "department",
# #             profile.department
# #         )

# #         role_name = role.name.lower()

# #         # ====================================================
# #         # HOD
# #         # ====================================================

# #         if (
# #             role_name == "hod"
# #             and department is None
# #         ):

# #             raise serializers.ValidationError({
# #                 "department":
# #                     "HOD must have a department."
# #             })

# #         # ====================================================
# #         # STAFF
# #         # ====================================================

# #         if (
# #             role_name == "staff"
# #             and department is None
# #         ):

# #             raise serializers.ValidationError({
# #                 "department":
# #                     "Staff must have a department."
# #             })

# #         # ====================================================
# #         # STUDENT
# #         # ====================================================

# #         if role_name == "student":

# #             raise serializers.ValidationError({
# #                 "role":
# #                     "Student role cannot be assigned from this API."
# #             })

# #         # ====================================================
# #         # ADMIN
# #         # ====================================================

# #         if (
# #             role_name == "admin"
# #             and department is not None
# #         ):

# #             raise serializers.ValidationError({
# #                 "department":
# #                     "Admin should not have a department."
# #             })

# #         return attrs

# #     # ========================================================
# #     # UPDATE
# #     # ========================================================

# #     def update(
# #         self,
# #         instance,
# #         validated_data
# #     ):

# #         # ====================================================
# #         # USER
# #         # ====================================================

# #         if "username" in validated_data:

# #             instance.username = (
# #                 validated_data["username"]
# #             )

# #         if "email" in validated_data:

# #             instance.email = (
# #                 validated_data["email"]
# #             )

# #         if "is_active" in validated_data:

# #             instance.is_active = (
# #                 validated_data["is_active"]
# #             )

# #         instance.save()

# #         # ====================================================
# #         # PROFILE
# #         # ====================================================

# #         profile = instance.userprofile

# #         if "role" in validated_data:

# #             profile.role = (
# #                 validated_data["role"]
# #             )

# #         if "department" in validated_data:

# #             profile.department = (
# #                 validated_data["department"]
# #             )

# #         profile.save()

# #         return instance


# # # ============================================================
# # # PERMISSION
# # # ============================================================

# # class PermissionSerializer(
# #     serializers.ModelSerializer
# # ):

# #     class Meta:

# #         model = Permission

# #         fields = [
# #             "id",
# #             "name",
# #             "code",
# #         ]

# #         read_only_fields = [
# #             "id",
# #         ]


# # # ============================================================
# # # ROLE PERMISSION
# # # ============================================================

# # class RolePermissionSerializer(
# #     serializers.ModelSerializer
# # ):

# #     permission_id = serializers.IntegerField(
# #         source="permission.id",
# #         read_only=True
# #     )

# #     permission_name = serializers.CharField(
# #         source="permission.name",
# #         read_only=True
# #     )

# #     permission_code = serializers.CharField(
# #         source="permission.code",
# #         read_only=True
# #     )

# #     class Meta:

# #         model = RolePermission

# #         fields = [
# #             "id",
# #             "permission_id",
# #             "permission_name",
# #             "permission_code",
# #             "can_view",
# #             "can_create",
# #             "can_edit",
# #             "can_delete",
# #         ]

# #         read_only_fields = [
# #             "id",
# #             "permission_id",
# #             "permission_name",
# #             "permission_code",
# #         ]


# # # ============================================================
# # # SIDEBAR MENU
# # # ============================================================

# # class SidebarMenuSerializer(
# #     serializers.ModelSerializer
# # ):

# #     class Meta:

# #         model = SidebarMenu

# #         fields = [
# #             "id",
# #             "name",
# #             "path",
# #             "icon",
# #             "order",
# #             "is_active",
# #         ]

# #         read_only_fields = [
# #             "id",
# #         ]

# #     # ========================================================
# #     # NAME VALIDATION
# #     # ========================================================

# #     def validate_name(
# #         self,
# #         value
# #     ):

# #         value = value.strip()

# #         if not value:

# #             raise serializers.ValidationError(
# #                 "Menu name is required."
# #             )

# #         queryset = SidebarMenu.objects.filter(
# #             name__iexact=value
# #         )

# #         if self.instance is not None:

# #             queryset = queryset.exclude(
# #                 pk=self.instance.pk
# #             )

# #         if queryset.exists():

# #             raise serializers.ValidationError(
# #                 "Sidebar menu already exists."
# #             )

# #         return value

# #     # ========================================================
# #     # PATH VALIDATION
# #     # ========================================================

# #     def validate_path(
# #         self,
# #         value
# #     ):

# #         value = value.strip()

# #         if not value:

# #             raise serializers.ValidationError(
# #                 "Menu path is required."
# #             )

# #         queryset = SidebarMenu.objects.filter(
# #             path=value
# #         )

# #         if self.instance is not None:

# #             queryset = queryset.exclude(
# #                 pk=self.instance.pk
# #             )

# #         if queryset.exists():

# #             raise serializers.ValidationError(
# #                 "Sidebar path already exists."
# #             )

# #         return value


# # # ============================================================
# # # ROLE MENU
# # # ============================================================

# # class RoleMenuSerializer(
# #     serializers.ModelSerializer
# # ):

# #     menu_id = serializers.IntegerField(
# #         source="menu.id",
# #         read_only=True
# #     )

# #     menu_name = serializers.CharField(
# #         source="menu.name",
# #         read_only=True
# #     )

# #     menu_path = serializers.CharField(
# #         source="menu.path",
# #         read_only=True
# #     )

# #     menu_icon = serializers.CharField(
# #         source="menu.icon",
# #         read_only=True
# #     )

# #     class Meta:

# #         model = RoleMenu

# #         fields = [
# #             "id",
# #             "menu_id",
# #             "menu_name",
# #             "menu_path",
# #             "menu_icon",
# #             "is_visible",
# #         ]

# #         read_only_fields = [
# #             "id",
# #             "menu_id",
# #             "menu_name",
# #             "menu_path",
# #             "menu_icon",
# #         ]


# # # ============================================================
# # # ROLE MENU UPDATE
# # # ============================================================

# # class RoleMenuUpdateSerializer(
# #     serializers.Serializer
# # ):

# #     role_id = serializers.IntegerField()

# #     menus = serializers.ListField(
# #         child=serializers.DictField(),
# #         allow_empty=True
# #     )

# #     # ========================================================
# #     # VALIDATE ROLE
# #     # ========================================================

# #     def validate_role_id(
# #         self,
# #         value
# #     ):

# #         if not Role.objects.filter(
# #             id=value
# #         ).exists():

# #             raise serializers.ValidationError(
# #                 "Role not found."
# #             )

# #         return value

# #     # ========================================================
# #     # VALIDATE MENUS
# #     # ========================================================

# #     def validate_menus(
# #         self,
# #         value
# #     ):

# #         for item in value:

# #             if "menu_id" not in item:

# #                 raise serializers.ValidationError(
# #                     "Each menu must contain menu_id."
# #                 )

# #             menu_id = item.get(
# #                 "menu_id"
# #             )

# #             if not SidebarMenu.objects.filter(
# #                 id=menu_id
# #             ).exists():

# #                 raise serializers.ValidationError(
# #                     f"Sidebar menu {menu_id} does not exist."
# #                 )

# #             if "is_visible" in item:

# #                 if not isinstance(
# #                     item["is_visible"],
# #                     bool
# #                 ):

# #                     raise serializers.ValidationError(
# #                         "is_visible must be true or false."
# #                     )

# #         return value



# # class WebsiteMenuSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = WebsiteMenu
# #         fields = "__all__"








# # # ============================================================
# # # HOME PAGE
# # # ============================================================

# # class HomeStatisticSerializer(serializers.ModelSerializer):

# #     class Meta:
# #         model = HomeStatistic
# #         fields = "__all__"


# # class HomeCourseSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = HomeCourse
# #         fields = "__all__"
# #         extra_kwargs = {
# #             "home": {
# #                 "required": False
# #             }
# #         }


# # class HomeOfferSerializer(serializers.ModelSerializer):

# #     class Meta:
# #         model = HomeOffer
# #         fields = "__all__"


# # class HomeDepartmentSerializer(serializers.ModelSerializer):

# #     class Meta:
# #         model = HomeDepartment
# #         fields = "__all__"


# # class HomeWhyChooseSerializer(serializers.ModelSerializer):

# #     class Meta:
# #         model = HomeWhyChoose
# #         fields = "__all__"


# # class HomeFacilitySerializer(serializers.ModelSerializer):

# #     class Meta:
# #         model = HomeFacility
# #         fields = "__all__"


# # class HomeEventSerializer(serializers.ModelSerializer):

# #     class Meta:
# #         model = HomeEvent
# #         fields = "__all__"


# # class HomeNoticeSerializer(serializers.ModelSerializer):

# #     class Meta:
# #         model = HomeNotice
# #         fields = "__all__"


# # class HomeGallerySerializer(serializers.ModelSerializer):

# #     class Meta:
# #         model = HomeGallery
# #         fields = "__all__"


# # class HomeTestimonialSerializer(serializers.ModelSerializer):

# #     class Meta:
# #         model = HomeTestimonial
# #         fields = "__all__"





# # class HomePageSerializer(serializers.ModelSerializer):

# #     statistics = HomeStatisticSerializer(
# #         many=True,
# #         read_only=True
# #     )

# #     courses = HomeCourseSerializer(
# #         many=True,
# #         read_only=True
# #     )

# #     offers = HomeOfferSerializer(
# #         many=True,
# #         read_only=True
# #     )

# #     departments = HomeDepartmentSerializer(
# #         many=True,
# #         read_only=True
# #     )

# #     why_choose_us = HomeWhyChooseSerializer(
# #         many=True,
# #         read_only=True
# #     )

# #     facilities = HomeFacilitySerializer(
# #         many=True,
# #         read_only=True
# #     )

# #     events = HomeEventSerializer(
# #         many=True,
# #         read_only=True
# #     )

# #     notices = HomeNoticeSerializer(
# #         many=True,
# #         read_only=True
# #     )

# #     gallery = HomeGallerySerializer(
# #         many=True,
# #         read_only=True
# #     )

# #     testimonials = HomeTestimonialSerializer(
# #         many=True,
# #         read_only=True
# #     )

# #     class Meta:
# #         model = HomePage

# #         fields = [
# #             "id",

# #             # Hero
# #             "hero_small_title",
# #             "hero_title",
# #             "hero_description",
# #             "hero_button_1_text",
# #             "hero_button_1_link",
# #             "hero_button_2_text",
# #             "hero_button_2_link",
# #             "hero_image",

# #             # About
# #             "about_label",
# #             "about_title",
# #             "about_description_1",
# #             "about_description_2",
# #             "about_image",

# #             # Courses
# #             "courses_label",
# #             "courses_title",
# #             "courses_description",

# #             # Admissions
# #             "admission_label",
# #             "admission_title",
# #             "admission_description",
# #             "admission_button_text",
# #             "admission_button_link",

# #             # Offers
# #             "offers_label",
# #             "offers_title",

# #             # Departments
# #             "departments_label",
# #             "departments_title",

# #             # Why Choose Us
# #             "why_label",
# #             "why_title",

# #             # Facilities
# #             "facilities_label",
# #             "facilities_title",

# #             # Events
# #             "events_label",
# #             "events_title",

# #             # Notices
# #             "notices_label",
# #             "notices_title",

# #             # Placements
# #             "placement_label",
# #             "placement_title",
# #             "placement_description",
# #             "placement_button_text",
# #             "placement_button_link",

# #             # Gallery
# #             "gallery_label",
# #             "gallery_title",

# #             # Testimonials
# #             "testimonial_label",
# #             "testimonial_title",

# #             # Contact
# #             "contact_label",
# #             "contact_title",
# #             "contact_description",
# #             "contact_address",
# #             "contact_phone",
# #             "contact_email",

# #             # Related data
# #             "statistics",
# #             "courses",
# #             "offers",
# #             "departments",
# #             "why_choose_us",
# #             "facilities",
# #             "events",
# #             "notices",
# #             "gallery",
# #             "testimonials",

# #             "updated_at",
# #         ]





# # class CoursePageCourseSerializer(serializers.ModelSerializer):

# #     class Meta:
# #         model = CoursePageCourse
# #         fields = "__all__"
# #         extra_kwargs = {
# #             "page": {
# #                 "required": False
# #             }
# #         }




# # class CoursePageSerializer(serializers.ModelSerializer):

# #     courses = CoursePageCourseSerializer(
# #         many=True,
# #         read_only=True
# #     )

# #     class Meta:
# #         model = CoursePage
# #         fields = "__all__"






# # class AboutValueSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = AboutValue
# #         fields = "__all__"
# #         extra_kwargs = {
# #             "page": {
# #                 "required": False
# #             }
# #         }


# # class AboutFacilitySerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = AboutFacility
# #         fields = "__all__"
# #         extra_kwargs = {
# #             "page": {
# #                 "required": False
# #             }
# #         }


# # class AboutPageSerializer(serializers.ModelSerializer):
# #     values = AboutValueSerializer(
# #         many=True,
# #         read_only=True
# #     )

# #     facilities = AboutFacilitySerializer(
# #         many=True,
# #         read_only=True
# #     )

# #     class Meta:
# #         model = AboutPage
# #         fields = "__all__"



# # class WebsiteDepartmentSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = WebsiteDepartment
# #         fields = [
# #             "id",
# #             "name",
# #             "icon",
# #             "description",
# #             "order",
# #             "is_active",
# #         ]
# #         read_only_fields = ["id"]



# from django.contrib.auth.models import User

# from rest_framework import serializers

# from .models import (
#     Role,
#     UserProfile,
#     StaffAssignment,
#     Permission,
#     RolePermission,
#     SidebarMenu,
#     RoleMenu,

#     WebsiteSettings,
#     WebsiteMenu,

#     HomePage,
#     HomeStatistic,
#     HomeCourse,
#     HomeOffer,
#     HomeDepartment,
#     HomeWhyChoose,
#     HomeFacility,
#     HomeEvent,
#     HomeNotice,
#     HomeGallery,
#     HomeTestimonial,

#     CoursePage,
#     CoursePageCourse,

#     AboutPage,
#     AboutValue,
#     AboutFacility,

#     WebsiteDepartment,
#     WebsiteDepartmentsPage,
#     WebsiteAdmissionsPage,
#     WebsiteAdmissionStep,
#     WebsiteAdmissionDocument,
#     WebsiteEventsPage,
#     WebsiteEvent,
#     WebsiteGalleryPage,
#     WebsiteGalleryItem,
#     WebsiteContactPage,
#     WebsiteContactMessage,
# )

# from academics.models import (
#     Department,
#     Subject,
# )


# # ============================================================
# # WEBSITE SETTINGS
# # ============================================================

# class WebsiteSettingsSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = WebsiteSettings
#         fields = "__all__"


# # ============================================================
# # LOGIN
# # ============================================================

# class LoginSerializer(serializers.Serializer):

#     username = serializers.CharField(
#         max_length=150
#     )

#     password = serializers.CharField(
#         write_only=True,
#         style={
#             "input_type": "password"
#         }
#     )


# # ============================================================
# # STAFF ASSIGNMENT DISPLAY
# # ============================================================

# class StaffAssignmentSerializer(
#     serializers.ModelSerializer
# ):

#     staff_name = serializers.CharField(
#         source="staff.username",
#         read_only=True
#     )

#     subject_name = serializers.CharField(
#         source="subject.name",
#         read_only=True
#     )

#     subject_code = serializers.CharField(
#         source="subject.code",
#         read_only=True
#     )

#     course_name = serializers.CharField(
#         source="subject.course.name",
#         read_only=True
#     )

#     department_name = serializers.CharField(
#         source="subject.department.name",
#         read_only=True
#     )

#     class Meta:

#         model = StaffAssignment

#         fields = [
#             "id",
#             "staff",
#             "staff_name",
#             "subject",
#             "subject_name",
#             "subject_code",
#             "course_name",
#             "department_name",
#             "assigned_at",
#         ]

#         read_only_fields = [
#             "id",
#             "assigned_at",
#             "staff_name",
#             "subject_name",
#             "subject_code",
#             "course_name",
#             "department_name",
#         ]


# # ============================================================
# # STAFF LIST DISPLAY
# # ============================================================

# class StaffSerializer(
#     serializers.ModelSerializer
# ):

#     role = serializers.CharField(
#         source="userprofile.role.name",
#         read_only=True
#     )

#     department = serializers.CharField(
#         source="userprofile.department.name",
#         read_only=True,
#         allow_null=True
#     )

#     department_id = serializers.IntegerField(
#         source="userprofile.department.id",
#         read_only=True,
#         allow_null=True
#     )

#     class Meta:

#         model = User

#         fields = [
#             "id",
#             "username",
#             "email",
#             "role",
#             "department",
#             "department_id",
#             "is_active",
#         ]

#         read_only_fields = [
#             "id",
#             "username",
#             "email",
#             "role",
#             "department",
#             "department_id",
#             "is_active",
#         ]


# # ============================================================
# # HOD ASSIGN / UPDATE SUBJECT TO STAFF
# # ============================================================

# class StaffAssignmentCreateSerializer(
#     serializers.Serializer
# ):

#     staff = serializers.PrimaryKeyRelatedField(
#         queryset=User.objects.all(),
#         required=False
#     )

#     subject = serializers.PrimaryKeyRelatedField(
#         queryset=Subject.objects.all(),
#         required=False
#     )

#     def validate(self, attrs):

#         request = self.context.get(
#             "request"
#         )

#         if request is None:

#             raise serializers.ValidationError({
#                 "request":
#                     "Request context is required."
#             })

#         # ====================================================
#         # HOD PROFILE
#         # ====================================================

#         try:

#             hod_profile = (
#                 request.user.userprofile
#             )

#         except UserProfile.DoesNotExist:

#             raise serializers.ValidationError({
#                 "user":
#                     "HOD profile does not exist."
#             })

#         # ====================================================
#         # HOD ROLE
#         # ====================================================

#         if (
#             hod_profile.role.name.lower()
#             != "hod"
#         ):

#             raise serializers.ValidationError({
#                 "user":
#                     "Only HOD can assign subjects."
#             })

#         # ====================================================
#         # HOD DEPARTMENT
#         # ====================================================

#         hod_department = (
#             hod_profile.department
#         )

#         if hod_department is None:

#             raise serializers.ValidationError({
#                 "department":
#                     "HOD is not assigned to a department."
#             })

#         # ====================================================
#         # CREATE / UPDATE VALUES
#         # ====================================================

#         if self.instance is not None:

#             staff = attrs.get(
#                 "staff",
#                 self.instance.staff
#             )

#             subject = attrs.get(
#                 "subject",
#                 self.instance.subject
#             )

#         else:

#             staff = attrs.get(
#                 "staff"
#             )

#             subject = attrs.get(
#                 "subject"
#             )

#             if staff is None:

#                 raise serializers.ValidationError({
#                     "staff":
#                         "Staff is required."
#                 })

#             if subject is None:

#                 raise serializers.ValidationError({
#                     "subject":
#                         "Subject is required."
#                 })

#         # ====================================================
#         # STAFF PROFILE
#         # ====================================================

#         try:

#             staff_profile = (
#                 staff.userprofile
#             )

#         except UserProfile.DoesNotExist:

#             raise serializers.ValidationError({
#                 "staff":
#                     "Selected staff profile does not exist."
#             })

#         # ====================================================
#         # STAFF ROLE
#         # ====================================================

#         if (
#             staff_profile.role.name.lower()
#             != "staff"
#         ):

#             raise serializers.ValidationError({
#                 "staff":
#                     "Only Staff users can receive subjects."
#             })

#         # ====================================================
#         # STAFF DEPARTMENT
#         # ====================================================

#         if (
#             staff_profile.department_id
#             != hod_department.id
#         ):

#             raise serializers.ValidationError({
#                 "staff":
#                     "Staff must belong to your department."
#             })

#         # ====================================================
#         # SUBJECT DEPARTMENT
#         # ====================================================

#         if (
#             subject.department_id
#             != hod_department.id
#         ):

#             raise serializers.ValidationError({
#                 "subject":
#                     "Subject must belong to your department."
#             })

#         # ====================================================
#         # DUPLICATE CHECK
#         # ====================================================

#         duplicate_query = (
#             StaffAssignment.objects.filter(
#                 staff=staff,
#                 subject=subject
#             )
#         )

#         if self.instance is None:

#             if duplicate_query.exists():

#                 raise serializers.ValidationError({
#                     "subject":
#                         "This subject is already assigned to this staff."
#                 })

#         else:

#             if (
#                 duplicate_query
#                 .exclude(
#                     id=self.instance.id
#                 )
#                 .exists()
#             ):

#                 raise serializers.ValidationError({
#                     "subject":
#                         "This subject is already assigned to this staff."
#                 })

#         return attrs

#     # ========================================================
#     # CREATE
#     # ========================================================

#     def create(
#         self,
#         validated_data
#     ):

#         return StaffAssignment.objects.create(
#             **validated_data
#         )

#     # ========================================================
#     # UPDATE
#     # ========================================================

#     def update(
#         self,
#         instance,
#         validated_data
#     ):

#         if "staff" in validated_data:

#             instance.staff = (
#                 validated_data["staff"]
#             )

#         if "subject" in validated_data:

#             instance.subject = (
#                 validated_data["subject"]
#             )

#         instance.save()

#         return instance


# # ============================================================
# # ADMIN CREATE STAFF
# # ============================================================

# class StaffCreateSerializer(
#     serializers.Serializer
# ):

#     username = serializers.CharField(
#         max_length=150
#     )

#     email = serializers.EmailField()

#     password = serializers.CharField(
#         write_only=True,
#         min_length=6,
#         style={
#             "input_type": "password"
#         }
#     )

#     department = serializers.PrimaryKeyRelatedField(
#         queryset=Department.objects.all()
#     )

#     # ========================================================
#     # USERNAME VALIDATION
#     # ========================================================

#     def validate_username(
#         self,
#         value
#     ):

#         value = value.strip()

#         if not value:

#             raise serializers.ValidationError(
#                 "Username is required."
#             )

#         if (
#             User.objects
#             .filter(
#                 username__iexact=value
#             )
#             .exists()
#         ):

#             raise serializers.ValidationError(
#                 "Username already exists."
#             )

#         return value

#     # ========================================================
#     # EMAIL VALIDATION
#     # ========================================================

#     def validate_email(
#         self,
#         value
#     ):

#         value = value.strip().lower()

#         if (
#             User.objects
#             .filter(
#                 email__iexact=value
#             )
#             .exists()
#         ):

#             raise serializers.ValidationError(
#                 "Email already exists."
#             )

#         return value

#     # ========================================================
#     # CREATE
#     # ========================================================

#     def create(
#         self,
#         validated_data
#     ):

#         username = validated_data[
#             "username"
#         ]

#         email = validated_data[
#             "email"
#         ]

#         password = validated_data[
#             "password"
#         ]

#         department = validated_data[
#             "department"
#         ]

#         # ====================================================
#         # STAFF ROLE
#         # ====================================================

#         try:

#             role = Role.objects.get(
#                 name__iexact="Staff"
#             )

#         except Role.DoesNotExist:

#             raise serializers.ValidationError({
#                 "role":
#                     "Staff role does not exist."
#             })

#         # ====================================================
#         # USER
#         # ====================================================

#         user = User.objects.create_user(

#             username=username,

#             email=email,

#             password=password

#         )

#         # ====================================================
#         # PROFILE
#         # ====================================================

#         UserProfile.objects.create(

#             user=user,

#             role=role,

#             department=department

#         )

#         return user

#     # ========================================================
#     # RESPONSE
#     # ========================================================

#     def to_representation(
#         self,
#         instance
#     ):

#         profile = instance.userprofile

#         return {

#             "id":
#                 instance.id,

#             "username":
#                 instance.username,

#             "email":
#                 instance.email,

#             "role":
#                 profile.role.name,

#             "department":
#                 (
#                     profile.department.name
#                     if profile.department
#                     else None
#                 ),

#             "department_id":
#                 (
#                     profile.department.id
#                     if profile.department
#                     else None
#                 ),

#             "is_active":
#                 instance.is_active,

#         }


# # ============================================================
# # ADMIN CREATE USER
# # ============================================================

# class AdminUserCreateSerializer(
#     serializers.Serializer
# ):

#     username = serializers.CharField(
#         max_length=150
#     )

#     email = serializers.EmailField()

#     password = serializers.CharField(
#         write_only=True,
#         min_length=6,
#         style={
#             "input_type": "password"
#         }
#     )

#     role = serializers.PrimaryKeyRelatedField(
#         queryset=Role.objects.all()
#     )

#     department = serializers.PrimaryKeyRelatedField(
#         queryset=Department.objects.all(),
#         required=False,
#         allow_null=True
#     )

#     # ========================================================
#     # USERNAME
#     # ========================================================

#     def validate_username(
#         self,
#         value
#     ):

#         value = value.strip()

#         if not value:

#             raise serializers.ValidationError(
#                 "Username is required."
#             )

#         if (
#             User.objects
#             .filter(
#                 username__iexact=value
#             )
#             .exists()
#         ):

#             raise serializers.ValidationError(
#                 "Username already exists."
#             )

#         return value

#     # ========================================================
#     # EMAIL
#     # ========================================================

#     def validate_email(
#         self,
#         value
#     ):

#         value = value.strip().lower()

#         if (
#             User.objects
#             .filter(
#                 email__iexact=value
#             )
#             .exists()
#         ):

#             raise serializers.ValidationError(
#                 "Email already exists."
#             )

#         return value

#     # ========================================================
#     # VALIDATION
#     # ========================================================

#     def validate(
#         self,
#         attrs
#     ):

#         role = attrs["role"]

#         department = attrs.get(
#             "department"
#         )

#         role_name = role.name.lower()

#         # ====================================================
#         # HOD
#         # ====================================================

#         if (
#             role_name == "hod"
#             and department is None
#         ):

#             raise serializers.ValidationError({
#                 "department":
#                     "HOD must have a department."
#             })

#         # ====================================================
#         # STAFF
#         # ====================================================

#         if (
#             role_name == "staff"
#             and department is None
#         ):

#             raise serializers.ValidationError({
#                 "department":
#                     "Staff must have a department."
#             })

#         # ====================================================
#         # STUDENT
#         # ====================================================

#         if role_name == "student":

#             raise serializers.ValidationError({
#                 "role":
#                     "Student must be created using the student creation API."
#             })

#         # ====================================================
#         # ADMIN
#         # ====================================================

#         if (
#             role_name == "admin"
#             and department is not None
#         ):

#             raise serializers.ValidationError({
#                 "department":
#                     "Admin should not have a department."
#             })

#         return attrs

#     # ========================================================
#     # CREATE
#     # ========================================================

#     def create(
#         self,
#         validated_data
#     ):

#         user = User.objects.create_user(

#             username=validated_data[
#                 "username"
#             ],

#             email=validated_data[
#                 "email"
#             ],

#             password=validated_data[
#                 "password"
#             ]

#         )

#         UserProfile.objects.create(

#             user=user,

#             role=validated_data[
#                 "role"
#             ],

#             department=validated_data.get(
#                 "department"
#             )

#         )

#         return user

#     # ========================================================
#     # RESPONSE
#     # ========================================================

#     def to_representation(
#         self,
#         instance
#     ):

#         profile = instance.userprofile

#         return {

#             "id":
#                 instance.id,

#             "username":
#                 instance.username,

#             "email":
#                 instance.email,

#             "role":
#                 profile.role.id,

#             "role_name":
#                 profile.role.name,

#             "department":
#                 (
#                     profile.department.id
#                     if profile.department
#                     else None
#                 ),

#             "department_name":
#                 (
#                     profile.department.name
#                     if profile.department
#                     else None
#                 ),

#             "is_active":
#                 instance.is_active,

#         }


# # ============================================================
# # ROLE
# # ============================================================

# class RoleSerializer(
#     serializers.ModelSerializer
# ):

#     user_count = serializers.IntegerField(
#         read_only=True
#     )

#     class Meta:

#         model = Role

#         fields = [
#             "id",
#             "name",
#             "user_count",
#         ]

#         read_only_fields = [
#             "id",
#             "user_count",
#         ]

#     # ========================================================
#     # ROLE NAME VALIDATION
#     # ========================================================

#     def validate_name(
#         self,
#         value
#     ):

#         value = value.strip()

#         if not value:

#             raise serializers.ValidationError(
#                 "Role name is required."
#             )

#         queryset = Role.objects.filter(
#             name__iexact=value
#         )

#         if self.instance is not None:

#             queryset = queryset.exclude(
#                 pk=self.instance.pk
#             )

#         if queryset.exists():

#             raise serializers.ValidationError(
#                 "Role already exists."
#             )

#         return value


# # ============================================================
# # ADMIN USER LIST
# # ============================================================

# class AdminUserListSerializer(
#     serializers.ModelSerializer
# ):

#     role = serializers.CharField(
#         source="userprofile.role.name",
#         read_only=True
#     )

#     role_id = serializers.IntegerField(
#         source="userprofile.role.id",
#         read_only=True
#     )

#     department = serializers.CharField(
#         source="userprofile.department.name",
#         read_only=True,
#         allow_null=True
#     )

#     department_id = serializers.IntegerField(
#         source="userprofile.department.id",
#         read_only=True,
#         allow_null=True
#     )

#     class Meta:

#         model = User

#         fields = [
#             "id",
#             "username",
#             "email",
#             "role",
#             "role_id",
#             "department",
#             "department_id",
#             "is_active",
#         ]


# # ============================================================
# # ADMIN USER UPDATE
# # ============================================================

# class AdminUserUpdateSerializer(
#     serializers.Serializer
# ):

#     username = serializers.CharField(
#         max_length=150,
#         required=False
#     )

#     email = serializers.EmailField(
#         required=False
#     )

#     role = serializers.PrimaryKeyRelatedField(
#         queryset=Role.objects.all(),
#         required=False
#     )

#     department = serializers.PrimaryKeyRelatedField(
#         queryset=Department.objects.all(),
#         required=False,
#         allow_null=True
#     )

#     is_active = serializers.BooleanField(
#         required=False
#     )

#     # ========================================================
#     # USERNAME
#     # ========================================================

#     def validate_username(
#         self,
#         value
#     ):

#         value = value.strip()

#         if not value:

#             raise serializers.ValidationError(
#                 "Username is required."
#             )

#         queryset = User.objects.filter(
#             username__iexact=value
#         )

#         if self.instance is not None:

#             queryset = queryset.exclude(
#                 pk=self.instance.pk
#             )

#         if queryset.exists():

#             raise serializers.ValidationError(
#                 "Username already exists."
#             )

#         return value

#     # ========================================================
#     # EMAIL
#     # ========================================================

#     def validate_email(
#         self,
#         value
#     ):

#         value = value.strip().lower()

#         queryset = User.objects.filter(
#             email__iexact=value
#         )

#         if self.instance is not None:

#             queryset = queryset.exclude(
#                 pk=self.instance.pk
#             )

#         if queryset.exists():

#             raise serializers.ValidationError(
#                 "Email already exists."
#             )

#         return value

#     # ========================================================
#     # VALIDATION
#     # ========================================================

#     def validate(
#         self,
#         attrs
#     ):

#         instance = self.instance

#         profile = instance.userprofile

#         role = attrs.get(
#             "role",
#             profile.role
#         )

#         department = attrs.get(
#             "department",
#             profile.department
#         )

#         role_name = role.name.lower()

#         # ====================================================
#         # HOD
#         # ====================================================

#         if (
#             role_name == "hod"
#             and department is None
#         ):

#             raise serializers.ValidationError({
#                 "department":
#                     "HOD must have a department."
#             })

#         # ====================================================
#         # STAFF
#         # ====================================================

#         if (
#             role_name == "staff"
#             and department is None
#         ):

#             raise serializers.ValidationError({
#                 "department":
#                     "Staff must have a department."
#             })

#         # ====================================================
#         # STUDENT
#         # ====================================================

#         if role_name == "student":

#             raise serializers.ValidationError({
#                 "role":
#                     "Student role cannot be assigned from this API."
#             })

#         # ====================================================
#         # ADMIN
#         # ====================================================

#         if (
#             role_name == "admin"
#             and department is not None
#         ):

#             raise serializers.ValidationError({
#                 "department":
#                     "Admin should not have a department."
#             })

#         return attrs

#     # ========================================================
#     # UPDATE
#     # ========================================================

#     def update(
#         self,
#         instance,
#         validated_data
#     ):

#         # ====================================================
#         # USER
#         # ====================================================

#         if "username" in validated_data:

#             instance.username = (
#                 validated_data["username"]
#             )

#         if "email" in validated_data:

#             instance.email = (
#                 validated_data["email"]
#             )

#         if "is_active" in validated_data:

#             instance.is_active = (
#                 validated_data["is_active"]
#             )

#         instance.save()

#         # ====================================================
#         # PROFILE
#         # ====================================================

#         profile = instance.userprofile

#         if "role" in validated_data:

#             profile.role = (
#                 validated_data["role"]
#             )

#         if "department" in validated_data:

#             profile.department = (
#                 validated_data["department"]
#             )

#         profile.save()

#         return instance


# # ============================================================
# # PERMISSION
# # ============================================================

# class PermissionSerializer(
#     serializers.ModelSerializer
# ):

#     class Meta:

#         model = Permission

#         fields = [
#             "id",
#             "name",
#             "code",
#         ]

#         read_only_fields = [
#             "id",
#         ]


# # ============================================================
# # ROLE PERMISSION
# # ============================================================

# class RolePermissionSerializer(
#     serializers.ModelSerializer
# ):

#     permission_id = serializers.IntegerField(
#         source="permission.id",
#         read_only=True
#     )

#     permission_name = serializers.CharField(
#         source="permission.name",
#         read_only=True
#     )

#     permission_code = serializers.CharField(
#         source="permission.code",
#         read_only=True
#     )

#     class Meta:

#         model = RolePermission

#         fields = [
#             "id",
#             "permission_id",
#             "permission_name",
#             "permission_code",
#             "can_view",
#             "can_create",
#             "can_edit",
#             "can_delete",
#         ]

#         read_only_fields = [
#             "id",
#             "permission_id",
#             "permission_name",
#             "permission_code",
#         ]


# # ============================================================
# # SIDEBAR MENU
# # ============================================================

# class SidebarMenuSerializer(
#     serializers.ModelSerializer
# ):

#     class Meta:

#         model = SidebarMenu

#         fields = [
#             "id",
#             "name",
#             "path",
#             "icon",
#             "order",
#             "is_active",
#         ]

#         read_only_fields = [
#             "id",
#         ]

#     # ========================================================
#     # NAME VALIDATION
#     # ========================================================

#     def validate_name(
#         self,
#         value
#     ):

#         value = value.strip()

#         if not value:

#             raise serializers.ValidationError(
#                 "Menu name is required."
#             )

#         queryset = SidebarMenu.objects.filter(
#             name__iexact=value
#         )

#         if self.instance is not None:

#             queryset = queryset.exclude(
#                 pk=self.instance.pk
#             )

#         if queryset.exists():

#             raise serializers.ValidationError(
#                 "Sidebar menu already exists."
#             )

#         return value

#     # ========================================================
#     # PATH VALIDATION
#     # ========================================================

#     def validate_path(
#         self,
#         value
#     ):

#         value = value.strip()

#         if not value:

#             raise serializers.ValidationError(
#                 "Menu path is required."
#             )

#         queryset = SidebarMenu.objects.filter(
#             path=value
#         )

#         if self.instance is not None:

#             queryset = queryset.exclude(
#                 pk=self.instance.pk
#             )

#         if queryset.exists():

#             raise serializers.ValidationError(
#                 "Sidebar path already exists."
#             )

#         return value


# # ============================================================
# # ROLE MENU
# # ============================================================

# class RoleMenuSerializer(
#     serializers.ModelSerializer
# ):

#     menu_id = serializers.IntegerField(
#         source="menu.id",
#         read_only=True
#     )

#     menu_name = serializers.CharField(
#         source="menu.name",
#         read_only=True
#     )

#     menu_path = serializers.CharField(
#         source="menu.path",
#         read_only=True
#     )

#     menu_icon = serializers.CharField(
#         source="menu.icon",
#         read_only=True
#     )

#     class Meta:

#         model = RoleMenu

#         fields = [
#             "id",
#             "menu_id",
#             "menu_name",
#             "menu_path",
#             "menu_icon",
#             "is_visible",
#         ]

#         read_only_fields = [
#             "id",
#             "menu_id",
#             "menu_name",
#             "menu_path",
#             "menu_icon",
#         ]


# # ============================================================
# # ROLE MENU UPDATE
# # ============================================================

# class RoleMenuUpdateSerializer(
#     serializers.Serializer
# ):

#     role_id = serializers.IntegerField()

#     menus = serializers.ListField(
#         child=serializers.DictField(),
#         allow_empty=True
#     )

#     # ========================================================
#     # VALIDATE ROLE
#     # ========================================================

#     def validate_role_id(
#         self,
#         value
#     ):

#         if not Role.objects.filter(
#             id=value
#         ).exists():

#             raise serializers.ValidationError(
#                 "Role not found."
#             )

#         return value

#     # ========================================================
#     # VALIDATE MENUS
#     # ========================================================

#     def validate_menus(
#         self,
#         value
#     ):

#         for item in value:

#             if "menu_id" not in item:

#                 raise serializers.ValidationError(
#                     "Each menu must contain menu_id."
#                 )

#             menu_id = item.get(
#                 "menu_id"
#             )

#             if not SidebarMenu.objects.filter(
#                 id=menu_id
#             ).exists():

#                 raise serializers.ValidationError(
#                     f"Sidebar menu {menu_id} does not exist."
#                 )

#             if "is_visible" in item:

#                 if not isinstance(
#                     item["is_visible"],
#                     bool
#                 ):

#                     raise serializers.ValidationError(
#                         "is_visible must be true or false."
#                     )

#         return value


# # ============================================================
# # WEBSITE MENU
# # ============================================================

# class WebsiteMenuSerializer(
#     serializers.ModelSerializer
# ):

#     class Meta:

#         model = WebsiteMenu
#         fields = "__all__"


# # ============================================================
# # HOME PAGE
# # ============================================================

# class HomeStatisticSerializer(
#     serializers.ModelSerializer
# ):

#     class Meta:
#         model = HomeStatistic
#         fields = "__all__"


# class HomeCourseSerializer(
#     serializers.ModelSerializer
# ):

#     class Meta:

#         model = HomeCourse
#         fields = "__all__"

#         extra_kwargs = {
#             "home": {
#                 "required": False
#             }
#         }


# class HomeOfferSerializer(
#     serializers.ModelSerializer
# ):

#     class Meta:
#         model = HomeOffer
#         fields = "__all__"


# class HomeDepartmentSerializer(
#     serializers.ModelSerializer
# ):

#     class Meta:
#         model = HomeDepartment
#         fields = "__all__"


# class HomeWhyChooseSerializer(
#     serializers.ModelSerializer
# ):

#     class Meta:
#         model = HomeWhyChoose
#         fields = "__all__"


# class HomeFacilitySerializer(
#     serializers.ModelSerializer
# ):

#     class Meta:
#         model = HomeFacility
#         fields = "__all__"


# class HomeEventSerializer(
#     serializers.ModelSerializer
# ):

#     class Meta:
#         model = HomeEvent
#         fields = "__all__"


# class HomeNoticeSerializer(
#     serializers.ModelSerializer
# ):

#     class Meta:
#         model = HomeNotice
#         fields = "__all__"


# class HomeGallerySerializer(
#     serializers.ModelSerializer
# ):

#     class Meta:
#         model = HomeGallery
#         fields = "__all__"


# class HomeTestimonialSerializer(
#     serializers.ModelSerializer
# ):

#     class Meta:
#         model = HomeTestimonial
#         fields = "__all__"


# class HomePageSerializer(
#     serializers.ModelSerializer
# ):

#     statistics = HomeStatisticSerializer(
#         many=True,
#         read_only=True
#     )

#     courses = HomeCourseSerializer(
#         many=True,
#         read_only=True
#     )

#     offers = HomeOfferSerializer(
#         many=True,
#         read_only=True
#     )

#     departments = HomeDepartmentSerializer(
#         many=True,
#         read_only=True
#     )

#     why_choose_us = HomeWhyChooseSerializer(
#         many=True,
#         read_only=True
#     )

#     facilities = HomeFacilitySerializer(
#         many=True,
#         read_only=True
#     )

#     events = HomeEventSerializer(
#         many=True,
#         read_only=True
#     )

#     notices = HomeNoticeSerializer(
#         many=True,
#         read_only=True
#     )

#     gallery = HomeGallerySerializer(
#         many=True,
#         read_only=True
#     )

#     testimonials = HomeTestimonialSerializer(
#         many=True,
#         read_only=True
#     )

#     class Meta:

#         model = HomePage

#         fields = [

#             "id",

#             # Hero
#             "hero_small_title",
#             "hero_title",
#             "hero_description",
#             "hero_button_1_text",
#             "hero_button_1_link",
#             "hero_button_2_text",
#             "hero_button_2_link",
#             "hero_image",

#             # About
#             "about_label",
#             "about_title",
#             "about_description_1",
#             "about_description_2",
#             "about_image",

#             # Courses
#             "courses_label",
#             "courses_title",
#             "courses_description",

#             # Admissions
#             "admission_label",
#             "admission_title",
#             "admission_description",
#             "admission_button_text",
#             "admission_button_link",

#             # Offers
#             "offers_label",
#             "offers_title",

#             # Departments
#             "departments_label",
#             "departments_title",

#             # Why Choose Us
#             "why_label",
#             "why_title",

#             # Facilities
#             "facilities_label",
#             "facilities_title",

#             # Events
#             "events_label",
#             "events_title",

#             # Notices
#             "notices_label",
#             "notices_title",

#             # Placements
#             "placement_label",
#             "placement_title",
#             "placement_description",
#             "placement_button_text",
#             "placement_button_link",

#             # Gallery
#             "gallery_label",
#             "gallery_title",

#             # Testimonials
#             "testimonial_label",
#             "testimonial_title",

#             # Contact
#             "contact_label",
#             "contact_title",
#             "contact_description",
#             "contact_address",
#             "contact_phone",
#             "contact_email",

#             # Related data
#             "statistics",
#             "courses",
#             "offers",
#             "departments",
#             "why_choose_us",
#             "facilities",
#             "events",
#             "notices",
#             "gallery",
#             "testimonials",

#             "updated_at",
#         ]


# # ============================================================
# # COURSE PAGE COURSE
# # ============================================================

# class CoursePageCourseSerializer(
#     serializers.ModelSerializer
# ):

#     class Meta:

#         model = CoursePageCourse
#         fields = "__all__"

#         extra_kwargs = {
#             "page": {
#                 "required": False
#             }
#         }


# # ============================================================
# # COURSE PAGE
# # ============================================================

# class CoursePageSerializer(
#     serializers.ModelSerializer
# ):

#     courses = CoursePageCourseSerializer(
#         many=True,
#         read_only=True
#     )

#     class Meta:

#         model = CoursePage
#         fields = "__all__"


# # ============================================================
# # ABOUT VALUE
# # ============================================================

# class AboutValueSerializer(
#     serializers.ModelSerializer
# ):

#     class Meta:

#         model = AboutValue
#         fields = "__all__"

#         extra_kwargs = {
#             "page": {
#                 "required": False
#             }
#         }


# # ============================================================
# # ABOUT FACILITY
# # ============================================================

# class AboutFacilitySerializer(
#     serializers.ModelSerializer
# ):

#     class Meta:

#         model = AboutFacility
#         fields = "__all__"

#         extra_kwargs = {
#             "page": {
#                 "required": False
#             }
#         }


# # ============================================================
# # ABOUT PAGE
# # ============================================================

# class AboutPageSerializer(
#     serializers.ModelSerializer
# ):

#     values = AboutValueSerializer(
#         many=True,
#         read_only=True
#     )

#     facilities = AboutFacilitySerializer(
#         many=True,
#         read_only=True
#     )

#     class Meta:

#         model = AboutPage
#         fields = "__all__"


# # ============================================================
# # WEBSITE DEPARTMENT
# # ============================================================

# class WebsiteDepartmentSerializer(
#     serializers.ModelSerializer
# ):

#     class Meta:

#         model = WebsiteDepartment

#         fields = [
#             "id",
#             "name",
#             "icon",
#             "description",
#             "order",
#             "is_active",
#         ]

#         read_only_fields = [
#             "id",
#         ]









# class WebsiteDepartmentsPageSerializer(
#     serializers.ModelSerializer
# ):

#     class Meta:

#         model = WebsiteDepartmentsPage

#         fields = [
#             "id",

#             "hero_label",
#             "hero_title",
#             "hero_description",

#             "section_label",
#             "section_title",
#             "section_description",

#             "cta_title",
#             "cta_description",
#             "cta_button_text",
#             "cta_button_link",

#             "updated_at",
#         ]

#         read_only_fields = [
#             "id",
#             "updated_at",
#         ]







# class WebsiteAdmissionsPageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = WebsiteAdmissionsPage
#         fields = [
#             "id",
#             "hero_label",
#             "hero_title",
#             "hero_description",
#             "process_label",
#             "process_title",
#             "requirements_label",
#             "requirements_title",
#             "requirements_description",
#             "cta_title",
#             "cta_description",
#             "cta_button_text",
#             "cta_button_link",
#             "updated_at",
#         ]
#         read_only_fields = [
#             "id",
#             "updated_at",
#         ]


# class WebsiteAdmissionStepSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = WebsiteAdmissionStep
#         fields = [
#             "id",
#             "number",
#             "title",
#             "description",
#             "order",
#             "is_active",
#         ]


# class WebsiteAdmissionDocumentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = WebsiteAdmissionDocument
#         fields = [
#             "id",
#             "name",
#             "order",
#             "is_active",
#         ]


# class WebsiteEventsPageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = WebsiteEventsPage
#         fields = [
#             "id",
#             "hero_label",
#             "hero_title",
#             "hero_description",
#             "section_label",
#             "section_title",
#             "updated_at",
#         ]
#         read_only_fields = [
#             "id",
#             "updated_at",
#         ]


# class WebsiteEventSerializer(serializers.ModelSerializer):
#     image = serializers.ImageField(
#         required=False,
#         allow_null=True
#     )

#     class Meta:
#         model = WebsiteEvent
#         fields = [
#             "id",
#             "date",
#             "title",
#             "description",
#             "image",
#             "order",
#             "is_active",
#         ]


# class WebsiteGalleryPageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = WebsiteGalleryPage
#         fields = [
#             "id",
#             "hero_label",
#             "hero_title",
#             "hero_description",
#             "section_label",
#             "section_title",
#             "updated_at",
#         ]
#         read_only_fields = [
#             "id",
#             "updated_at",
#         ]


# class WebsiteGalleryItemSerializer(serializers.ModelSerializer):
#     image = serializers.ImageField()

#     class Meta:
#         model = WebsiteGalleryItem
#         fields = [
#             "id",
#             "title",
#             "image",
#             "order",
#             "is_active",
#         ]


# class WebsiteContactPageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = WebsiteContactPage
#         fields = [
#             "id",
#             "hero_label",
#             "hero_title",
#             "hero_description",
#             "section_label",
#             "section_title",
#             "section_description",
#             "address",
#             "phone",
#             "email",
#             "form_title",
#             "updated_at",
#         ]
#         read_only_fields = [
#             "id",
#             "updated_at",
#         ]


# class WebsiteContactMessageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = WebsiteContactMessage
#         fields = [
#             "id",
#             "name",
#             "email",
#             "phone",
#             "message",
#             "is_read",
#             "created_at",
#         ]
#         read_only_fields = [
#             "id",
#             "created_at",
#             "is_read",
#         ]


from django.contrib.auth.models import User

from rest_framework import serializers

from .models import (
    Role,
    UserProfile,
    StaffAssignment,
    Permission,
    RolePermission,
    SidebarMenu,
    RoleMenu,

    WebsiteSettings,
    WebsiteMenu,

    HomePage,
    HomeStatistic,
    HomeCourse,
    HomeOffer,
    HomeDepartment,
    HomeWhyChoose,
    HomeFacility,
    HomeEvent,
    HomeNotice,
    HomeGallery,
    HomeTestimonial,

    CoursePage,
    CoursePageCourse,
    CourseApplication,

    AboutPage,
    AboutValue,
    AboutFacility,

    # ========================================================
    # PUBLIC WEBSITE - DEPARTMENTS
    # ========================================================

    WebsiteDepartment,
    WebsiteDepartmentsPage,

    # ========================================================
    # PUBLIC WEBSITE - ADMISSIONS
    # ========================================================

    WebsiteAdmissionsPage,
    WebsiteAdmissionStep,
    WebsiteAdmissionDocument,

    # ========================================================
    # PUBLIC WEBSITE - EVENTS
    # ========================================================

    WebsiteEventsPage,
    WebsiteEvent,

    # ========================================================
    # PUBLIC WEBSITE - GALLERY
    # ========================================================

    WebsiteGalleryPage,
    WebsiteGalleryItem,

    # ========================================================
    # PUBLIC WEBSITE - CONTACT
    # ========================================================

    WebsiteContactPage,
    WebsiteContactMessage,
    WebsiteNoticesPage,
    WebsiteNotice,
    WebsitePlacementsPage,
    WebsitePlacementFeature,
)

from academics.models import (
    Department,
    Subject,
)


# ============================================================
# WEBSITE SETTINGS
# ============================================================

class WebsiteSettingsSerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = WebsiteSettings
        fields = "__all__"


# ============================================================
# LOGIN
# ============================================================

class LoginSerializer(
    serializers.Serializer
):

    username = serializers.CharField(
        max_length=150
    )

    password = serializers.CharField(
        write_only=True,
        style={
            "input_type": "password"
        }
    )


# ============================================================
# STAFF ASSIGNMENT DISPLAY
# ============================================================

class StaffAssignmentSerializer(
    serializers.ModelSerializer
):

    staff_name = serializers.CharField(
        source="staff.username",
        read_only=True
    )

    subject_name = serializers.CharField(
        source="subject.name",
        read_only=True
    )

    subject_code = serializers.CharField(
        source="subject.code",
        read_only=True
    )

    course_name = serializers.CharField(
        source="subject.course.name",
        read_only=True
    )

    department_name = serializers.CharField(
        source="subject.department.name",
        read_only=True
    )

    class Meta:
        model = StaffAssignment

        fields = [
            "id",
            "staff",
            "staff_name",
            "subject",
            "subject_name",
            "subject_code",
            "course_name",
            "department_name",
            "assigned_at",
        ]

        read_only_fields = [
            "id",
            "assigned_at",
            "staff_name",
            "subject_name",
            "subject_code",
            "course_name",
            "department_name",
        ]


# ============================================================
# STAFF LIST DISPLAY
# ============================================================

class StaffSerializer(
    serializers.ModelSerializer
):

    role = serializers.CharField(
        source="userprofile.role.name",
        read_only=True
    )

    department = serializers.CharField(
        source="userprofile.department.name",
        read_only=True,
        allow_null=True
    )

    department_id = serializers.IntegerField(
        source="userprofile.department.id",
        read_only=True,
        allow_null=True
    )

    class Meta:
        model = User

        fields = [
            "id",
            "username",
            "email",
            "role",
            "department",
            "department_id",
            "is_active",
        ]

        read_only_fields = [
            "id",
            "username",
            "email",
            "role",
            "department",
            "department_id",
            "is_active",
        ]


# ============================================================
# HOD ASSIGN / UPDATE SUBJECT TO STAFF
# ============================================================

class StaffAssignmentCreateSerializer(
    serializers.Serializer
):

    staff = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        required=False
    )

    subject = serializers.PrimaryKeyRelatedField(
        queryset=Subject.objects.all(),
        required=False
    )

    def validate(self, attrs):

        request = self.context.get("request")

        if request is None:
            raise serializers.ValidationError({
                "request":
                    "Request context is required."
            })

        # ====================================================
        # HOD PROFILE
        # ====================================================

        try:
            hod_profile = request.user.userprofile

        except UserProfile.DoesNotExist:
            raise serializers.ValidationError({
                "user":
                    "HOD profile does not exist."
            })

        # ====================================================
        # HOD ROLE
        # ====================================================

        if hod_profile.role.name.lower() != "hod":
            raise serializers.ValidationError({
                "user":
                    "Only HOD can assign subjects."
            })

        # ====================================================
        # HOD DEPARTMENT
        # ====================================================

        hod_department = hod_profile.department

        if hod_department is None:
            raise serializers.ValidationError({
                "department":
                    "HOD is not assigned to a department."
            })

        # ====================================================
        # CREATE / UPDATE VALUES
        # ====================================================

        if self.instance is not None:

            staff = attrs.get(
                "staff",
                self.instance.staff
            )

            subject = attrs.get(
                "subject",
                self.instance.subject
            )

        else:

            staff = attrs.get("staff")
            subject = attrs.get("subject")

            if staff is None:
                raise serializers.ValidationError({
                    "staff":
                        "Staff is required."
                })

            if subject is None:
                raise serializers.ValidationError({
                    "subject":
                        "Subject is required."
                })

        # ====================================================
        # STAFF PROFILE
        # ====================================================

        try:
            staff_profile = staff.userprofile

        except UserProfile.DoesNotExist:
            raise serializers.ValidationError({
                "staff":
                    "Selected staff profile does not exist."
            })

        # ====================================================
        # STAFF ROLE
        # ====================================================

        if staff_profile.role.name.lower() != "staff":
            raise serializers.ValidationError({
                "staff":
                    "Only Staff users can receive subjects."
            })

        # ====================================================
        # STAFF DEPARTMENT
        # ====================================================

        if staff_profile.department_id != hod_department.id:
            raise serializers.ValidationError({
                "staff":
                    "Staff must belong to your department."
            })

        # ====================================================
        # SUBJECT DEPARTMENT
        # ====================================================

        if subject.department_id != hod_department.id:
            raise serializers.ValidationError({
                "subject":
                    "Subject must belong to your department."
            })

        # ====================================================
        # DUPLICATE CHECK
        # ====================================================

        duplicate_query = StaffAssignment.objects.filter(
            staff=staff,
            subject=subject
        )

        if self.instance is None:

            if duplicate_query.exists():
                raise serializers.ValidationError({
                    "subject":
                        "This subject is already assigned to this staff."
                })

        else:

            if (
                duplicate_query
                .exclude(id=self.instance.id)
                .exists()
            ):
                raise serializers.ValidationError({
                    "subject":
                        "This subject is already assigned to this staff."
                })

        return attrs

    # ========================================================
    # CREATE
    # ========================================================

    def create(self, validated_data):

        return StaffAssignment.objects.create(
            **validated_data
        )

    # ========================================================
    # UPDATE
    # ========================================================

    def update(
        self,
        instance,
        validated_data
    ):

        if "staff" in validated_data:
            instance.staff = validated_data["staff"]

        if "subject" in validated_data:
            instance.subject = validated_data["subject"]

        instance.save()

        return instance


# ============================================================
# ADMIN CREATE STAFF
# ============================================================

class StaffCreateSerializer(
    serializers.Serializer
):

    username = serializers.CharField(
        max_length=150
    )

    email = serializers.EmailField()

    password = serializers.CharField(
        write_only=True,
        min_length=6,
        style={
            "input_type": "password"
        }
    )

    department = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all()
    )

    def validate_username(self, value):

        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Username is required."
            )

        if User.objects.filter(
            username__iexact=value
        ).exists():

            raise serializers.ValidationError(
                "Username already exists."
            )

        return value

    def validate_email(self, value):

        value = value.strip().lower()

        if User.objects.filter(
            email__iexact=value
        ).exists():

            raise serializers.ValidationError(
                "Email already exists."
            )

        return value

    def create(self, validated_data):

        username = validated_data["username"]
        email = validated_data["email"]
        password = validated_data["password"]
        department = validated_data["department"]

        # ====================================================
        # STAFF ROLE
        # ====================================================

        try:

            role = Role.objects.get(
                name__iexact="Staff"
            )

        except Role.DoesNotExist:

            raise serializers.ValidationError({
                "role":
                    "Staff role does not exist."
            })

        # ====================================================
        # USER
        # ====================================================

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        # ====================================================
        # PROFILE
        # ====================================================

        UserProfile.objects.create(
            user=user,
            role=role,
            department=department
        )

        return user

    def to_representation(self, instance):

        profile = instance.userprofile

        return {
            "id": instance.id,
            "username": instance.username,
            "email": instance.email,
            "role": profile.role.name,
            "department": (
                profile.department.name
                if profile.department
                else None
            ),
            "department_id": (
                profile.department.id
                if profile.department
                else None
            ),
            "is_active": instance.is_active,
        }


# ============================================================
# ADMIN CREATE USER
# ============================================================

class AdminUserCreateSerializer(
    serializers.Serializer
):

    username = serializers.CharField(
        max_length=150
    )

    email = serializers.EmailField()

    password = serializers.CharField(
        write_only=True,
        min_length=6,
        style={
            "input_type": "password"
        }
    )

    role = serializers.PrimaryKeyRelatedField(
        queryset=Role.objects.all()
    )

    department = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all(),
        required=False,
        allow_null=True
    )

    def validate_username(self, value):

        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Username is required."
            )

        if User.objects.filter(
            username__iexact=value
        ).exists():

            raise serializers.ValidationError(
                "Username already exists."
            )

        return value

    def validate_email(self, value):

        value = value.strip().lower()

        if User.objects.filter(
            email__iexact=value
        ).exists():

            raise serializers.ValidationError(
                "Email already exists."
            )

        return value

    def validate(self, attrs):

        role = attrs["role"]

        department = attrs.get("department")

        role_name = role.name.lower()

        # HOD
        if role_name == "hod" and department is None:
            raise serializers.ValidationError({
                "department":
                    "HOD must have a department."
            })

        # STAFF
        if role_name == "staff" and department is None:
            raise serializers.ValidationError({
                "department":
                    "Staff must have a department."
            })

        # STUDENT
        if role_name == "student":
            raise serializers.ValidationError({
                "role":
                    "Student must be created using the student creation API."
            })

        # ADMIN
        if role_name == "admin" and department is not None:
            raise serializers.ValidationError({
                "department":
                    "Admin should not have a department."
            })

        return attrs

    def create(self, validated_data):

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )

        UserProfile.objects.create(
            user=user,
            role=validated_data["role"],
            department=validated_data.get("department")
        )

        return user

    def to_representation(self, instance):

        profile = instance.userprofile

        return {
            "id": instance.id,
            "username": instance.username,
            "email": instance.email,
            "role": profile.role.id,
            "role_name": profile.role.name,
            "department": (
                profile.department.id
                if profile.department
                else None
            ),
            "department_name": (
                profile.department.name
                if profile.department
                else None
            ),
            "is_active": instance.is_active,
        }


# ============================================================
# ROLE
# ============================================================

class RoleSerializer(
    serializers.ModelSerializer
):

    user_count = serializers.IntegerField(
        read_only=True
    )

    class Meta:

        model = Role

        fields = [
            "id",
            "name",
            "user_count",
        ]

        read_only_fields = [
            "id",
            "user_count",
        ]

    def validate_name(self, value):

        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Role name is required."
            )

        queryset = Role.objects.filter(
            name__iexact=value
        )

        if self.instance is not None:
            queryset = queryset.exclude(
                pk=self.instance.pk
            )

        if queryset.exists():
            raise serializers.ValidationError(
                "Role already exists."
            )

        return value


# ============================================================
# ADMIN USER LIST
# ============================================================

class AdminUserListSerializer(
    serializers.ModelSerializer
):

    role = serializers.CharField(
        source="userprofile.role.name",
        read_only=True
    )

    role_id = serializers.IntegerField(
        source="userprofile.role.id",
        read_only=True
    )

    department = serializers.CharField(
        source="userprofile.department.name",
        read_only=True,
        allow_null=True
    )

    department_id = serializers.IntegerField(
        source="userprofile.department.id",
        read_only=True,
        allow_null=True
    )

    class Meta:

        model = User

        fields = [
            "id",
            "username",
            "email",
            "role",
            "role_id",
            "department",
            "department_id",
            "is_active",
        ]


# ============================================================
# ADMIN USER UPDATE
# ============================================================

class AdminUserUpdateSerializer(
    serializers.Serializer
):

    username = serializers.CharField(
        max_length=150,
        required=False
    )

    email = serializers.EmailField(
        required=False
    )

    role = serializers.PrimaryKeyRelatedField(
        queryset=Role.objects.all(),
        required=False
    )

    department = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all(),
        required=False,
        allow_null=True
    )

    is_active = serializers.BooleanField(
        required=False
    )

    def validate_username(self, value):

        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Username is required."
            )

        queryset = User.objects.filter(
            username__iexact=value
        )

        if self.instance is not None:
            queryset = queryset.exclude(
                pk=self.instance.pk
            )

        if queryset.exists():
            raise serializers.ValidationError(
                "Username already exists."
            )

        return value

    def validate_email(self, value):

        value = value.strip().lower()

        queryset = User.objects.filter(
            email__iexact=value
        )

        if self.instance is not None:
            queryset = queryset.exclude(
                pk=self.instance.pk
            )

        if queryset.exists():
            raise serializers.ValidationError(
                "Email already exists."
            )

        return value

    def validate(self, attrs):

        instance = self.instance

        profile = instance.userprofile

        role = attrs.get(
            "role",
            profile.role
        )

        department = attrs.get(
            "department",
            profile.department
        )

        role_name = role.name.lower()

        if role_name == "hod" and department is None:
            raise serializers.ValidationError({
                "department":
                    "HOD must have a department."
            })

        if role_name == "staff" and department is None:
            raise serializers.ValidationError({
                "department":
                    "Staff must have a department."
            })

        if role_name == "student":
            raise serializers.ValidationError({
                "role":
                    "Student role cannot be assigned from this API."
            })

        if role_name == "admin" and department is not None:
            raise serializers.ValidationError({
                "department":
                    "Admin should not have a department."
            })

        return attrs

    def update(
        self,
        instance,
        validated_data
    ):

        if "username" in validated_data:
            instance.username = validated_data["username"]

        if "email" in validated_data:
            instance.email = validated_data["email"]

        if "is_active" in validated_data:
            instance.is_active = validated_data["is_active"]

        instance.save()

        profile = instance.userprofile

        if "role" in validated_data:
            profile.role = validated_data["role"]

        if "department" in validated_data:
            profile.department = validated_data["department"]

        profile.save()

        return instance


# ============================================================
# PERMISSION
# ============================================================

class PermissionSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = Permission

        fields = [
            "id",
            "name",
            "code",
        ]

        read_only_fields = [
            "id",
        ]


# ============================================================
# ROLE PERMISSION
# ============================================================

class RolePermissionSerializer(
    serializers.ModelSerializer
):

    permission_id = serializers.IntegerField(
        source="permission.id",
        read_only=True
    )

    permission_name = serializers.CharField(
        source="permission.name",
        read_only=True
    )

    permission_code = serializers.CharField(
        source="permission.code",
        read_only=True
    )

    class Meta:

        model = RolePermission

        fields = [
            "id",
            "permission_id",
            "permission_name",
            "permission_code",
            "can_view",
            "can_create",
            "can_edit",
            "can_delete",
        ]

        read_only_fields = [
            "id",
            "permission_id",
            "permission_name",
            "permission_code",
        ]


# ============================================================
# SIDEBAR MENU
# ============================================================

class SidebarMenuSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = SidebarMenu

        fields = [
            "id",
            "name",
            "path",
            "icon",
            "order",
            "is_active",
        ]

        read_only_fields = [
            "id",
        ]

    def validate_name(self, value):

        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Menu name is required."
            )

        queryset = SidebarMenu.objects.filter(
            name__iexact=value
        )

        if self.instance is not None:
            queryset = queryset.exclude(
                pk=self.instance.pk
            )

        if queryset.exists():
            raise serializers.ValidationError(
                "Sidebar menu already exists."
            )

        return value

    def validate_path(self, value):

        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Menu path is required."
            )

        queryset = SidebarMenu.objects.filter(
            path=value
        )

        if self.instance is not None:
            queryset = queryset.exclude(
                pk=self.instance.pk
            )

        if queryset.exists():
            raise serializers.ValidationError(
                "Sidebar path already exists."
            )

        return value


# ============================================================
# ROLE MENU
# ============================================================

class RoleMenuSerializer(
    serializers.ModelSerializer
):

    menu_id = serializers.IntegerField(
        source="menu.id",
        read_only=True
    )

    menu_name = serializers.CharField(
        source="menu.name",
        read_only=True
    )

    menu_path = serializers.CharField(
        source="menu.path",
        read_only=True
    )

    menu_icon = serializers.CharField(
        source="menu.icon",
        read_only=True
    )

    class Meta:

        model = RoleMenu

        fields = [
            "id",
            "menu_id",
            "menu_name",
            "menu_path",
            "menu_icon",
            "is_visible",
        ]

        read_only_fields = [
            "id",
            "menu_id",
            "menu_name",
            "menu_path",
            "menu_icon",
        ]


# ============================================================
# ROLE MENU UPDATE
# ============================================================

class RoleMenuUpdateSerializer(
    serializers.Serializer
):

    role_id = serializers.IntegerField()

    menus = serializers.ListField(
        child=serializers.DictField(),
        allow_empty=True
    )

    def validate_role_id(self, value):

        if not Role.objects.filter(
            id=value
        ).exists():

            raise serializers.ValidationError(
                "Role not found."
            )

        return value

    def validate_menus(self, value):

        for item in value:

            if "menu_id" not in item:
                raise serializers.ValidationError(
                    "Each menu must contain menu_id."
                )

            menu_id = item.get("menu_id")

            if not SidebarMenu.objects.filter(
                id=menu_id
            ).exists():

                raise serializers.ValidationError(
                    f"Sidebar menu {menu_id} does not exist."
                )

            if "is_visible" in item:

                if not isinstance(
                    item["is_visible"],
                    bool
                ):

                    raise serializers.ValidationError(
                        "is_visible must be true or false."
                    )

        return value


# ============================================================
# WEBSITE MENU
# ============================================================

class WebsiteMenuSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = WebsiteMenu
        fields = "__all__"


# ============================================================
# HOME PAGE
# ============================================================

class HomeStatisticSerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = HomeStatistic
        fields = "__all__"


class HomeCourseSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = HomeCourse
        fields = "__all__"

        extra_kwargs = {
            "home": {
                "required": False
            }
        }


class HomeOfferSerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = HomeOffer
        fields = "__all__"


class HomeDepartmentSerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = HomeDepartment
        fields = "__all__"


class HomeWhyChooseSerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = HomeWhyChoose
        fields = "__all__"


class HomeFacilitySerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = HomeFacility
        fields = "__all__"


class HomeEventSerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = HomeEvent
        fields = "__all__"


class HomeNoticeSerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = HomeNotice
        fields = "__all__"


class HomeGallerySerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = HomeGallery
        fields = "__all__"


class HomeTestimonialSerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = HomeTestimonial
        fields = "__all__"


class HomePageSerializer(
    serializers.ModelSerializer
):

    statistics = HomeStatisticSerializer(
        many=True,
        read_only=True
    )

    courses = HomeCourseSerializer(
        many=True,
        read_only=True
    )

    offers = HomeOfferSerializer(
        many=True,
        read_only=True
    )

    departments = HomeDepartmentSerializer(
        many=True,
        read_only=True
    )

    why_choose_us = HomeWhyChooseSerializer(
        many=True,
        read_only=True
    )

    facilities = HomeFacilitySerializer(
        many=True,
        read_only=True
    )

    events = HomeEventSerializer(
        many=True,
        read_only=True
    )

    notices = HomeNoticeSerializer(
        many=True,
        read_only=True
    )

    gallery = HomeGallerySerializer(
        many=True,
        read_only=True
    )

    testimonials = HomeTestimonialSerializer(
        many=True,
        read_only=True
    )

    class Meta:

        model = HomePage

        fields = [
            "id",

            # Hero
            "hero_small_title",
            "hero_title",
            "hero_description",
            "hero_button_1_text",
            "hero_button_1_link",
            "hero_button_2_text",
            "hero_button_2_link",
            "hero_image",

            # About
            "about_label",
            "about_title",
            "about_description_1",
            "about_description_2",
            "about_image",

            # Courses
            "courses_label",
            "courses_title",
            "courses_description",

            # Admissions
            "admission_label",
            "admission_title",
            "admission_description",
            "admission_button_text",
            "admission_button_link",

            # Offers
            "offers_label",
            "offers_title",

            # Departments
            "departments_label",
            "departments_title",

            # Why Choose Us
            "why_label",
            "why_title",

            # Facilities
            "facilities_label",
            "facilities_title",

            # Events
            "events_label",
            "events_title",

            # Notices
            "notices_label",
            "notices_title",

            # Placements
            "placement_label",
            "placement_title",
            "placement_description",
            "placement_button_text",
            "placement_button_link",

            # Gallery
            "gallery_label",
            "gallery_title",

            # Testimonials
            "testimonial_label",
            "testimonial_title",

            # Contact
            "contact_label",
            "contact_title",
            "contact_description",
            "contact_address",
            "contact_phone",
            "contact_email",

            # Related data
            "statistics",
            "courses",
            "offers",
            "departments",
            "why_choose_us",
            "facilities",
            "events",
            "notices",
            "gallery",
            "testimonials",

            "updated_at",
        ]


# ============================================================
# COURSE PAGE COURSE
# ============================================================

class CoursePageCourseSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = CoursePageCourse
        fields = "__all__"

        extra_kwargs = {
            "page": {
                "required": False
            }
        }


# ============================================================
# COURSE PAGE
# ============================================================

class CoursePageSerializer(
    serializers.ModelSerializer
):

    courses = CoursePageCourseSerializer(
        many=True,
        read_only=True
    )

    class Meta:

        model = CoursePage
        fields = "__all__"


# ============================================================
# ABOUT VALUE
# ============================================================

class AboutValueSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = AboutValue
        fields = "__all__"

        extra_kwargs = {
            "page": {
                "required": False
            }
        }


# ============================================================
# ABOUT FACILITY
# ============================================================

class AboutFacilitySerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = AboutFacility
        fields = "__all__"

        extra_kwargs = {
            "page": {
                "required": False
            }
        }


# ============================================================
# ABOUT PAGE
# ============================================================

class AboutPageSerializer(
    serializers.ModelSerializer
):

    values = AboutValueSerializer(
        many=True,
        read_only=True
    )

    facilities = AboutFacilitySerializer(
        many=True,
        read_only=True
    )

    class Meta:

        model = AboutPage
        fields = "__all__"


# ============================================================
# WEBSITE DEPARTMENT
# ============================================================

class WebsiteDepartmentSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = WebsiteDepartment

        fields = [
            "id",
            "name",
            "icon",
            "description",
            "order",
            "is_active",
        ]

        read_only_fields = [
            "id",
        ]


# ============================================================
# WEBSITE DEPARTMENTS PAGE
# ============================================================

class WebsiteDepartmentsPageSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = WebsiteDepartmentsPage

        fields = [
            "id",

            "hero_label",
            "hero_title",
            "hero_description",

            "section_label",
            "section_title",
            "section_description",

            "cta_title",
            "cta_description",
            "cta_button_text",
            "cta_button_link",

            "updated_at",
        ]

        read_only_fields = [
            "id",
            "updated_at",
        ]


# ============================================================
# WEBSITE ADMISSIONS PAGE
# ============================================================

class WebsiteAdmissionsPageSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = WebsiteAdmissionsPage

        fields = [
            "id",

            "hero_label",
            "hero_title",
            "hero_description",

            "process_label",
            "process_title",

            "requirements_label",
            "requirements_title",
            "requirements_description",

            "cta_title",
            "cta_description",
            "cta_button_text",
            "cta_button_link",

            "updated_at",
        ]

        read_only_fields = [
            "id",
            "updated_at",
        ]


# ============================================================
# WEBSITE ADMISSION STEP
# ============================================================

class WebsiteAdmissionStepSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = WebsiteAdmissionStep

        fields = [
            "id",
            "number",
            "title",
            "description",
            "order",
            "is_active",
        ]

        read_only_fields = [
            "id",
        ]


# ============================================================
# WEBSITE ADMISSION DOCUMENT
# ============================================================

class WebsiteAdmissionDocumentSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = WebsiteAdmissionDocument

        fields = [
            "id",
            "name",
            "order",
            "is_active",
        ]

        read_only_fields = [
            "id",
        ]


# ============================================================
# WEBSITE EVENTS PAGE
# ============================================================

class WebsiteEventsPageSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = WebsiteEventsPage

        fields = [
            "id",
            "hero_label",
            "hero_title",
            "hero_description",
            "section_label",
            "section_title",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "updated_at",
        ]


# ============================================================
# WEBSITE EVENT
# ============================================================

class WebsiteEventSerializer(
    serializers.ModelSerializer
):

    image = serializers.ImageField(
        required=False,
        allow_null=True
    )

    class Meta:

        model = WebsiteEvent

        fields = [
            "id",
            "date",
            "title",
            "description",
            "image",
            "order",
            "is_active",
        ]

        read_only_fields = [
            "id",
        ]


# ============================================================
# WEBSITE GALLERY PAGE
# ============================================================

class WebsiteGalleryPageSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = WebsiteGalleryPage

        fields = [
            "id",
            "hero_label",
            "hero_title",
            "hero_description",
            "section_label",
            "section_title",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "updated_at",
        ]


# ============================================================
# WEBSITE GALLERY ITEM
# ============================================================

class WebsiteGalleryItemSerializer(
    serializers.ModelSerializer
):

    image = serializers.ImageField()

    class Meta:

        model = WebsiteGalleryItem

        fields = [
            "id",
            "title",
            "image",
            "order",
            "is_active",
        ]

        read_only_fields = [
            "id",
        ]


# ============================================================
# WEBSITE CONTACT PAGE
# ============================================================

class WebsiteContactPageSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = WebsiteContactPage

        fields = [
            "id",
            "hero_label",
            "hero_title",
            "hero_description",

            "section_label",
            "section_title",
            "section_description",

            "address",
            "phone",
            "email",

            "form_title",

            "updated_at",
        ]

        read_only_fields = [
            "id",
            "updated_at",
        ]


# ============================================================
# WEBSITE CONTACT MESSAGE
# ============================================================

class WebsiteContactMessageSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = WebsiteContactMessage

        fields = [
            "id",
            "name",
            "email",
            "phone",
            "message",
            "is_read",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
            "is_read",
        ]






# ============================================================
# WEBSITE NOTICES SERIALIZERS
# ============================================================

class WebsiteNoticesPageSerializer(serializers.ModelSerializer):

    class Meta:
        model = WebsiteNoticesPage

        fields = [
            "id",
            "hero_label",
            "hero_title",
            "hero_description",
            "section_label",
            "section_title",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "updated_at",
        ]


class WebsiteNoticeSerializer(serializers.ModelSerializer):

    class Meta:
        model = WebsiteNotice

        fields = [
            "id",
            "date",
            "category",
            "title",
            "description",
            "order",
            "is_active",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
        ]











# ============================================================
# WEBSITE PLACEMENTS SERIALIZERS
# ============================================================

class WebsitePlacementsPageSerializer(serializers.ModelSerializer):

    class Meta:
        model = WebsitePlacementsPage

        fields = [
            "id",
            "hero_label",
            "hero_title",
            "hero_description",

            "intro_label",
            "intro_title",
            "intro_description_1",
            "intro_description_2",
            "intro_image",

            "feature_label",
            "feature_title",

            "cta_title",
            "cta_description",
            "cta_button_text",
            "cta_button_link",

            "updated_at",
        ]

        read_only_fields = [
            "id",
            "updated_at",
        ]


class WebsitePlacementFeatureSerializer(serializers.ModelSerializer):

    class Meta:
        model = WebsitePlacementFeature

        fields = [
            "id",
            "icon",
            "title",
            "description",
            "order",
            "is_active",
        ]


class CourseApplicationSerializer(serializers.ModelSerializer):

    course_name = serializers.CharField(
        source="course.name",
        read_only=True
    )

    class Meta:
        model = CourseApplication

        fields = [
            "id",
            "course",
            "course_name",
            "applicant_name",
            "email",
            "address",
            "status",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "course_name",
            "status",
            "created_at",
        ]


# ============================================================
# ADMIN COURSE APPLICATION STATUS
# ============================================================

class AdminCourseApplicationStatusSerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = CourseApplication

        fields = [
            "id",
            "status",
        ]

        read_only_fields = [
            "id",
        ]

    def validate_status(self, value):

        allowed_statuses = [
            "Pending",
            "Approved",
            "Rejected",
        ]

        if value not in allowed_statuses:

            raise serializers.ValidationError(
                "Status must be Pending, Approved or Rejected."
            )

        return value











# ============================================================
# ADMIN COURSE APPLICATION STATUS
# ============================================================

class AdminCourseApplicationStatusSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = CourseApplication

        fields = [
            "status",
        ]

    def validate_status(self, value):

        allowed_statuses = [
            "Pending",
            "Contacted",
            "Rejected",
        ]

        if value not in allowed_statuses:

            raise serializers.ValidationError(
                "Invalid application status."
            )

        return value