from django.db import models

from exams.models import Exam, ExamParticipation
from students.models import Student


class ReExam(models.Model):

    exam = models.ForeignKey(
        Exam,
        on_delete=models.PROTECT
    )

    participation = models.ForeignKey(
        ExamParticipation,
        on_delete=models.PROTECT
    )

    student = models.ForeignKey(
        Student,
        on_delete=models.PROTECT
    )

    reexam_date = models.DateField()

    start_time = models.TimeField()

    end_time = models.TimeField()

    reason = models.CharField(
        max_length=255,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:

        constraints = [

            models.UniqueConstraint(
                fields=["participation"],
                name="unique_participation_reexam"
            )

        ]

        ordering = [
            "-created_at"
        ]

    def __str__(self):

        return (
            f"{self.student.name} - "
            f"{self.exam.name}"
        )

