from django.db import models

from django.contrib.auth.models import User

from students.models import Student

from academics.models import Subject

from exams.models import Exam


# ============================================================
# ASSIGNMENT
# ============================================================

class Assignment(models.Model):

    title = models.CharField(
        max_length=200
    )

    description = models.TextField(
        blank=True
    )

    subject = models.ForeignKey(
        Subject,
        on_delete=models.PROTECT
    )

    exam = models.ForeignKey(
        Exam,
        on_delete=models.PROTECT
    )

    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE
    )

    assigned_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT
    )

    due_date = models.DateField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:

        constraints = [

            models.UniqueConstraint(
                fields=[
                    "exam",
                    "student"
                ],
                name="unique_exam_student_assignment"
            )

        ]

        ordering = [
            "-created_at"
        ]

    def __str__(self):

        return f"{self.title} - {self.student.name}"


# ============================================================
# ASSIGNMENT SUBMISSION
# ============================================================

class AssignmentSubmission(models.Model):

    STATUS_CHOICES = [

        (
            "SUBMITTED",
            "Submitted"
        ),

        (
            "APPROVED",
            "Approved"
        ),

        (
            "REJECTED",
            "Rejected"
        ),

    ]

    assignment = models.ForeignKey(
        Assignment,
        on_delete=models.CASCADE,
        related_name="submissions"
    )

    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name="assignment_submissions"
    )

    file = models.FileField(
        upload_to="assignments/"
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="SUBMITTED"
    )

    submitted_at = models.DateTimeField(
        auto_now_add=True
    )

    reviewed_at = models.DateTimeField(
        null=True,
        blank=True
    )

    class Meta:

        constraints = [

            models.UniqueConstraint(
                fields=[
                    "assignment",
                    "student"
                ],
                name="unique_assignment_student_submission"
            )

        ]

        ordering = [
            "-submitted_at"
        ]

    def __str__(self):

        return (
            f"{self.assignment.title} - "
            f"{self.student.name}"
        )
