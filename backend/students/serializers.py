from datetime import datetime

from django.contrib.auth.models import User
from django.db import transaction

from rest_framework import serializers

from accounts.models import Role, UserProfile

from academics.models import Course, Department

from .models import Student


# ============================================================
# STUDENT SERIALIZER
# ============================================================

class StudentSerializer(
    serializers.ModelSerializer
):

    current_year = serializers.SerializerMethodField()

    course_name = serializers.CharField(
        source="course.name",
        read_only=True
    )

    department_name = serializers.CharField(
        source="department.name",
        read_only=True
    )

    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    class Meta:

        model = Student

        fields = [
            "id",
            "user",
            "username",
            "name",
            "email",
            "phone",
            "roll_number",
            "is_existing_student",
            "course",
            "course_name",
            "department",
            "department_name",
            "admission_year",
            "current_year",
        ]

        read_only_fields = [
            "id",
            "user",
            "username",
            "course_name",
            "roll_number",
            "department_name",
            "current_year",
        ]

    # ========================================================
    # CURRENT YEAR
    # ========================================================

    def get_current_year(self, obj):

        return obj.get_current_year()

    # ========================================================
    # VALIDATION
    # ========================================================

    def validate(self, attrs):

        course = attrs.get(
            "course",
            self.instance.course
            if self.instance
            else None
        )

        department = attrs.get(
            "department",
            self.instance.department
            if self.instance
            else None
        )

        admission_year = attrs.get(
            "admission_year",
            self.instance.admission_year
            if self.instance
            else None
        )

        # ----------------------------------------------------
        # COURSE REQUIRED
        # ----------------------------------------------------

        if course is None:

            raise serializers.ValidationError({
                "course":
                "Course is required."
            })

        # ----------------------------------------------------
        # DEPARTMENT REQUIRED
        # ----------------------------------------------------

        if department is None:

            raise serializers.ValidationError({
                "department":
                "Department is required."
            })

        # ----------------------------------------------------
        # ADMISSION YEAR REQUIRED
        # ----------------------------------------------------

        if admission_year is None:

            raise serializers.ValidationError({
                "admission_year":
                "Admission year is required."
            })

        # ----------------------------------------------------
        # FUTURE YEAR CHECK
        # ----------------------------------------------------

        current_year = datetime.now().year

        if admission_year > current_year:

            raise serializers.ValidationError({
                "admission_year":
                "Admission year cannot be a future year."
            })

        # ----------------------------------------------------
        # COURSE DURATION CHECK
        # ----------------------------------------------------

        calculated_year = (
            current_year
            - admission_year
            + 1
        )

        if calculated_year < 1:

            calculated_year = 1

        if calculated_year > course.duration:

            calculated_year = course.duration

        return attrs


# ============================================================
# STUDENT CREATE SERIALIZER
# ============================================================

