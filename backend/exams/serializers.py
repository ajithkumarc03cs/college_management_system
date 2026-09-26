from datetime import date

from rest_framework import serializers

from accounts.models import StaffAssignment

from .models import (
    Exam,
    ExamParticipation
)


# =========================================================
# EXAM SERIALIZER
# =========================================================

class ExamSerializer(
    serializers.ModelSerializer
):

    subject_name = serializers.CharField(
        source="subject.name",
        read_only=True
    )

    subject_code = serializers.CharField(
        source="subject.code",
        read_only=True
    )

    course_name = serializers.CharField(
        source="course.name",
        read_only=True
    )

    department_name = serializers.CharField(
        source="department.name",
        read_only=True
    )

    created_by_name = serializers.CharField(
        source="created_by.username",
        read_only=True
    )


    class Meta:

        model = Exam

        fields = [

            "id",

            "name",

            "subject",
            "subject_name",
            "subject_code",

            "course",
            "course_name",

            "department",
            "department_name",

            "year",

            "exam_date",

            "start_time",

            "end_time",

            "created_by",
            "created_by_name",

            "created_at",

        ]


        read_only_fields = [

            "id",

            "created_by",
            "created_by_name",

            "created_at",

            "subject_name",
            "subject_code",

            "course_name",
            "department_name",

        ]


    # =====================================================
    # VALIDATION
    # =====================================================

    def validate(
        self,
        attrs
    ):

        request = self.context.get(
            "request"
        )


        if request is None:

            raise serializers.ValidationError({

                "request":
                "Request context is required."

            })


        user = request.user


        # =================================================
        # GET VALUES
        # =================================================

        subject = attrs.get(

            "subject",

            self.instance.subject
            if self.instance
            else None

        )


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


        year = attrs.get(

            "year",

            self.instance.year
            if self.instance
            else None

        )


        exam_date = attrs.get(

            "exam_date",

            self.instance.exam_date
            if self.instance
            else None

        )


        start_time = attrs.get(

            "start_time",

            self.instance.start_time
            if self.instance
            else None

        )


        end_time = attrs.get(

            "end_time",

            self.instance.end_time
            if self.instance
            else None

        )


        # =================================================
        # REQUIRED FIELDS
        # =================================================

        if subject is None:

            raise serializers.ValidationError({

                "subject":
                "Subject is required."

            })


        if course is None:

            raise serializers.ValidationError({

                "course":
                "Course is required."

            })


        if department is None:

            raise serializers.ValidationError({

                "department":
                "Department is required."

            })


        if year is None:

            raise serializers.ValidationError({

                "year":
                "Year is required."

            })


        # =================================================
        # SUBJECT → COURSE
        # =================================================

        if subject.course_id != course.id:

            raise serializers.ValidationError({

                "course":
                "Selected course does not belong to this subject."

            })


        # =================================================
        # SUBJECT → DEPARTMENT
        # =================================================

        if subject.department_id != department.id:

            raise serializers.ValidationError({

                "department":
                "Selected department does not belong to this subject."

            })


        # =================================================
        # SUBJECT → YEAR
        # =================================================

        if subject.year != year:

            raise serializers.ValidationError({

                "year":
                "Selected year does not match the subject year."

            })


        # =================================================
        # YEAR → COURSE DURATION
        # =================================================

        if year < 1:

            raise serializers.ValidationError({

                "year":
                "Year must be at least 1."

            })


        if year > course.duration:

            raise serializers.ValidationError({

                "year":
                "Year cannot be greater than course duration."

            })


        # =================================================
        # TIME VALIDATION
        # =================================================

        if (
            start_time is not None
            and end_time is not None
        ):

            if start_time >= end_time:

                raise serializers.ValidationError({

                    "end_time":
                    "End time must be greater than start time."

                })


        # =================================================
        # DATE VALIDATION
        # =================================================

        if exam_date is not None:

            if exam_date < date.today():

                raise serializers.ValidationError({

                    "exam_date":
                    "Exam date cannot be in the past."

                })


        # =================================================
        # STAFF SECURITY
        # =================================================

        try:

            role = user.userprofile.role.name

        except Exception:

            raise serializers.ValidationError({

                "user":
                "User profile does not exist."

            })


        if role == "Staff":

            assigned = StaffAssignment.objects.filter(

                staff=user,

                subject=subject

            ).exists()


            if not assigned:

                raise serializers.ValidationError({

                    "subject":
                    "This subject is not assigned to you."

                })


        return attrs


# =========================================================
# EXAM PARTICIPATION SERIALIZER
# =========================================================

