from django.db import models
from academics.models import Course, Department
from django.contrib.auth.models import User

class Student(models.Model):

    name = models.CharField(max_length=100)

    email = models.EmailField(unique=True)

    phone = models.CharField(max_length=15)

    is_existing_student = models.BooleanField(default=False)

    course = models.ForeignKey(
        Course,
        on_delete=models.PROTECT
    )

    department = models.ForeignKey(
        Department,
        on_delete=models.PROTECT
    )

    admission_year = models.PositiveIntegerField()

    roll_number = models.CharField(
        max_length=50,
        unique=True,
        null=True,
        blank=True
    )
    user = models.OneToOneField(
            User,
            on_delete=models.CASCADE,
            null=True,
            blank=True
    )
    def get_current_year(self):
        from datetime import datetime

        current_year = datetime.now().year

        year = current_year - self.admission_year + 1

        if year < 1:
            return 1

        if year > self.course.duration:
            return self.course.duration

        return year

    def __str__(self):
        return self.name