from rest_framework import serializers

from .models import (
    CourseLevel,
    Course,
    Department,
    Subject,
    # WebsiteDepartment,
)


# ========================================
# COURSE LEVEL
# ========================================

class CourseLevelSerializer(serializers.ModelSerializer):

    class Meta:
        model = CourseLevel

        fields = [
            "id",
            "name",
        ]

        read_only_fields = [
            "id",
        ]


# ========================================
# COURSE
# ========================================

class CourseSerializer(serializers.ModelSerializer):

    level_name = serializers.CharField(
        source="level.name",
        read_only=True
    )

    class Meta:
        model = Course

        fields = [
            "id",
            "name",
            "code",
            "level",
            "level_name",
            "duration",
            "description",
        ]

        read_only_fields = [
            "id",
            "level_name",
        ]

    def validate_duration(self, value):

        if value < 1:
            raise serializers.ValidationError(
                "Course duration must be at least 1 year."
            )

        return value


# ========================================
# DEPARTMENT
# ========================================

class DepartmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Department

        fields = [
            "id",
            "name",
        ]

        read_only_fields = [
            "id",
        ]


# ========================================
# SUBJECT
# ========================================

class SubjectSerializer(serializers.ModelSerializer):

    course_name = serializers.CharField(
        source="course.name",
        read_only=True
    )

    department_name = serializers.CharField(
        source="department.name",
        read_only=True
    )

    class Meta:
        model = Subject

        fields = [
            "id",
            "name",
            "code",
            "course",
            "course_name",
            "department",
            "department_name",
            "year",
        ]

        read_only_fields = [
            "id",
            "course_name",
            "department_name",
        ]

    def validate(self, attrs):

        # ====================================================
        # GET CURRENT VALUES
        # ====================================================

        if self.instance:

            course = attrs.get(
                "course",
                self.instance.course
            )

            department = attrs.get(
                "department",
                self.instance.department
            )

            year = attrs.get(
                "year",
                self.instance.year
            )

        else:

            course = attrs.get("course")

            department = attrs.get("department")

            year = attrs.get("year")

        # ====================================================
        # COURSE REQUIRED
        # ====================================================

        if course is None:

            raise serializers.ValidationError({
                "course": "Course is required."
            })

        # ====================================================
        # DEPARTMENT REQUIRED
        # ====================================================

        if department is None:

            raise serializers.ValidationError({
                "department": "Department is required."
            })

        # ====================================================
        # YEAR REQUIRED
        # ====================================================

        if year is None:

            raise serializers.ValidationError({
                "year": "Year is required."
            })

        # ====================================================
        # YEAR VALIDATION
        # ====================================================

        if year < 1:

            raise serializers.ValidationError({
                "year": "Year must be at least 1."
            })

        # ====================================================
        # COURSE DURATION VALIDATION
        # ====================================================

        if year > course.duration:

            raise serializers.ValidationError({
                "year":
                    "Year cannot be greater than course duration."
            })

        return attrs


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