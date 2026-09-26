from django.utils import timezone
from django.db import transaction
from django.db.models import Q

from rest_framework import (
    generics,
    status
)

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Attendance

from .serializers import (
    AttendanceSerializer,
    AttendanceMarkSerializer,
    BulkAttendanceSerializer
)
from accounts.permissions import (
    IsHOD
)
from students.models import Student

from students.permissions import (
    IsStaffOrAdmin,
    IsStudent
)

from accounts.models import StaffAssignment

from academics.models import Subject


# ============================================================
# HELPER
# ============================================================

def get_staff_subject_ids(user):

    return StaffAssignment.objects.filter(
        staff=user
    ).values_list(
        "subject_id",
        flat=True
    )


# ============================================================
# STAFF ATTENDANCE CLASSES
# ============================================================

class StaffAttendanceClassView(
    generics.ListAPIView
):

    permission_classes = [
        IsAuthenticated,
        IsStaffOrAdmin
    ]

    def get(self, request):

        user = request.user

        try:

            role = user.userprofile.role.name

        except Exception:

            return Response(
                {
                    "detail":
                    "User profile not found."
                },
                status=status.HTTP_403_FORBIDDEN
            )


        # ====================================================
        # ADMIN
        # ====================================================

        if role == "Admin":

            subjects = Subject.objects.select_related(
                "course",
                "department"
            )


        # ====================================================
        # STAFF
        # ====================================================

        elif role == "Staff":

            subject_ids = get_staff_subject_ids(
                user
            )

            subjects = Subject.objects.filter(
                id__in=subject_ids
            ).select_related(
                "course",
                "department"
            )


        else:

            return Response(
                {
                    "detail":
                    "You do not have permission."
                },
                status=status.HTTP_403_FORBIDDEN
            )


        # ====================================================
        # CREATE UNIQUE CLASS LIST
        # ====================================================

        classes = {}


        for subject in subjects:

            key = (
                subject.course_id,
                subject.department_id,
                subject.year
            )


            # ------------------------------------------------
            # CREATE CLASS
            # ------------------------------------------------

            if key not in classes:

                classes[key] = {

                    "course":
                        subject.course_id,

                    "course_name":
                        subject.course.name,

                    "department":
                        subject.department_id,

                    "department_name":
                        subject.department.name,

                    "year":
                        subject.year,

                    "subjects": []

                }


            # ------------------------------------------------
            # STAFF TEACHING SUBJECT
            # ------------------------------------------------

            classes[key]["subjects"].append({

                "id":
                    subject.id,

                "name":
                    subject.name,

                "code":
                    subject.code

            })


        return Response(
            list(classes.values())
        )


# ============================================================
# ATTENDANCE LIST
# ============================================================

class AttendanceListView(
    generics.ListAPIView
):

    serializer_class = AttendanceSerializer

    permission_classes = [
        IsAuthenticated,
        IsStaffOrAdmin
    ]

    def get_queryset(self):

        user = self.request.user


        try:

            role = user.userprofile.role.name

        except Exception:

            return Attendance.objects.none()


        # ====================================================
        # ADMIN
        # ====================================================

        if role == "Admin":

            queryset = Attendance.objects.all()


        # ====================================================
        # STAFF
        # ====================================================

        elif role == "Staff":

            subject_ids = get_staff_subject_ids(
                user
            )

            queryset = Attendance.objects.filter(
                subject_id__in=subject_ids
            )


        else:

            return Attendance.objects.none()


        # ====================================================
        # SELECT RELATED
        # ====================================================

        queryset = queryset.select_related(
            "student",
            "student__course",
            "student__department",
            "subject",
            "course",
            "department",
            "marked_by"
        )


        # ====================================================
        # SEARCH
        # ====================================================

        search = self.request.query_params.get(
            "search"
        )

        if search:

            queryset = queryset.filter(

                Q(
                    student__name__icontains=search
                )

                |

                Q(
                    student__email__icontains=search
                )

                |

                Q(
                    subject__name__icontains=search
                )

                |

                Q(
                    subject__code__icontains=search
                )

            )


        # ====================================================
        # STUDENT FILTER
        # ====================================================

        student = self.request.query_params.get(
            "student"
        )

        if student:

            queryset = queryset.filter(
                student_id=student
            )


        # ====================================================
        # SUBJECT FILTER
        # ====================================================

        subject = self.request.query_params.get(
            "subject"
        )

        if subject:

            queryset = queryset.filter(
                subject_id=subject
            )


        # ====================================================
        # COURSE FILTER
        # ====================================================

        course = self.request.query_params.get(
            "course"
        )

        if course:

            queryset = queryset.filter(
                course_id=course
            )


        # ====================================================
        # DEPARTMENT FILTER
        # ====================================================

        department = self.request.query_params.get(
            "department"
        )

        if department:

            queryset = queryset.filter(
                department_id=department
            )


        # ====================================================
        # YEAR FILTER
        # ====================================================

        year = self.request.query_params.get(
            "year"
        )

        if year:

            queryset = queryset.filter(
                year=year
            )


        # ====================================================
        # DATE FILTER
        # ====================================================

        attendance_date = self.request.query_params.get(
            "date"
        )

        if attendance_date:

            queryset = queryset.filter(
                date=attendance_date
            )


        # ====================================================
        # STATUS FILTER
        # ====================================================

        attendance_status = self.request.query_params.get(
            "status"
        )

        if attendance_status:

            queryset = queryset.filter(
                status=attendance_status.upper()
            )


        return queryset.order_by(
            "-date",
            "student__name"
        )


