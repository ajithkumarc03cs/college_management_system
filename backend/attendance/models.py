from django.db import models

from students.models import Student
from academics.models import Course, Department, Subject


class Attendance(models.Model):

    STATUS_CHOICES = [
        ("PRESENT", "Present"),
        ("ABSENT", "Absent"),
    ]

    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE
    )

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

    date = models.DateField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="PRESENT"
    )

    marked_by = models.ForeignKey(
        "auth.User",
        on_delete=models.PROTECT
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["student", "subject", "date"],
                name="unique_student_subject_attendance_per_day"
            )
        ]

    def __str__(self):
        return f"{self.student.name} - {self.subject.name} - {self.date}"