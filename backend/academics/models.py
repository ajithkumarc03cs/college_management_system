from django.db import models


class CourseLevel(models.Model):

    name = models.CharField(
        max_length=50,
        unique=True
    )

    def __str__(self):
        return self.name


class Course(models.Model):

    name = models.CharField(
        max_length=100,
        unique=True
    )

    code = models.CharField(
        max_length=20,
        unique=True
    )

    level = models.ForeignKey(
        CourseLevel,
        on_delete=models.PROTECT
    )

    duration = models.PositiveIntegerField()

    description = models.TextField(
        blank=True
    )

    def __str__(self):
        return f"{self.code} - {self.name}"

class Department(models.Model):

    name = models.CharField(
        max_length=100,
        unique=True
    )

    code = models.CharField(
        max_length=20,
        unique=True,
        null=True,
        blank=True
    )

    def __str__(self):
        return f"{self.code} - {self.name}"

class Subject(models.Model):

    name = models.CharField(max_length=200)

    code = models.CharField(
        max_length=20,
        unique=True
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

    def __str__(self):
        return f"{self.code} - {self.name}"



# class WebsiteDepartment(models.Model):

#     name = models.CharField(
#         max_length=100
#     )

#     icon = models.CharField(
#         max_length=20,
#         blank=True
#     )

#     description = models.TextField(
#         blank=True
#     )

#     order = models.PositiveIntegerField(
#         default=0
#     )

#     is_active = models.BooleanField(
#         default=True
#     )

#     def __str__(self):
#         return self.name