class StudentCreateSerializer(
    serializers.ModelSerializer
):

    username = serializers.CharField(
        write_only=True
    )

    password = serializers.CharField(
        write_only=True,
        min_length=6
    )

    class Meta:

        model = Student

        fields = [
            "name",
            "email",
            "phone",
            "username",
            "password",
            "is_existing_student",
            "course",
            "department",
            "admission_year",
        ]

    # ========================================================
    # USERNAME VALIDATION
    # ========================================================

    def validate_username(self, value):

        if User.objects.filter(
            username=value
        ).exists():

            raise serializers.ValidationError(
                "Username already exists."
            )

        return value

    # ========================================================
    # EMAIL VALIDATION
    # ========================================================

    def validate_email(self, value):

        if User.objects.filter(
            email=value
        ).exists():

            raise serializers.ValidationError(
                "User with this email already exists."
            )

        if Student.objects.filter(
            email=value
        ).exists():

            raise serializers.ValidationError(
                "Student with this email already exists."
            )

        return value

    # ========================================================
    # VALIDATION
    # ========================================================

    def validate(self, attrs):

        course = attrs.get(
            "course"
        )

        department = attrs.get(
            "department"
        )

        admission_year = attrs.get(
            "admission_year"
        )

        # ----------------------------------------------------
        # COURSE CHECK
        # ----------------------------------------------------

        if not course:

            raise serializers.ValidationError({
                "course":
                "Course is required."
            })

        # ----------------------------------------------------
        # DEPARTMENT CHECK
        # ----------------------------------------------------

        if not department:

            raise serializers.ValidationError({
                "department":
                "Department is required."
            })

        # ----------------------------------------------------
        # ADMISSION YEAR CHECK
        # ----------------------------------------------------

        current_year = datetime.now().year

        if admission_year > current_year:

            raise serializers.ValidationError({
                "admission_year":
                "Admission year cannot be a future year."
            })

        # ----------------------------------------------------
        # CURRENT YEAR CALCULATION
        # ----------------------------------------------------

        calculated_year = (
            current_year
            - admission_year
            + 1
        )

        if calculated_year < 1:

            calculated_year = 1

        if calculated_year > course.duration:

            calculated_year = course.duration

        return attrs

    # ========================================================
    # GENERATE ROLL NUMBER
    # ========================================================

    def generate_roll_number(
        self,
        admission_year,
        course,
        department
    ):

        prefix = (
            f"{admission_year}"
            f"{course.code}"
            f"{department.code}"
        )

        # ----------------------------------------------------
        # FIND LAST STUDENT
        # ----------------------------------------------------

        last_student = (
            Student.objects
            .filter(
                admission_year=admission_year,
                course=course,
                department=department,
                roll_number__startswith=prefix
            )
            .order_by("-roll_number")
            .first()
        )

        # ----------------------------------------------------
        # NEXT NUMBER
        # ----------------------------------------------------

        if (
            last_student
            and last_student.roll_number
        ):

            last_number = int(
                last_student.roll_number[
                    len(prefix):
                ]
            )

            next_number = (
                last_number + 1
            )

        else:

            next_number = 1

        # ----------------------------------------------------
        # FINAL ROLL NUMBER
        # ----------------------------------------------------

        return (
            f"{prefix}"
            f"{next_number:03d}"
        )

    # ========================================================
    # CREATE STUDENT + USER
    # ========================================================

    @transaction.atomic
    def create(
        self,
        validated_data
    ):

        # ----------------------------------------------------
        # GET USER DATA
        # ----------------------------------------------------

        username = validated_data.pop(
            "username"
        )

        password = validated_data.pop(
            "password"
        )

        # ----------------------------------------------------
        # GET STUDENT DATA
        # ----------------------------------------------------

        admission_year = (
            validated_data["admission_year"]
        )

        course = (
            validated_data["course"]
        )

        department = (
            validated_data["department"]
        )

        # ----------------------------------------------------
        # STUDENT ROLE
        # ----------------------------------------------------

        student_role, created = (
            Role.objects.get_or_create(
                name="Student"
            )
        )

        # ----------------------------------------------------
        # CREATE USER
        # ----------------------------------------------------

        user = User.objects.create_user(
            username=username,
            email=validated_data["email"],
            password=password
        )

        # ----------------------------------------------------
        # CREATE USER PROFILE
        # ----------------------------------------------------

        UserProfile.objects.create(
            user=user,
            role=student_role,
            department=department
        )

        # ----------------------------------------------------
        # GENERATE ROLL NUMBER
        # ----------------------------------------------------

        roll_number = (
            self.generate_roll_number(
                admission_year=admission_year,
                course=course,
                department=department
            )
        )

        # ----------------------------------------------------
        # ADD ROLL NUMBER
        # ----------------------------------------------------

        validated_data["roll_number"] = (
            roll_number
        )

        # ----------------------------------------------------
        # CREATE STUDENT
        # ----------------------------------------------------

        student = Student.objects.create(
            user=user,
            **validated_data
        )

        return student