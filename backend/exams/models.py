from django.db import models
from django.contrib.auth.models import User

from academics.models import Course, Department, Subject

class Exam(models.Model):

    name = models.CharField(max_length=200)
    subject = models.ForeignKey(
        Subject,
        on_delete=models.PROTECT
    )
    course = models.ForeignKey(
        Course,
        on_delete=models.PROTECT
    )

    department = models.ForeignKey(
        Department,
        on_delete=models.PROTECT
    )

    year = models.PositiveIntegerField()

    exam_date = models.DateField()

    start_time = models.TimeField()

    end_time = models.TimeField()

    created_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name




class ExamParticipation(models.Model):

    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("PRESENT", "Present"),
        ("ABSENT", "Absent"),
    ]

    exam = models.ForeignKey(
        Exam,
        on_delete=models.CASCADE
    )

    student = models.ForeignKey(
        "students.Student",
        on_delete=models.CASCADE
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="PENDING"
    )

    marks = models.PositiveIntegerField(
        null=True,
        blank=True
    )

    class Meta:

        constraints = [

            models.UniqueConstraint(
                fields=[
                    "exam",
                    "student"
                ],
                name="unique_exam_participation"
            )

        ]

    def __str__(self):

        return (
            f"{self.exam.name} - "
            f"{self.student.name}"
        )