# ============================================================
# SINGLE ATTENDANCE
# ============================================================

class AttendanceCreateView(
    generics.CreateAPIView
):

    serializer_class = AttendanceMarkSerializer

    permission_classes = [
        IsAuthenticated,
        IsStaffOrAdmin
    ]

    @transaction.atomic
    def create(
        self,
        request,
        *args,
        **kwargs
    ):

        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )


        student = serializer.validated_data[
            "student"
        ]

        subject = serializer.validated_data[
            "subject"
        ]

        attendance_date = serializer.validated_data[
            "date"
        ]

        attendance_status = serializer.validated_data[
            "status"
        ]


        # ====================================================
        # GET STUDENT DETAILS
        # ====================================================

        course = student.course

        department = student.department

        year = student.get_current_year()


        # ====================================================
        # CREATE / UPDATE
        # ====================================================

        attendance, created = (
            Attendance.objects.update_or_create(

                student=student,

                subject=subject,

                date=attendance_date,

                defaults={

                    "course":
                        course,

                    "department":
                        department,

                    "year":
                        year,

                    "status":
                        attendance_status,

                    "marked_by":
                        request.user

                }

            )
        )


        # ====================================================
        # RESPONSE
        # ====================================================

        response_serializer = AttendanceSerializer(
            attendance
        )


        return Response(

            {

                "message":
                    (
                        "Attendance marked successfully."
                        if created
                        else
                        "Attendance updated successfully."
                    ),

                "attendance":
                    response_serializer.data

            },

            status=(
                status.HTTP_201_CREATED
                if created
                else
                status.HTTP_200_OK
            )

        )


# ============================================================
# BULK ATTENDANCE
# ============================================================

class BulkAttendanceCreateView(
    generics.CreateAPIView
):

    serializer_class = BulkAttendanceSerializer

    permission_classes = [
        IsAuthenticated,
        IsStaffOrAdmin
    ]

    @transaction.atomic
    def create(
        self,
        request,
        *args,
        **kwargs
    ):

        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )


        subject = serializer.validated_data[
            "subject"
        ]

        attendance_date = serializer.validated_data[
            "date"
        ]

        records = serializer.validated_data[
            "records"
        ]


        created_count = 0

        updated_count = 0


        # ====================================================
        # SAVE EACH STUDENT
        # ====================================================

        for record in records:

            student = record[
                "student"
            ]

            attendance_status = record[
                "status"
            ]


            course = student.course

            department = student.department

            year = student.get_current_year()


            attendance, created = (
                Attendance.objects.update_or_create(

                    student=student,

                    subject=subject,

                    date=attendance_date,

                    defaults={

                        "course":
                            course,

                        "department":
                            department,

                        "year":
                            year,

                        "status":
                            attendance_status,

                        "marked_by":
                            request.user

                    }

                )
            )


            if created:

                created_count += 1

            else:

                updated_count += 1


        # ====================================================
        # RESPONSE
        # ====================================================

        return Response(

            {

                "message":
                    "Bulk attendance saved successfully.",

                "subject":
                    subject.name,

                "date":
                    attendance_date,

                "created":
                    created_count,

                "updated":
                    updated_count,

                "total":
                    len(records)

            },

            status=status.HTTP_200_OK

        )


# ============================================================
# STUDENT ATTENDANCE
# ============================================================

class StudentAttendanceListView(
    generics.ListAPIView
):

    serializer_class = AttendanceSerializer

    permission_classes = [
        IsAuthenticated,
        IsStudent
    ]

    def get_queryset(self):

        queryset = Attendance.objects.filter(

            student__user=self.request.user

        ).select_related(

            "student",

            "subject",

            "course",

            "department"

        )


        # ====================================================
        # SUBJECT
        # ====================================================

        subject = self.request.query_params.get(
            "subject"
        )

        if subject:

            queryset = queryset.filter(
                subject_id=subject
            )


        # ====================================================
        # STATUS
        # ====================================================

        attendance_status = self.request.query_params.get(
            "status"
        )

        if attendance_status:

            queryset = queryset.filter(
                status=attendance_status.upper()
            )


        # ====================================================
        # DATE
        # ====================================================

        attendance_date = self.request.query_params.get(
            "date"
        )

        if attendance_date:

            queryset = queryset.filter(
                date=attendance_date
            )


        return queryset.order_by(
            "-date",
            "subject__name"
        )