class ExamParticipationSerializer(
    serializers.ModelSerializer
):

    # ========================================================
    # STUDENT
    # ========================================================

    student_name = serializers.CharField(
        source="student.name",
        read_only=True
    )

    student_email = serializers.CharField(
        source="student.email",
        read_only=True
    )

    student_phone = serializers.CharField(
        source="student.phone",
        read_only=True
    )

    student_course_name = serializers.CharField(
        source="student.course.name",
        read_only=True
    )

    student_department_name = serializers.CharField(
        source="student.department.name",
        read_only=True
    )

    student_year = serializers.SerializerMethodField()


    # ========================================================
    # EXAM
    # ========================================================

    exam_name = serializers.CharField(
        source="exam.name",
        read_only=True
    )

    exam_date = serializers.DateField(
        source="exam.exam_date",
        read_only=True
    )

    exam_start_time = serializers.TimeField(
        source="exam.start_time",
        read_only=True
    )

    exam_end_time = serializers.TimeField(
        source="exam.end_time",
        read_only=True
    )


    # ========================================================
    # SUBJECT
    # ========================================================

    subject_name = serializers.CharField(
        source="exam.subject.name",
        read_only=True
    )

    subject_code = serializers.CharField(
        source="exam.subject.code",
        read_only=True
    )


    # ========================================================
    # EXAM COURSE / DEPARTMENT / YEAR
    # ========================================================

    exam_course_name = serializers.CharField(
        source="exam.course.name",
        read_only=True
    )

    exam_department_name = serializers.CharField(
        source="exam.department.name",
        read_only=True
    )

    exam_year = serializers.IntegerField(
        source="exam.year",
        read_only=True
    )


    class Meta:

        model = ExamParticipation

        fields = [

            # ------------------------------------------------
            # PARTICIPATION
            # ------------------------------------------------

            "id",

            # ------------------------------------------------
            # EXAM
            # ------------------------------------------------

            "exam",
            "exam_name",

            "exam_date",
            "exam_start_time",
            "exam_end_time",

            # ------------------------------------------------
            # SUBJECT
            # ------------------------------------------------

            "subject_name",
            "subject_code",

            # ------------------------------------------------
            # EXAM COURSE
            # ------------------------------------------------

            "exam_course_name",
            "exam_department_name",
            "exam_year",

            # ------------------------------------------------
            # STUDENT
            # ------------------------------------------------

            "student",
            "student_name",
            "student_email",
            "student_phone",

            "student_course_name",
            "student_department_name",
            "student_year",

            # ------------------------------------------------
            # RESULT
            # ------------------------------------------------

            "status",
            "marks",

        ]


        read_only_fields = [

            "id",

            # =================================================
            # SECURITY
            # =================================================

            "exam",
            "student",

            # =================================================
            # EXAM DISPLAY
            # =================================================

            "exam_name",
            "exam_date",
            "exam_start_time",
            "exam_end_time",

            # =================================================
            # SUBJECT DISPLAY
            # =================================================

            "subject_name",
            "subject_code",

            # =================================================
            # EXAM CLASS DISPLAY
            # =================================================

            "exam_course_name",
            "exam_department_name",
            "exam_year",

            # =================================================
            # STUDENT DISPLAY
            # =================================================

            "student_name",
            "student_email",
            "student_phone",

            "student_course_name",
            "student_department_name",
            "student_year",

        ]


    # =====================================================
    # STUDENT CURRENT YEAR
    # =====================================================

    def get_student_year(
        self,
        obj
    ):

        return obj.student.get_current_year()


    # =====================================================
    # MARKS VALIDATION
    # =====================================================

    def validate_marks(
        self,
        value
    ):

        if value is None:

            return value


        if value < 0:

            raise serializers.ValidationError(
                "Marks cannot be negative."
            )


        if value > 100:

            raise serializers.ValidationError(
                "Marks cannot be greater than 100."
            )


        return value


    # =====================================================
    # PARTICIPATION VALIDATION
    # =====================================================

    def validate(
        self,
        attrs
    ):

        # =================================================
        # CURRENT VALUES
        # =================================================

        status_value = attrs.get(

            "status",

            self.instance.status
            if self.instance
            else None

        )


        marks = attrs.get(

            "marks",

            self.instance.marks
            if self.instance
            else None

        )


        # =================================================
        # ABSENT
        # =================================================

        if status_value == "ABSENT":

            if marks is not None:

                raise serializers.ValidationError({

                    "marks":
                    "Absent student cannot have marks."

                })


        # =================================================
        # PENDING
        # =================================================

        elif status_value == "PENDING":

            if marks is not None:

                raise serializers.ValidationError({

                    "marks":
                    "Pending student cannot have marks."

                })


        # =================================================
        # PRESENT
        # =================================================

        elif status_value == "PRESENT":

            if marks is None:

                raise serializers.ValidationError({

                    "marks":
                    "Marks are required for a present student."

                })


            if marks < 0 or marks > 100:

                raise serializers.ValidationError({

                    "marks":
                    "Marks must be between 0 and 100."

                })


        return attrs
