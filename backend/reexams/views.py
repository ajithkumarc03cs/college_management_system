from django.utils import timezone
from django.db.models import Q

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import ReExam
from .serializers import ReExamSerializer

from students.permissions import (
    IsStaffOrAdmin,
    IsStudent
)

from accounts.models import StaffAssignment
from accounts.permissions import IsHOD


# ============================================================
# STAFF SUBJECT HELPER
# ============================================================

def get_staff_subject_ids(user):

    return StaffAssignment.objects.filter(
        staff=user
    ).values_list(
        "subject_id",
        flat=True
    )


# ============================================================
# RE-EXAM LIST + CREATE
# ============================================================

class ReExamListCreateView(
    generics.ListCreateAPIView
):

    serializer_class = ReExamSerializer

    permission_classes = [
        IsAuthenticated,
        IsStaffOrAdmin
    ]

    def get_queryset(self):

        user = self.request.user

        try:

            role = user.userprofile.role.name

        except Exception:

            return ReExam.objects.none()


        # ====================================================
        # ADMIN
        # ====================================================

        if role == "Admin":

            queryset = ReExam.objects.all()


        # ====================================================
        # STAFF
        # ====================================================

        elif role == "Staff":

            subject_ids = get_staff_subject_ids(user)

            queryset = ReExam.objects.filter(
                exam__subject_id__in=subject_ids
            )


        else:

            return ReExam.objects.none()


        queryset = queryset.select_related(
            "exam",
            "exam__subject",
            "exam__course",
            "exam__department",
            "participation",
            "student",
            "student__course",
            "student__department"
        )


        # ====================================================
        # SEARCH
        # ====================================================

        search = self.request.query_params.get(
            "search"
        )

        if search:

            queryset = queryset.filter(

                Q(exam__name__icontains=search)
                |
                Q(
                    exam__subject__name__icontains=search
                )
                |
                Q(
                    exam__subject__code__icontains=search
                )
                |
                Q(
                    student__name__icontains=search
                )

            )


        # ====================================================
        # EXAM FILTER
        # ====================================================

        exam = self.request.query_params.get(
            "exam"
        )

        if exam:

            queryset = queryset.filter(
                exam_id=exam
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
                exam__subject_id=subject
            )


        # ====================================================
        # DATE FILTER
        # ====================================================

        reexam_date = self.request.query_params.get(
            "reexam_date"
        )

        if reexam_date:

            queryset = queryset.filter(
                reexam_date=reexam_date
            )


        # ====================================================
        # UPCOMING / COMPLETED
        # ====================================================

        exam_type = self.request.query_params.get(
            "type"
        )

        today = timezone.now().date()


        if exam_type == "upcoming":

            queryset = queryset.filter(
                reexam_date__gte=today
            )


        elif exam_type == "completed":

            queryset = queryset.filter(
                reexam_date__lt=today
            )


        return queryset.order_by(
            "reexam_date",
            "start_time"
        )


    # ========================================================
    # CREATE
    # ========================================================

    def perform_create(self, serializer):

        serializer.save()


# ============================================================
# RE-EXAM DETAIL
# ============================================================

class ReExamDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    serializer_class = ReExamSerializer

    permission_classes = [
        IsAuthenticated,
        IsStaffOrAdmin
    ]

    def get_queryset(self):

        user = self.request.user

        try:

            role = user.userprofile.role.name

        except Exception:

            return ReExam.objects.none()


        # ====================================================
        # ADMIN
        # ====================================================

        if role == "Admin":

            return ReExam.objects.all().select_related(

                "exam",
                "exam__subject",
                "exam__course",
                "exam__department",
                "participation",
                "student",
                "student__course",
                "student__department"

            )


        # ====================================================
        # STAFF
        # ====================================================

        if role == "Staff":

            subject_ids = get_staff_subject_ids(user)

            return ReExam.objects.filter(
                exam__subject_id__in=subject_ids
            ).select_related(

                "exam",
                "exam__subject",
                "exam__course",
                "exam__department",
                "participation",
                "student",
                "student__course",
                "student__department"

            )


        return ReExam.objects.none()


