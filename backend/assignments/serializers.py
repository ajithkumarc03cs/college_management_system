from django.utils import timezone

from rest_framework import serializers

from .models import (
    Assignment,
    AssignmentSubmission
)

from accounts.models import StaffAssignment


# ============================================================
# ASSIGNMENT SERIALIZER
# ============================================================

class AssignmentSerializer(
    serializers.ModelSerializer
):

    # --------------------------------------------------------
    # SUBJECT DETAILS
    # --------------------------------------------------------

    subject_name = serializers.CharField(
        source="subject.name",
        read_only=True
    )

    subject_code = serializers.CharField(
        source="subject.code",
        read_only=True
    )

    subject_year = serializers.IntegerField(
        source="subject.year",
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


    # --------------------------------------------------------
    # EXAM DETAILS
    # --------------------------------------------------------

    exam_name = serializers.CharField(
        source="exam.name",
        read_only=True
    )


    # --------------------------------------------------------
    # STUDENT DETAILS
    # --------------------------------------------------------

    student_name = serializers.CharField(
        source="student.name",
        read_only=True
    )

    student_email = serializers.EmailField(
        source="student.email",
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


    # --------------------------------------------------------
    # ASSIGNED BY
    # --------------------------------------------------------

    assigned_by_name = serializers.CharField(
        source="assigned_by.username",
        read_only=True
    )


    class Meta:

        model = Assignment

        fields = [
            "id",

            "title",
            "description",

            # Subject
            "subject",
            "subject_name",
            "subject_code",
            "subject_year",
            "course_name",
            "department_name",

            # Exam
            "exam",
            "exam_name",

            # Student
            "student",
            "student_name",
            "student_email",
            "student_course_name",
            "student_department_name",
            "student_year",

            # Staff
            "assigned_by",
            "assigned_by_name",

            # Assignment
            "due_date",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "subject_name",
            "subject_code",
            "subject_year",
            "course_name",
            "department_name",
            "exam_name",
            "student_name",
            "student_email",
            "student_course_name",
            "student_department_name",
            "student_year",
            "assigned_by_name",
            "created_at",
        ]


    # ========================================================
    # STUDENT CURRENT YEAR
    # ========================================================

    def get_student_year(
        self,
        obj
    ):

        return obj.student.get_current_year()


    # ========================================================
    # VALIDATION
    # ========================================================

    def validate(
        self,
        attrs
    ):

        request = self.context.get(
            "request"
        )

        user = (
            request.user
            if request
            else None
        )


        # ----------------------------------------------------
        # VALUES
        # ----------------------------------------------------

        subject = attrs.get(
            "subject"
        )

        exam = attrs.get(
            "exam"
        )

        student = attrs.get(
            "student"
        )

        due_date = attrs.get(
            "due_date"
        )


        # ====================================================
        # CREATE
        # ====================================================

        if self.instance is None:

            # ------------------------------------------------
            # SUBJECT
            # ------------------------------------------------

            if subject is None:

                raise serializers.ValidationError({
                    "subject":
                    "Subject is required."
                })


            # ------------------------------------------------
            # EXAM
            # ------------------------------------------------

            if exam is None:

                raise serializers.ValidationError({
                    "exam":
                    "Exam is required."
                })


            # ------------------------------------------------
            # STUDENT
            # ------------------------------------------------

            if student is None:

                raise serializers.ValidationError({
                    "student":
                    "Student is required."
                })


            # =================================================
            # SUBJECT → EXAM
            # =================================================

            if exam.subject_id != subject.id:

                raise serializers.ValidationError({
                    "exam":
                    "Selected exam does not belong to the selected subject."
                })


            # =================================================
            # STUDENT → COURSE
            # =================================================

            if student.course_id != exam.course_id:

                raise serializers.ValidationError({
                    "student":
                    "Student does not belong to the exam course."
                })


            # =================================================
            # STUDENT → DEPARTMENT
            # =================================================

            if student.department_id != exam.department_id:

                raise serializers.ValidationError({
                    "student":
                    "Student does not belong to the exam department."
                })


            # =================================================
            # STUDENT → YEAR
            # =================================================

            if student.get_current_year() != exam.year:

                raise serializers.ValidationError({
                    "student":
                    "Student current year does not match the exam year."
                })


            # =================================================
            # STAFF SUBJECT ASSIGNMENT
            # =================================================

            if (
                user
                and hasattr(user, "userprofile")
                and user.userprofile.role.name == "Staff"
            ):

                assigned = StaffAssignment.objects.filter(
                    staff=user,
                    subject=subject
                ).exists()


                if not assigned:

                    raise serializers.ValidationError({
                        "subject":
                        "This subject is not assigned to you."
                    })


            # =================================================
            # DUE DATE
            # =================================================

            if (
                due_date
                and due_date < timezone.now().date()
            ):

                raise serializers.ValidationError({
                    "due_date":
                    "Due date cannot be in the past."
                })


            # =================================================
            # DUPLICATE ASSIGNMENT
            # =================================================

            if Assignment.objects.filter(
                exam=exam,
                student=student
            ).exists():

                raise serializers.ValidationError({
                    "student":
                    "This assignment has already been assigned to this student for this exam."
                })


        return attrs


# ============================================================
# ASSIGNMENT SUBMISSION SERIALIZER
# ============================================================

class AssignmentSubmissionSerializer(
    serializers.ModelSerializer
):

    # --------------------------------------------------------
    # ASSIGNMENT
    # --------------------------------------------------------

    assignment_title = serializers.CharField(
        source="assignment.title",
        read_only=True
    )

    assignment_description = serializers.CharField(
        source="assignment.description",
        read_only=True
    )

    # IMPORTANT:
    # Assignment.due_date is DateField
    # Therefore use DateField here.
    assignment_due_date = serializers.DateField(
        source="assignment.due_date",
        read_only=True
    )


    # --------------------------------------------------------
    # SUBJECT
    # --------------------------------------------------------

    subject_name = serializers.CharField(
        source="assignment.subject.name",
        read_only=True
    )

    subject_code = serializers.CharField(
        source="assignment.subject.code",
        read_only=True
    )


    # --------------------------------------------------------
    # COURSE / DEPARTMENT
    # --------------------------------------------------------

    course_name = serializers.CharField(
        source="assignment.subject.course.name",
        read_only=True
    )

    department_name = serializers.CharField(
        source="assignment.subject.department.name",
        read_only=True
    )


    # --------------------------------------------------------
    # STUDENT
    # --------------------------------------------------------

    student_name = serializers.CharField(
        source="student.name",
        read_only=True
    )

    student_email = serializers.EmailField(
        source="student.email",
        read_only=True
    )

    student_year = serializers.SerializerMethodField()


    class Meta:

        model = AssignmentSubmission

        fields = [
            "id",

            # Assignment
            "assignment",
            "assignment_title",
            "assignment_description",
            "assignment_due_date",

            # Subject
            "subject_name",
            "subject_code",

            # Course / Department
            "course_name",
            "department_name",

            # Student
            "student_name",
            "student_email",
            "student_year",

            # Submission
            "file",
            "status",
            "submitted_at",
            "reviewed_at",
        ]

        read_only_fields = [
            "id",
            "assignment_title",
            "assignment_description",
            "assignment_due_date",
            "subject_name",
            "subject_code",
            "course_name",
            "department_name",
            "student_name",
            "student_email",
            "student_year",
            "status",
            "submitted_at",
            "reviewed_at",
        ]


    # ========================================================
    # STUDENT YEAR
    # ========================================================

    def get_student_year(
        self,
        obj
    ):

        return obj.student.get_current_year()


    # ========================================================
    # CREATE SUBMISSION
    # ========================================================

    def create(
        self,
        validated_data
    ):

        request = self.context[
            "request"
        ]

        student = request.user.student

        assignment = validated_data[
            "assignment"
        ]


        # ====================================================
        # STUDENT → ASSIGNMENT
        # ====================================================

        if assignment.student_id != student.id:

            raise serializers.ValidationError({
                "assignment":
                "This assignment does not belong to you."
            })


        # ====================================================
        # DUE DATE
        # ====================================================

        if (
            assignment.due_date
            and assignment.due_date < timezone.now().date()
        ):

            raise serializers.ValidationError({
                "assignment":
                "Assignment submission deadline has passed."
            })


        # ====================================================
        # DUPLICATE SUBMISSION
        # ====================================================

        if AssignmentSubmission.objects.filter(
            assignment=assignment,
            student=student
        ).exists():

            raise serializers.ValidationError({
                "assignment":
                "You have already submitted this assignment."
            })


        # ====================================================
        # FILE
        # ====================================================

        if "file" not in validated_data:

            raise serializers.ValidationError({
                "file":
                "Assignment file is required."
            })


        # ====================================================
        # CREATE
        # ====================================================

        submission = AssignmentSubmission.objects.create(
            assignment=assignment,
            student=student,
            file=validated_data["file"],
            status="SUBMITTED"
        )


        return submission


# ============================================================
# ASSIGNMENT REVIEW SERIALIZER
# ============================================================

class AssignmentReviewSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = AssignmentSubmission

        fields = [
            "status",
            "reviewed_at",
        ]

        read_only_fields = [
            "reviewed_at",
        ]


    # ========================================================
    # STATUS VALIDATION
    # ========================================================

    def validate_status(
        self,
        value
    ):

        value = value.upper()

        allowed_statuses = [
            "APPROVED",
            "REJECTED",
        ]

        if value not in allowed_statuses:

            raise serializers.ValidationError(
                "Status must be APPROVED or REJECTED."
            )

        return value


    # ========================================================
    # UPDATE REVIEW
    # ========================================================

    def update(
        self,
        instance,
        validated_data
    ):

        instance.status = validated_data[
            "status"
        ]

        instance.reviewed_at = timezone.now()

        instance.save(
            update_fields=[
                "status",
                "reviewed_at"
            ]
        )

        return instance
