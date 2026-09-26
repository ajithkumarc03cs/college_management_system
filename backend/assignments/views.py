from django.utils import timezone
from django.db.models import Q


from rest_framework import generics, status

from rest_framework.permissions import (
    IsAuthenticated
)

from rest_framework.parsers import (
    MultiPartParser,
    FormParser
)

from rest_framework.response import Response


# ============================================================
# MODELS
# ============================================================

from .models import (
    Assignment,
    AssignmentSubmission
)


# ============================================================
# SERIALIZERS
# ============================================================

from .serializers import (
    AssignmentSerializer,
    AssignmentSubmissionSerializer,
    AssignmentReviewSerializer
)


# ============================================================
# PERMISSIONS
# ============================================================

from students.permissions import (
    IsAdmin,
    IsStaffOrAdmin,
    IsStudent
)

from accounts.permissions import (
    IsHOD
)


# ============================================================
# ACCOUNTS MODELS
# ============================================================

from accounts.models import (
    StaffAssignment
)


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
# ASSIGNMENT LIST + CREATE
# ============================================================

class AssignmentListCreateView(
    generics.ListCreateAPIView
):

    serializer_class = AssignmentSerializer

    permission_classes = [
        IsAuthenticated,
        IsStaffOrAdmin
    ]

    def get_queryset(self):

        user = self.request.user

        try:

            role = user.userprofile.role.name

        except Exception:

            return Assignment.objects.none()


        # ====================================================
        # ADMIN
        # ====================================================

        if role == "Admin":

            queryset = Assignment.objects.all()


        # ====================================================
        # STAFF
        # ====================================================

        elif role == "Staff":

            subject_ids = get_staff_subject_ids(
                user
            )

            queryset = Assignment.objects.filter(

                subject_id__in=subject_ids

            )


        else:

            return Assignment.objects.none()


        # ====================================================
        # RELATED DATA
        # ====================================================

        queryset = queryset.select_related(

            "subject",
            "exam",
            "student",
            "assigned_by"

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
                        title__icontains=search
                    )

                    |

                    Q(
                        subject__name__icontains=search
                    )

                    |

                    Q(
                        subject__code__icontains=search
                    )

                    |

                    Q(
                        exam__name__icontains=search
                    )

                    |

                    Q(
                        student__name__icontains=search
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

                subject_id=subject

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
        # DUE DATE FILTER
        # ====================================================

        due_date = self.request.query_params.get(
            "due_date"
        )

        if due_date:

            queryset = queryset.filter(

                due_date=due_date

            )


        # ====================================================
        # UPCOMING / OVERDUE
        # ====================================================

        assignment_type = self.request.query_params.get(
            "type"
        )

        today = timezone.now().date()


        if assignment_type == "upcoming":

            queryset = queryset.filter(

                due_date__gte=today

            )


        elif assignment_type == "overdue":

            queryset = queryset.filter(

                due_date__lt=today

            )


        # ====================================================
        # ORDER
        # ====================================================

        return queryset.order_by(

            "due_date",

            "-created_at"

        )


    # ========================================================
    # CREATE
    # ========================================================

    def perform_create(
        self,
        serializer
    ):

        serializer.save(

            assigned_by=self.request.user

        )


# ============================================================
# ASSIGNMENT DETAIL
# ============================================================

class AssignmentDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    serializer_class = AssignmentSerializer

    permission_classes = [
        IsAuthenticated,
        IsStaffOrAdmin
    ]

    def get_queryset(self):

        user = self.request.user

        try:

            role = user.userprofile.role.name

        except Exception:

            return Assignment.objects.none()


        # ====================================================
        # ADMIN
        # ====================================================

        if role == "Admin":

            return Assignment.objects.all().select_related(

                "subject",
                "exam",
                "student",
                "assigned_by"

            )


        # ====================================================
        # STAFF
        # ====================================================

        if role == "Staff":

            subject_ids = get_staff_subject_ids(
                user
            )

            return Assignment.objects.filter(

                subject_id__in=subject_ids

            ).select_related(

                "subject",
                "exam",
                "student",
                "assigned_by"

            )


        return Assignment.objects.none()


# ============================================================
# STUDENT ASSIGNMENT LIST
# ============================================================

class StudentAssignmentListView(
    generics.ListAPIView
):

    serializer_class = AssignmentSerializer

    permission_classes = [
        IsAuthenticated,
        IsStudent
    ]

    def get_queryset(self):

        student = self.request.user.student


        queryset = Assignment.objects.filter(

            student=student

        ).select_related(

            "subject",
            "exam",
            "student",
            "assigned_by"

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
                        title__icontains=search
                    )

                    |

                    Q(
                        subject__name__icontains=search
                    )

                    |

                    Q(
                        subject__code__icontains=search
                    )

                    |

                    Q(
                        exam__name__icontains=search
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

                subject_id=subject

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
        # ASSIGNMENT TYPE
        # ====================================================

        assignment_type = self.request.query_params.get(
            "type"
        )

        today = timezone.now().date()


        if assignment_type == "upcoming":

            queryset = queryset.filter(

                due_date__gte=today

            )


        elif assignment_type == "overdue":

            queryset = queryset.filter(

                due_date__lt=today

            )


        return queryset.order_by(

            "due_date"

        )


# ============================================================
# STUDENT SUBMIT ASSIGNMENT
# ============================================================

class AssignmentSubmissionCreateView(
    generics.CreateAPIView
):

    serializer_class = AssignmentSubmissionSerializer

    permission_classes = [
        IsAuthenticated,
        IsStudent
    ]

    parser_classes = [
        MultiPartParser,
        FormParser
    ]


# ============================================================
# STUDENT SUBMISSION LIST
# ============================================================

class StudentSubmissionListView(
    generics.ListAPIView
):

    serializer_class = AssignmentSubmissionSerializer

    permission_classes = [
        IsAuthenticated,
        IsStudent
    ]

    def get_queryset(self):

        student = self.request.user.student


        queryset = AssignmentSubmission.objects.filter(

            student=student

        ).select_related(

            "assignment",
            "assignment__subject",
            "assignment__exam",
            "student"

        )


        # ====================================================
        # STATUS FILTER
        # ====================================================

        submission_status = self.request.query_params.get(
            "status"
        )

        if submission_status:

            queryset = queryset.filter(

                status=submission_status.upper()

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
                        assignment__title__icontains=search
                    )

                    |

                    Q(
                        assignment__subject__name__icontains=search
                    )

                    |

                    Q(
                        assignment__exam__name__icontains=search
                    )

                )


        return queryset.order_by(

            "-submitted_at"

        )


# ============================================================
# STAFF / ADMIN SUBMISSION LIST
# ============================================================

class AssignmentSubmissionListView(
    generics.ListAPIView
):

    serializer_class = AssignmentSubmissionSerializer

    permission_classes = [
        IsAuthenticated,
        IsStaffOrAdmin
    ]

    def get_queryset(self):

        user = self.request.user

        try:

            role = user.userprofile.role.name

        except Exception:

            return AssignmentSubmission.objects.none()


        # ====================================================
        # ADMIN
        # ====================================================

        if role == "Admin":

            queryset = AssignmentSubmission.objects.all()


        # ====================================================
        # STAFF
        # ====================================================

        elif role == "Staff":

            subject_ids = get_staff_subject_ids(
                user
            )

            queryset = AssignmentSubmission.objects.filter(

                assignment__subject_id__in=subject_ids

            )


        else:

            return AssignmentSubmission.objects.none()


        # ====================================================
        # RELATED DATA
        # ====================================================

        queryset = queryset.select_related(

            "assignment",
            "assignment__subject",
            "assignment__exam",
            "student"

        )


        # ====================================================
        # ASSIGNMENT FILTER
        # ====================================================

        assignment = self.request.query_params.get(
            "assignment"
        )

        if assignment:

            queryset = queryset.filter(

                assignment_id=assignment

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
        # STATUS FILTER
        # ====================================================

        submission_status = self.request.query_params.get(
            "status"
        )

        if submission_status:

            queryset = queryset.filter(

                status=submission_status.upper()

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
                        assignment__title__icontains=search
                    )

                    |

                    Q(
                        assignment__subject__name__icontains=search
                    )

                    |

                    Q(
                        assignment__exam__name__icontains=search
                    )

                    |

                    Q(
                        student__name__icontains=search
                    )

                )


        return queryset.order_by(

            "-submitted_at"

        )


# ============================================================
# REVIEW ASSIGNMENT SUBMISSION
# ============================================================

class AssignmentSubmissionReviewView(
    generics.UpdateAPIView
):

    serializer_class = AssignmentReviewSerializer

    permission_classes = [
        IsAuthenticated,
        IsStaffOrAdmin
    ]

    http_method_names = [
        "patch"
    ]

    def get_queryset(self):

        user = self.request.user

        try:

            role = user.userprofile.role.name

        except Exception:

            return AssignmentSubmission.objects.none()


        # ====================================================
        # ADMIN
        # ====================================================

        if role == "Admin":

            return AssignmentSubmission.objects.all()


        # ====================================================
        # STAFF
        # ====================================================

        if role == "Staff":

            subject_ids = get_staff_subject_ids(
                user
            )

            return AssignmentSubmission.objects.filter(

                assignment__subject_id__in=subject_ids

            )


        return AssignmentSubmission.objects.none()


    # ========================================================
    # REVIEW
    # ========================================================

    def update(
        self,
        request,
        *args,
        **kwargs
    ):

        instance = self.get_object()


        serializer = self.get_serializer(

            instance,

            data=request.data,

            partial=True

        )


        serializer.is_valid(

            raise_exception=True

        )


        serializer.save()


        return Response(

            {

                "message":
                    "Assignment submission reviewed successfully.",

                "submission":
                    serializer.data

            },

            status=status.HTTP_200_OK

        )


# ============================================================
# HOD ASSIGNMENT LIST
# ============================================================

class HODAssignmentListView(
    generics.ListAPIView
):

    serializer_class = AssignmentSerializer

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

            return Assignment.objects.none()


        # ====================================================
        # HOD DEPARTMENT
        # ====================================================

        department = profile.department

        if department is None:

            return Assignment.objects.none()


        # ====================================================
        # DEPARTMENT ASSIGNMENTS ONLY
        # ====================================================

        queryset = Assignment.objects.filter(

            subject__department_id=department.id

        ).select_related(

            "subject",
            "subject__course",
            "subject__department",
            "exam",
            "student",
            "assigned_by"

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
                        title__icontains=search
                    )

                    |

                    Q(
                        subject__name__icontains=search
                    )

                    |

                    Q(
                        subject__code__icontains=search
                    )

                    |

                    Q(
                        exam__name__icontains=search
                    )

                    |

                    Q(
                        student__name__icontains=search
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

                subject_id=subject

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
        # DUE DATE FILTER
        # ====================================================

        due_date = self.request.query_params.get(
            "due_date"
        )

        if due_date:

            queryset = queryset.filter(

                due_date=due_date

            )


        # ====================================================
        # UPCOMING / OVERDUE
        # ====================================================

        assignment_type = self.request.query_params.get(
            "type"
        )

        today = timezone.now().date()


        if assignment_type == "upcoming":

            queryset = queryset.filter(

                due_date__gte=today

            )


        elif assignment_type == "overdue":

            queryset = queryset.filter(

                due_date__lt=today

            )


        # ====================================================
        # ORDER
        # ====================================================

        return queryset.order_by(

            "due_date",

            "-created_at"

        )