# ============================================================
# STUDENT ATTENDANCE PERCENTAGE
# ============================================================

class StudentAttendancePercentageView(
    generics.GenericAPIView
):

    permission_classes = [
        IsAuthenticated,
        IsStudent
    ]

    def get(
        self,
        request
    ):

        student = request.user.student


        attendance = Attendance.objects.filter(
            student=student
        )


        # ====================================================
        # OVERALL
        # ====================================================

        total = attendance.count()

        present = attendance.filter(
            status="PRESENT"
        ).count()

        absent = attendance.filter(
            status="ABSENT"
        ).count()


        if total > 0:

            percentage = (
                present / total
            ) * 100

        else:

            percentage = 0


        # ====================================================
        # SUBJECT-WISE
        # ====================================================

        subjects = attendance.values(
            "subject_id",
            "subject__name"
        ).distinct()


        subject_data = []


        for item in subjects:

            subject_id = item[
                "subject_id"
            ]

            subject_name = item[
                "subject__name"
            ]


            subject_attendance = attendance.filter(
                subject_id=subject_id
            )


            subject_total = (
                subject_attendance.count()
            )

            subject_present = (
                subject_attendance.filter(
                    status="PRESENT"
                ).count()
            )

            subject_absent = (
                subject_attendance.filter(
                    status="ABSENT"
                ).count()
            )


            if subject_total > 0:

                subject_percentage = (

                    subject_present /

                    subject_total

                ) * 100

            else:

                subject_percentage = 0


            subject_data.append({

                "subject_id":
                    subject_id,

                "subject":
                    subject_name,

                "total":
                    subject_total,

                "present":
                    subject_present,

                "absent":
                    subject_absent,

                "percentage":
                    round(
                        subject_percentage,
                        2
                    )

            })


        # ====================================================
        # RESPONSE
        # ====================================================

        return Response({

            "student":
                student.name,

            "overall": {

                "total":
                    total,

                "present":
                    present,

                "absent":
                    absent,

                "percentage":
                    round(
                        percentage,
                        2
                    )

            },

            "subjects":
                subject_data

        })


# ============================================================
# HOD ATTENDANCE LIST
# ============================================================

class HODAttendanceListView(
    generics.ListAPIView
):

    serializer_class = AttendanceSerializer

    permission_classes = [
        IsAuthenticated,
        IsHOD
    ]

    def get_queryset(self):

        # ====================================================
        # HOD PROFILE
        # ====================================================

        try:

            profile = self.request.user.userprofile

        except Exception:

            return Attendance.objects.none()


        # ====================================================
        # HOD DEPARTMENT
        # ====================================================

        department = profile.department

        if department is None:

            return Attendance.objects.none()


        # ====================================================
        # DEPARTMENT ATTENDANCE ONLY
        # ====================================================

        queryset = Attendance.objects.filter(

            department_id=department.id

        ).select_related(

            "student",
            "student__course",
            "student__department",
            "subject",
            "course",
            "department",
            "marked_by"

        )


        # ====================================================
        # SEARCH
        # ====================================================

        search = self.request.query_params.get(
            "search"
        )

        if search:

            search = search.strip()

            if search:

                queryset = queryset.filter(

                    Q(
                        student__name__icontains=search
                    )

                    |

                    Q(
                        student__email__icontains=search
                    )

                    |

                    Q(
                        subject__name__icontains=search
                    )

                    |

                    Q(
                        subject__code__icontains=search
                    )

                )


        # ====================================================
        # STUDENT FILTER
        # ====================================================

        student = self.request.query_params.get(
            "student"
        )

        if student:

            queryset = queryset.filter(

                student_id=student

            )


        # ====================================================
        # SUBJECT FILTER
        # ====================================================

        subject = self.request.query_params.get(
            "subject"
        )

        if subject:

            queryset = queryset.filter(

                subject_id=subject

            )


        # ====================================================
        # COURSE FILTER
        # ====================================================

        course = self.request.query_params.get(
            "course"
        )

        if course:

            queryset = queryset.filter(

                course_id=course

            )


        # ====================================================
        # YEAR FILTER
        # ====================================================

        year = self.request.query_params.get(
            "year"
        )

        if year:

            queryset = queryset.filter(

                year=year

            )


        # ====================================================
        # STATUS FILTER
        # ====================================================

        attendance_status = self.request.query_params.get(
            "status"
        )

        if attendance_status:

            queryset = queryset.filter(

                status=attendance_status.upper()

            )


        # ====================================================
        # DATE FILTER
        # ====================================================

        attendance_date = self.request.query_params.get(
            "date"
        )

        if attendance_date:

            queryset = queryset.filter(

                date=attendance_date

            )


        # ====================================================
        # ORDER
        # ====================================================

        return queryset.order_by(

            "-date",

            "student__name"

        )
