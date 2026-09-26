from rest_framework import serializers

from .models import Attendance

from students.models import Student

from accounts.models import StaffAssignment

from academics.models import Subject


# ============================================================
# ATTENDANCE LIST SERIALIZER
# ============================================================

class AttendanceSerializer(
    serializers.ModelSerializer
):

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


    # --------------------------------------------------------
    # COURSE DETAILS
    # --------------------------------------------------------

    course_name = serializers.CharField(
        source="course.name",
        read_only=True
    )


    # --------------------------------------------------------
    # DEPARTMENT DETAILS
    # --------------------------------------------------------

    department_name = serializers.CharField(
        source="department.name",
        read_only=True
    )


    # --------------------------------------------------------
    # MARKED BY
    # --------------------------------------------------------

    marked_by_name = serializers.CharField(
        source="marked_by.username",
        read_only=True
    )


    class Meta:

        model = Attendance

        fields = [

            "id",

            # Student
            "student",
            "student_name",
            "student_email",

            # Subject
            "subject",
            "subject_name",
            "subject_code",

            # Course
            "course",
            "course_name",

            # Department
            "department",
            "department_name",

            # Year
            "year",

            # Attendance
            "date",
            "status",

            # Staff
            "marked_by",
            "marked_by_name",

            # Created
            "created_at",
        ]

        read_only_fields = [

            "id",

            "course",
            "department",
            "year",

            "marked_by",
            "marked_by_name",

            "student_name",
            "student_email",

            "subject_name",
            "subject_code",

            "course_name",
            "department_name",

            "created_at",
        ]


# ============================================================
# SINGLE ATTENDANCE MARK
# ============================================================

class AttendanceMarkSerializer(
    serializers.Serializer
):

    student = serializers.PrimaryKeyRelatedField(
        queryset=Student.objects.all()
    )

    subject = serializers.PrimaryKeyRelatedField(
        queryset=Subject.objects.all()
    )

    date = serializers.DateField()

    status = serializers.ChoiceField(
        choices=[
            ("PRESENT", "Present"),
            ("ABSENT", "Absent"),
        ]
    )


    def validate(
        self,
        attrs
    ):

        request = self.context["request"]

        user = request.user

        student = attrs["student"]

        subject = attrs["subject"]


        # ====================================================
        # STAFF SUBJECT CHECK
        # ====================================================

        if user.userprofile.role.name == "Staff":

            assigned = StaffAssignment.objects.filter(
                staff=user,
                subject=subject
            ).exists()


            if not assigned:

                raise serializers.ValidationError({
                    "subject":
                    "This subject is not assigned to you."
                })


        # ====================================================
        # STUDENT COURSE CHECK
        # ====================================================

        if student.course_id != subject.course_id:

            raise serializers.ValidationError({
                "student":
                "Student course does not match this subject."
            })


        # ====================================================
        # STUDENT DEPARTMENT CHECK
        # ====================================================

        if student.department_id != subject.department_id:

            raise serializers.ValidationError({
                "student":
                "Student department does not match this subject."
            })


        # ====================================================
        # CURRENT YEAR CHECK
        # ====================================================

        if student.get_current_year() != subject.year:

            raise serializers.ValidationError({
                "student":
                "Student current year does not match this subject year."
            })


        return attrs


# ============================================================
# BULK ATTENDANCE ITEM
# ============================================================

class BulkAttendanceItemSerializer(
    serializers.Serializer
):

    student = serializers.PrimaryKeyRelatedField(
        queryset=Student.objects.all()
    )

    status = serializers.ChoiceField(
        choices=[
            ("PRESENT", "Present"),
            ("ABSENT", "Absent"),
        ]
    )


# ============================================================
# BULK ATTENDANCE
# ============================================================

class BulkAttendanceSerializer(
    serializers.Serializer
):

    subject = serializers.PrimaryKeyRelatedField(
        queryset=Subject.objects.all()
    )

    date = serializers.DateField()

    records = BulkAttendanceItemSerializer(
        many=True
    )


    def validate(
        self,
        attrs
    ):

        request = self.context["request"]

        user = request.user

        subject = attrs["subject"]

        records = attrs["records"]


        # ====================================================
        # STAFF SUBJECT CHECK
        # ====================================================

        if user.userprofile.role.name == "Staff":

            assigned = StaffAssignment.objects.filter(
                staff=user,
                subject=subject
            ).exists()


            if not assigned:

                raise serializers.ValidationError({
                    "subject":
                    "This subject is not assigned to you."
                })


        # ====================================================
        # EMPTY RECORD CHECK
        # ====================================================

        if not records:

            raise serializers.ValidationError({
                "records":
                "At least one student attendance record is required."
            })


        # ====================================================
        # DUPLICATE STUDENT CHECK
        # ====================================================

        student_ids = [
            item["student"].id
            for item in records
        ]


        if len(student_ids) != len(
            set(student_ids)
        ):

            raise serializers.ValidationError({
                "records":
                "The same student cannot appear more than once."
            })


        # ====================================================
        # VALIDATE EVERY STUDENT
        # ====================================================

        for item in records:

            student = item["student"]


            # ------------------------------------------------
            # COURSE
            # ------------------------------------------------

            if student.course_id != subject.course_id:

                raise serializers.ValidationError({
                    "records":
                    f"{student.name} does not belong to this course."
                })


            # ------------------------------------------------
            # DEPARTMENT
            # ------------------------------------------------

            if student.department_id != subject.department_id:

                raise serializers.ValidationError({
                    "records":
                    f"{student.name} does not belong to this department."
                })


            # ------------------------------------------------
            # YEAR
            # ------------------------------------------------

            if student.get_current_year() != subject.year:

                raise serializers.ValidationError({
                    "records":
                    f"{student.name} does not belong to year {subject.year}."
                })


        return attrs