# ============================================================
# STUDENT RE-EXAM LIST
# ============================================================

class StudentReExamListView(
    generics.ListAPIView
):

    serializer_class = ReExamSerializer

    permission_classes = [
        IsAuthenticated,
        IsStudent
    ]

    def get_queryset(self):

        student = self.request.user.student

        queryset = ReExam.objects.filter(
            student=student
        ).select_related(

            "exam",
            "exam__subject",
            "exam__course",
            "exam__department",
            "participation",
            "student"

        )


        # ====================================================
        # SEARCH
        # ====================================================

        search = self.request.query_params.get(
            "search"
        )

        if search:

            queryset = queryset.filter(

                Q(exam__name__icontains=search)
                |
                Q(
                    exam__subject__name__icontains=search
                )
                |
                Q(
                    exam__subject__code__icontains=search
                )

            )


        # ====================================================
        # SUBJECT FILTER
        # ====================================================

        subject = self.request.query_params.get(
            "subject"
        )

        if subject:

            queryset = queryset.filter(
                exam__subject_id=subject
            )


        # ====================================================
        # DATE FILTER
        # ====================================================

        reexam_date = self.request.query_params.get(
            "reexam_date"
        )

        if reexam_date:

            queryset = queryset.filter(
                reexam_date=reexam_date
            )


        # ====================================================
        # UPCOMING / COMPLETED
        # ====================================================

        exam_type = self.request.query_params.get(
            "type"
        )

        today = timezone.now().date()


        if exam_type == "upcoming":

            queryset = queryset.filter(
                reexam_date__gte=today
            )


        elif exam_type == "completed":

            queryset = queryset.filter(
                reexam_date__lt=today
            )


        return queryset.order_by(
            "reexam_date",
            "start_time"
        )


# ============================================================
# HOD RE-EXAM LIST
# ============================================================

class HODReExamListView(
    generics.ListAPIView
):

    serializer_class = ReExamSerializer

    permission_classes = [
        IsAuthenticated,
        IsHOD
    ]

    def get_queryset(self):

        user = self.request.user

        try:

            profile = user.userprofile

        except Exception:

            return ReExam.objects.none()


        department = profile.department


        # ====================================================
        # HOD MUST HAVE DEPARTMENT
        # ====================================================

        if department is None:

            return ReExam.objects.none()


        # ====================================================
        # DEPARTMENT RE-EXAMS
        # ====================================================

        queryset = ReExam.objects.filter(

            Q(
                exam__department_id=department.id
            )
            |
            Q(
                exam__subject__department_id=department.id
            )

        ).select_related(

            "exam",
            "exam__subject",
            "exam__course",
            "exam__department",
            "participation",
            "student",
            "student__course",
            "student__department"

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
                    exam__name__icontains=search
                )
                |
                Q(
                    exam__subject__name__icontains=search
                )
                |
                Q(
                    exam__subject__code__icontains=search
                )
                |
                Q(
                    student__name__icontains=search
                )
                |
                Q(
                    student__email__icontains=search
                )

            )


        # ====================================================
        # EXAM FILTER
        # ====================================================

        exam = self.request.query_params.get(
            "exam"
        )

        if exam:

            queryset = queryset.filter(
                exam_id=exam
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
                exam__subject_id=subject
            )


        # ====================================================
        # DATE FILTER
        # ====================================================

        reexam_date = self.request.query_params.get(
            "reexam_date"
        )

        if reexam_date:

            queryset = queryset.filter(
                reexam_date=reexam_date
            )


        # ====================================================
        # UPCOMING / COMPLETED
        # ====================================================

        exam_type = self.request.query_params.get(
            "type"
        )

        today = timezone.now().date()


        if exam_type == "upcoming":

            queryset = queryset.filter(
                reexam_date__gte=today
            )


        elif exam_type == "completed":

            queryset = queryset.filter(
                reexam_date__lt=today
            )


        return queryset.order_by(
            "reexam_date",
            "start_time"
        )
