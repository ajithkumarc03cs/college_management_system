from django.utils import timezone

from rest_framework import serializers

from .models import ReExam

from accounts.models import StaffAssignment


# ============================================================
# RE-EXAM SERIALIZER
# ============================================================

class ReExamSerializer(
    serializers.ModelSerializer
):

    # ========================================================
    # STUDENT DETAILS
    # ========================================================

    student_name = serializers.CharField(
        source="student.name",
        read_only=True
    )

    course_name = serializers.CharField(
        source="student.course.name",
        read_only=True
    )

    department_name = serializers.CharField(
        source="student.department.name",
        read_only=True
    )

    student_year = serializers.SerializerMethodField()


    # ========================================================
    # EXAM DETAILS
    # ========================================================

    exam_name = serializers.CharField(
        source="exam.name",
        read_only=True
    )

    subject_name = serializers.CharField(
        source="exam.subject.name",
        read_only=True
    )

    subject_code = serializers.CharField(
        source="exam.subject.code",
        read_only=True
    )


    class Meta:

        model = ReExam

        fields = [

            # ------------------------------------------------
            # RE-EXAM
            # ------------------------------------------------

            "id",

            # ------------------------------------------------
            # EXAM
            # ------------------------------------------------

            "exam",
            "exam_name",

            # ------------------------------------------------
            # PARTICIPATION
            # ------------------------------------------------

            "participation",

            # ------------------------------------------------
            # STUDENT
            # ------------------------------------------------

            "student",
            "student_name",
            "course_name",
            "department_name",
            "student_year",

            # ------------------------------------------------
            # SUBJECT
            # ------------------------------------------------

            "subject_name",
            "subject_code",

            # ------------------------------------------------
            # RE-EXAM SCHEDULE
            # ------------------------------------------------

            "reexam_date",
            "start_time",
            "end_time",

            # ------------------------------------------------
            # REASON
            # ------------------------------------------------

            "reason",

            # ------------------------------------------------
            # CREATED
            # ------------------------------------------------

            "created_at",
        ]

        read_only_fields = [

            "id",
            "created_at",

            "exam_name",

            "student_name",
            "course_name",
            "department_name",
            "student_year",

            "subject_name",
            "subject_code",
        ]


    # ========================================================
    # CURRENT STUDENT YEAR
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

        request = self.context["request"]

        user = request.user


        # ====================================================
        # CREATE
        # ====================================================

        if self.instance is None:

            exam = attrs.get(
                "exam"
            )

            participation = attrs.get(
                "participation"
            )

            student = attrs.get(
                "student"
            )

            reexam_date = attrs.get(
                "reexam_date"
            )

            start_time = attrs.get(
                "start_time"
            )

            end_time = attrs.get(
                "end_time"
            )


            # =================================================
            # REQUIRED FIELDS
            # =================================================

            if exam is None:

                raise serializers.ValidationError({
                    "exam":
                    "Exam is required."
                })


            if participation is None:

                raise serializers.ValidationError({
                    "participation":
                    "Participation is required."
                })


            if student is None:

                raise serializers.ValidationError({
                    "student":
                    "Student is required."
                })


            if reexam_date is None:

                raise serializers.ValidationError({
                    "reexam_date":
                    "Re-exam date is required."
                })


            if start_time is None:

                raise serializers.ValidationError({
                    "start_time":
                    "Start time is required."
                })


            if end_time is None:

                raise serializers.ValidationError({
                    "end_time":
                    "End time is required."
                })


            # =================================================
            # PARTICIPATION → EXAM
            # =================================================

            if participation.exam_id != exam.id:

                raise serializers.ValidationError({

                    "participation":
                    "Participation does not belong to this exam."

                })


            # =================================================
            # PARTICIPATION → STUDENT
            # =================================================

            if participation.student_id != student.id:

                raise serializers.ValidationError({

                    "student":
                    "Student does not belong to this participation."

                })


            # =================================================
            # STUDENT MUST BE ABSENT
            # =================================================

            if participation.status != "ABSENT":

                raise serializers.ValidationError({

                    "participation":
                    "Re-exam can be created only for absent students."

                })


            # =================================================
            # STUDENT → EXAM YEAR
            # =================================================

            if student.get_current_year() != exam.year:

                raise serializers.ValidationError({

                    "student":
                    "Student does not belong to this exam year."

                })


            # =================================================
            # STUDENT → COURSE
            # =================================================

            if student.course_id != exam.course_id:

                raise serializers.ValidationError({

                    "student":
                    "Student does not belong to this exam course."

                })


            # =================================================
            # STUDENT → DEPARTMENT
            # =================================================

            if student.department_id != exam.department_id:

                raise serializers.ValidationError({

                    "student":
                    "Student does not belong to this exam department."

                })


            # =================================================
            # RE-EXAM DATE
            # =================================================

            today = timezone.now().date()


            if reexam_date < today:

                raise serializers.ValidationError({

                    "reexam_date":
                    "Re-exam date cannot be in the past."

                })


            # =================================================
            # TIME VALIDATION
            # =================================================

            if start_time >= end_time:

                raise serializers.ValidationError({

                    "end_time":
                    "End time must be greater than start time."

                })


            # =================================================
            # STAFF SUBJECT CHECK
            # =================================================

            try:

                role = user.userprofile.role.name

            except Exception:

                role = None


            if role == "Staff":

                assigned = StaffAssignment.objects.filter(

                    staff=user,

                    subject=exam.subject

                ).exists()


                if not assigned:

                    raise serializers.ValidationError({

                        "exam":
                        "This subject is not assigned to you."

                    })


            # =================================================
            # DUPLICATE RE-EXAM CHECK
            # =================================================

            if ReExam.objects.filter(

                participation=participation

            ).exists():

                raise serializers.ValidationError({

                    "participation":
                    "Re-exam already exists for this student."

                })


        # ====================================================
        # UPDATE
        # ====================================================

        else:

            # =================================================
            # RELATIONSHIPS CANNOT CHANGE
            # =================================================

            if (

                "exam" in attrs
                or
                "participation" in attrs
                or
                "student" in attrs

            ):

                raise serializers.ValidationError({

                    "exam":
                    "Exam, participation and student "
                    "cannot be changed after re-exam creation."

                })


            # =================================================
            # CURRENT VALUES
            # =================================================

            reexam_date = attrs.get(

                "reexam_date",

                self.instance.reexam_date

            )

            start_time = attrs.get(

                "start_time",

                self.instance.start_time

            )

            end_time = attrs.get(

                "end_time",

                self.instance.end_time

            )


            # =================================================
            # DATE VALIDATION
            # =================================================

            today = timezone.now().date()


            if reexam_date < today:

                raise serializers.ValidationError({

                    "reexam_date":
                    "Re-exam date cannot be in the past."

                })


            # =================================================
            # TIME VALIDATION
            # =================================================

            if start_time >= end_time:

                raise serializers.ValidationError({

                    "end_time":
                    "End time must be greater than start time."

                })


        return attrs