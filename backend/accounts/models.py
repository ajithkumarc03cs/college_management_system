from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User
from academics.models import Subject

class Role(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
from academics.models import Department

class UserProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    role = models.ForeignKey(
        Role,
        on_delete=models.PROTECT
    )

    department = models.ForeignKey(
        Department,
        on_delete=models.PROTECT,
        null=True,
        blank=True
    )

    def __str__(self):
        return f"{self.user.username} - {self.role.name}"

class StaffAssignment(models.Model):

    staff = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    subject = models.ForeignKey(
        Subject,
        on_delete=models.PROTECT
    )

    assigned_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["staff", "subject"],
                name="unique_staff_subject"
            )
        ]

    def __str__(self):
        return f"{self.staff.username} - {self.subject.name}"





class Permission(models.Model):
    name = models.CharField(max_length=100, unique=True)
    code = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class RolePermission(models.Model):
    role = models.ForeignKey(
        Role,
        on_delete=models.CASCADE,
        related_name="permissions"
    )

    permission = models.ForeignKey(
        Permission,
        on_delete=models.CASCADE,
        related_name="role_permissions"
    )

    can_view = models.BooleanField(default=False)
    can_create = models.BooleanField(default=False)
    can_edit = models.BooleanField(default=False)
    can_delete = models.BooleanField(default=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["role", "permission"],
                name="unique_role_permission"
            )
        ]

    def __str__(self):
        return f"{self.role.name} - {self.permission.name}"

        
class SidebarMenu(models.Model):

    name = models.CharField(
        max_length=100,
        unique=True
    )

    path = models.CharField(
        max_length=200,
        unique=True
    )

    icon = models.CharField(
        max_length=50,
        blank=True,
        default=""
    )

    order = models.PositiveIntegerField(
        default=0
    )

    is_active = models.BooleanField(
        default=True
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["order", "id"]


class RoleMenu(models.Model):

    role = models.ForeignKey(
        Role,
        on_delete=models.CASCADE,
        related_name="menus"
    )

    menu = models.ForeignKey(
        SidebarMenu,
        on_delete=models.CASCADE,
        related_name="roles"
    )

    is_visible = models.BooleanField(
        default=True
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["role", "menu"],
                name="unique_role_menu"
            )
        ]

    def __str__(self):
        return f"{self.role.name} - {self.menu.name}"













class WebsiteSettings(models.Model):
    college_name = models.CharField(
        max_length=200,
        default="EduManage College"
    )

    tagline = models.CharField(
        max_length=300,
        default="Excellence in Education"
    )

    description = models.TextField(
        blank=True
    )

    address = models.TextField(
        blank=True
    )

    phone = models.CharField(
        max_length=30,
        blank=True
    )

    email = models.EmailField(
        blank=True
    )

    logo = models.ImageField(
        upload_to="website/logo/",
        blank=True,
        null=True
    )

    facebook = models.URLField(
        blank=True
    )

    instagram = models.URLField(
        blank=True
    )

    youtube = models.URLField(
        blank=True
    )

    linkedin = models.URLField(
        blank=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.college_name




class WebsiteMenu(models.Model):
    name = models.CharField(max_length=100)

    path = models.CharField(max_length=200)

    order = models.PositiveIntegerField(default=0)

    is_active = models.BooleanField(default=True)

    open_in_new_tab = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.name






# ============================================================
# PUBLIC HOME PAGE
# ============================================================


class HomePage(models.Model):
    hero_small_title = models.CharField(
        max_length=200,
        default="Welcome to EduManage College"
    )

    hero_title = models.CharField(
        max_length=300,
        default="Build Your Future With Quality Education"
    )

    hero_description = models.TextField(
        default="Discover knowledge, develop your skills, and build a successful career with us."
    )

    hero_button_1_text = models.CharField(
        max_length=100,
        default="Apply Now"
    )

    hero_button_1_link = models.CharField(
        max_length=200,
        default="/admissions"
    )

    hero_button_2_text = models.CharField(
        max_length=100,
        default="Explore Courses"
    )

    hero_button_2_link = models.CharField(
        max_length=200,
        default="/courses"
    )

    hero_image = models.ImageField(
        upload_to="website/home/hero/",
        blank=True,
        null=True
    )

    about_label = models.CharField(
        max_length=200,
        default="About Our College"
    )

    about_title = models.CharField(
        max_length=300,
        default="Education That Creates Opportunities"
    )

    about_description_1 = models.TextField(
        default="EduManage College provides quality education with modern learning facilities and experienced faculty members."
    )

    about_description_2 = models.TextField(
        default="Our goal is to help students develop academic knowledge, technical skills and professional confidence."
    )

    about_image = models.ImageField(
        upload_to="website/home/about/",
        blank=True,
        null=True
    )

    courses_label = models.CharField(
        max_length=200,
        default="Academic Programs"
    )

    courses_title = models.CharField(
        max_length=300,
        default="Our Popular Courses"
    )

    courses_description = models.TextField(
        default="Explore our undergraduate and postgraduate programs."
    )

    admission_label = models.CharField(
        max_length=200,
        default="Admissions Open"
    )

    admission_title = models.CharField(
        max_length=300,
        default="Start Your College Journey Today"
    )

    admission_description = models.TextField(
        default="Applications are now open for the upcoming academic year."
    )

    admission_button_text = models.CharField(
        max_length=100,
        default="Apply Now"
    )

    admission_button_link = models.CharField(
        max_length=200,
        default="/admissions"
    )

    offers_label = models.CharField(
        max_length=200,
        default="Scholarships & Offers"
    )

    offers_title = models.CharField(
        max_length=300,
        default="Special Opportunities"
    )

    departments_label = models.CharField(
        max_length=200,
        default="Academics"
    )

    departments_title = models.CharField(
        max_length=300,
        default="Our Departments"
    )

    why_label = models.CharField(
        max_length=200,
        default="Why EduManage"
    )

    why_title = models.CharField(
        max_length=300,
        default="Why Choose Our College?"
    )

    facilities_label = models.CharField(
        max_length=200,
        default="Campus"
    )

    facilities_title = models.CharField(
        max_length=300,
        default="Our Facilities"
    )

    events_label = models.CharField(
        max_length=200,
        default="Campus Life"
    )

    events_title = models.CharField(
        max_length=300,
        default="Upcoming Events"
    )

    notices_label = models.CharField(
        max_length=200,
        default="Updates"
    )

    notices_title = models.CharField(
        max_length=300,
        default="Latest News & Notices"
    )

    placement_label = models.CharField(
        max_length=200,
        default="Career & Placement"
    )

    placement_title = models.CharField(
        max_length=300,
        default="Build Your Career With Us"
    )

    placement_description = models.TextField(
        default="Connect with companies and explore career opportunities through our placement program."
    )

    placement_button_text = models.CharField(
        max_length=100,
        default="Explore Placements"
    )

    placement_button_link = models.CharField(
        max_length=200,
        default="/placements"
    )

    gallery_label = models.CharField(
        max_length=200,
        default="Campus Life"
    )

    gallery_title = models.CharField(
        max_length=300,
        default="College Gallery"
    )

    testimonial_label = models.CharField(
        max_length=200,
        default="Student Experiences"
    )

    testimonial_title = models.CharField(
        max_length=300,
        default="What Our Students Say"
    )

    contact_label = models.CharField(
        max_length=200,
        default="Contact Us"
    )

    contact_title = models.CharField(
        max_length=300,
        default="Get In Touch With Us"
    )

    contact_description = models.TextField(
        default="Have questions about admissions, courses or our college?"
    )

    contact_address = models.CharField(
        max_length=300,
        default="Madurai, Tamil Nadu"
    )

    contact_phone = models.CharField(
        max_length=50,
        default="+91 XXXXX XXXXX"
    )

    contact_email = models.EmailField(
        default="college@example.com"
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return "Home Page"

    class Meta:
        verbose_name = "Home Page"
        verbose_name_plural = "Home Page"



class HomeStatistic(models.Model):

    home = models.ForeignKey(
        HomePage,
        on_delete=models.CASCADE,
        related_name="statistics"
    )

    icon = models.CharField(
        max_length=50,
        default="🎓"
    )

    value = models.CharField(
        max_length=100
    )

    label = models.CharField(
        max_length=200
    )

    order = models.PositiveIntegerField(
        default=0
    )

    is_active = models.BooleanField(
        default=True
    )

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.label



class HomeCourse(models.Model):

    home = models.ForeignKey(
        HomePage,
        on_delete=models.CASCADE,
        related_name="courses"
    )

    course_type = models.CharField(
        max_length=100
    )

    name = models.CharField(
        max_length=200
    )

    duration = models.CharField(
        max_length=100
    )

    image = models.ImageField(
        upload_to="website/home/courses/",
        blank=True,
        null=True
    )

    order = models.PositiveIntegerField(
        default=0
    )

    is_active = models.BooleanField(
        default=True
    )

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.name




class HomeOffer(models.Model):

    home = models.ForeignKey(
        HomePage,
        on_delete=models.CASCADE,
        related_name="offers"
    )

    icon = models.CharField(
        max_length=50,
        default="🎓"
    )

    title = models.CharField(
        max_length=200
    )

    description = models.TextField()

    order = models.PositiveIntegerField(
        default=0
    )

    is_active = models.BooleanField(
        default=True
    )

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title



class HomeDepartment(models.Model):

    home = models.ForeignKey(
        HomePage,
        on_delete=models.CASCADE,
        related_name="departments"
    )

    icon = models.CharField(
        max_length=50,
        default="💻"
    )

    name = models.CharField(
        max_length=200
    )

    description = models.CharField(
        max_length=300
    )

    order = models.PositiveIntegerField(
        default=0
    )

    is_active = models.BooleanField(
        default=True
    )

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.name











class HomeWhyChoose(models.Model):

    home = models.ForeignKey(
        HomePage,
        on_delete=models.CASCADE,
        related_name="why_choose_us"
    )

    icon = models.CharField(
        max_length=50,
        default="👨‍🏫"
    )

    title = models.CharField(
        max_length=200
    )

    description = models.TextField()

    order = models.PositiveIntegerField(
        default=0
    )

    is_active = models.BooleanField(
        default=True
    )

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title



class HomeFacility(models.Model):

    home = models.ForeignKey(
        HomePage,
        on_delete=models.CASCADE,
        related_name="facilities"
    )

    title = models.CharField(
        max_length=200
    )

    image = models.ImageField(
        upload_to="website/home/facilities/",
        blank=True,
        null=True
    )

    order = models.PositiveIntegerField(
        default=0
    )

    is_active = models.BooleanField(
        default=True
    )

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title




class HomeEvent(models.Model):

    home = models.ForeignKey(
        HomePage,
        on_delete=models.CASCADE,
        related_name="events"
    )

    date = models.CharField(
        max_length=100
    )

    title = models.CharField(
        max_length=200
    )

    description = models.TextField()

    image = models.ImageField(
        upload_to="website/home/events/",
        blank=True,
        null=True
    )

    order = models.PositiveIntegerField(
        default=0
    )

    is_active = models.BooleanField(
        default=True
    )

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title




class HomeNotice(models.Model):

    home = models.ForeignKey(
        HomePage,
        on_delete=models.CASCADE,
        related_name="notices"
    )

    date = models.CharField(
        max_length=100
    )

    title = models.CharField(
        max_length=300
    )

    order = models.PositiveIntegerField(
        default=0
    )

    is_active = models.BooleanField(
        default=True
    )

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title





class HomeGallery(models.Model):

    home = models.ForeignKey(
        HomePage,
        on_delete=models.CASCADE,
        related_name="gallery"
    )

    image = models.ImageField(
        upload_to="website/home/gallery/"
    )

    order = models.PositiveIntegerField(
        default=0
    )

    is_active = models.BooleanField(
        default=True
    )

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return f"Gallery Image {self.id}"





class HomeTestimonial(models.Model):

    home = models.ForeignKey(
        HomePage,
        on_delete=models.CASCADE,
        related_name="testimonials"
    )

    message = models.TextField()

    student = models.CharField(
        max_length=200
    )

    course = models.CharField(
        max_length=200
    )

    order = models.PositiveIntegerField(
        default=0
    )

    is_active = models.BooleanField(
        default=True
    )

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.student





class CoursePage(models.Model):

    hero_label = models.CharField(
        max_length=200,
        default="Academic Programs"
    )

    hero_title = models.CharField(
        max_length=200,
        default="Our Courses"
    )

    hero_description = models.TextField(
        blank=True
    )

    intro_label = models.CharField(
        max_length=200,
        default="Academic Excellence"
    )

    intro_title = models.CharField(
        max_length=200,
        default="Find the Right Course for You"
    )

    intro_description = models.TextField(
        blank=True
    )

    cta_title = models.CharField(
        max_length=200,
        default="Ready to Start Your Journey?"
    )

    cta_description = models.TextField(
        blank=True
    )

    cta_button_text = models.CharField(
        max_length=100,
        default="Apply Now"
    )

    cta_button_link = models.CharField(
        max_length=200,
        default="/admissions"
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.hero_title




class CoursePageCourse(models.Model):

    page = models.ForeignKey(
        CoursePage,
        on_delete=models.CASCADE,
        related_name="courses"
    )

    course_type = models.CharField(
        max_length=100
    )

    name = models.CharField(
        max_length=200
    )

    department = models.CharField(
        max_length=200
    )

    duration = models.CharField(
        max_length=100
    )

    description = models.TextField(
        blank=True
    )

    image = models.ImageField(
        upload_to="courses/",
        blank=True,
        null=True
    )

    order = models.PositiveIntegerField(
        default=0
    )

    is_active = models.BooleanField(
        default=True
    )

    def __str__(self):
        return self.name






class AboutPage(models.Model):
    hero_label = models.CharField(
        max_length=200,
        default="About Us"
    )
    hero_title = models.CharField(
        max_length=200,
        default="About EduManage College"
    )
    hero_description = models.TextField(
        blank=True
    )

    intro_label = models.CharField(
        max_length=200,
        default="Who We Are"
    )
    intro_title = models.CharField(
        max_length=200,
        default="Building Knowledge, Skills and Confidence"
    )
    intro_description_1 = models.TextField(
        blank=True
    )
    intro_description_2 = models.TextField(
        blank=True
    )
    intro_description_3 = models.TextField(
        blank=True
    )
    intro_image = models.ImageField(
        upload_to="about/",
        blank=True,
        null=True
    )

    direction_label = models.CharField(
        max_length=200,
        default="Our Direction"
    )
    direction_title = models.CharField(
        max_length=200,
        default="Vision & Mission"
    )

    vision_title = models.CharField(
        max_length=200,
        default="Our Vision"
    )
    vision_description = models.TextField(
        blank=True
    )

    mission_title = models.CharField(
        max_length=200,
        default="Our Mission"
    )
    mission_description = models.TextField(
        blank=True
    )

    values_label = models.CharField(
        max_length=200,
        default="Our Values"
    )
    values_title = models.CharField(
        max_length=200,
        default="What We Believe In"
    )

    facilities_label = models.CharField(
        max_length=200,
        default="Campus"
    )
    facilities_title = models.CharField(
        max_length=200,
        default="Our Facilities"
    )

    cta_label = models.CharField(
        max_length=200,
        default="Join Us"
    )
    cta_title = models.CharField(
        max_length=200,
        default="Start Your Academic Journey"
    )
    cta_description = models.TextField(
        blank=True
    )
    cta_button_1_text = models.CharField(
        max_length=100,
        default="Explore Courses"
    )
    cta_button_1_link = models.CharField(
        max_length=200,
        default="/courses"
    )
    cta_button_2_text = models.CharField(
        max_length=100,
        default="Apply Now"
    )
    cta_button_2_link = models.CharField(
        max_length=200,
        default="/admissions"
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.hero_title


class AboutValue(models.Model):
    page = models.ForeignKey(
        AboutPage,
        on_delete=models.CASCADE,
        related_name="values"
    )
    icon = models.CharField(
        max_length=50,
        default="🎓"
    )
    title = models.CharField(
        max_length=200
    )
    description = models.TextField(
        blank=True
    )
    order = models.PositiveIntegerField(
        default=0
    )
    is_active = models.BooleanField(
        default=True
    )

    def __str__(self):
        return self.title


class AboutFacility(models.Model):
    page = models.ForeignKey(
        AboutPage,
        on_delete=models.CASCADE,
        related_name="facilities"
    )
    title = models.CharField(
        max_length=200
    )
    description = models.TextField(
        blank=True
    )
    image = models.ImageField(
        upload_to="about/facilities/",
        blank=True,
        null=True
    )
    order = models.PositiveIntegerField(
        default=0
    )
    is_active = models.BooleanField(
        default=True
    )

    def __str__(self):
        return self.title




class WebsiteDepartment(models.Model):

    name = models.CharField(
        max_length=200
    )

    icon = models.CharField(
        max_length=50,
        default="💻"
    )

    description = models.TextField(
        blank=True
    )

    order = models.PositiveIntegerField(
        default=0
    )

    is_active = models.BooleanField(
        default=True
    )

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.name


class WebsiteDepartmentsPage(models.Model):

    hero_label = models.CharField(
        max_length=100,
        default="Departments"
    )

    hero_title = models.CharField(
        max_length=250,
        default="Our Departments"
    )

    hero_description = models.TextField(
        blank=True,
        default=(
            "Explore our academic departments and discover "
            "opportunities for learning, research and career growth."
        )
    )

    section_label = models.CharField(
        max_length=100,
        default="ACADEMICS"
    )

    section_title = models.CharField(
        max_length=250,
        default="Explore Our Academic Departments"
    )

    section_description = models.TextField(
        blank=True,
        default=(
            "Our departments provide quality education, practical "
            "learning and opportunities for students to develop their skills."
        )
    )

    cta_title = models.CharField(
        max_length=250,
        default="Find the Right Course for Your Future"
    )

    cta_description = models.TextField(
        blank=True,
        default=(
            "Explore our courses and choose the academic program "
            "that matches your career goals."
        )
    )

    cta_button_text = models.CharField(
        max_length=100,
        default="Explore Courses"
    )

    cta_button_link = models.CharField(
        max_length=250,
        default="/courses"
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return "Departments Page"

    class Meta:
        verbose_name = "Departments Page"
        verbose_name_plural = "Departments Page"







class WebsiteAdmissionsPage(models.Model):
    hero_label = models.CharField(
        max_length=100,
        default="Admissions"
    )
    hero_title = models.CharField(
        max_length=250,
        default="Start Your College Journey"
    )
    hero_description = models.TextField(
        blank=True,
        default="Learn about our admission process, requirements and opportunities."
    )

    process_label = models.CharField(
        max_length=100,
        default="How It Works"
    )
    process_title = models.CharField(
        max_length=250,
        default="Admission Process"
    )

    requirements_label = models.CharField(
        max_length=100,
        default="Requirements"
    )
    requirements_title = models.CharField(
        max_length=250,
        default="Documents Required"
    )
    requirements_description = models.TextField(
        blank=True,
        default="Applicants may need to submit the following documents during the admission process."
    )

    cta_title = models.CharField(
        max_length=250,
        default="Need Admission Assistance?"
    )
    cta_description = models.TextField(
        blank=True,
        default="Contact our admission team for more information."
    )
    cta_button_text = models.CharField(
        max_length=100,
        default="Contact Us"
    )
    cta_button_link = models.CharField(
        max_length=250,
        default="/contact"
    )

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Admissions Page"
        verbose_name_plural = "Admissions Page"

    def __str__(self):
        return "Admissions Page"


class WebsiteAdmissionStep(models.Model):
    number = models.CharField(
        max_length=20,
        default="01"
    )
    title = models.CharField(max_length=250)
    description = models.TextField(blank=True)

    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title


class WebsiteAdmissionDocument(models.Model):
    name = models.CharField(max_length=250)

    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.name








class WebsiteEventsPage(models.Model):
    hero_label = models.CharField(
        max_length=100,
        default="Campus Life"
    )
    hero_title = models.CharField(
        max_length=250,
        default="Events & Activities"
    )
    hero_description = models.TextField(
        blank=True,
        default="Stay updated with college events, programs and activities."
    )

    section_label = models.CharField(
        max_length=100,
        default="What's Happening"
    )
    section_title = models.CharField(
        max_length=250,
        default="Upcoming Events"
    )

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Events Page"
        verbose_name_plural = "Events Page"

    def __str__(self):
        return "Events Page"


class WebsiteEvent(models.Model):
    date = models.DateField()
    title = models.CharField(max_length=250)
    description = models.TextField(blank=True)

    image = models.ImageField(
        upload_to="website/events/",
        blank=True,
        null=True
    )

    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["date", "order", "id"]

    def __str__(self):
        return self.title






class WebsiteGalleryPage(models.Model):
    hero_label = models.CharField(
        max_length=100,
        default="Campus Life"
    )
    hero_title = models.CharField(
        max_length=250,
        default="College Gallery"
    )
    hero_description = models.TextField(
        blank=True,
        default="Explore our campus, facilities, events and student activities."
    )

    section_label = models.CharField(
        max_length=100,
        default="Our Memories"
    )
    section_title = models.CharField(
        max_length=250,
        default="Campus Gallery"
    )

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Gallery Page"
        verbose_name_plural = "Gallery Page"

    def __str__(self):
        return "Gallery Page"


class WebsiteGalleryItem(models.Model):
    title = models.CharField(max_length=250)

    image = models.ImageField(
        upload_to="website/gallery/"
    )

    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title










class WebsiteContactPage(models.Model):
    hero_label = models.CharField(
        max_length=100,
        default="Contact Us"
    )
    hero_title = models.CharField(
        max_length=250,
        default="Get In Touch With Us"
    )
    hero_description = models.TextField(
        blank=True,
        default="Have questions about admissions, courses or our college? Contact us."
    )

    section_label = models.CharField(
        max_length=100,
        default="Contact Information"
    )
    section_title = models.CharField(
        max_length=250,
        default="We Would Love to Hear From You"
    )
    section_description = models.TextField(
        blank=True,
        default="Contact our college team for admissions, academic and general enquiries."
    )

    address = models.TextField(
        blank=True,
        default="Madurai, Tamil Nadu, India"
    )

    phone = models.CharField(
        max_length=100,
        blank=True,
        default="+91 98765 43210"
    )

    email = models.EmailField(
        blank=True,
        default="info@edumanagecollege.com"
    )

    form_title = models.CharField(
        max_length=250,
        default="Send Us a Message"
    )

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Contact Page"
        verbose_name_plural = "Contact Page"

    def __str__(self):
        return "Contact Page"


class WebsiteContactMessage(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(
        max_length=100,
        blank=True
    )
    message = models.TextField()

    is_read = models.BooleanField(default=False)

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name













# ============================================================
# WEBSITE NOTICES
# ============================================================

class WebsiteNoticesPage(models.Model):
    hero_label = models.CharField(
        max_length=100,
        default="Updates"
    )

    hero_title = models.CharField(
        max_length=250,
        default="Notices & Announcements"
    )

    hero_description = models.TextField(
        blank=True,
        default="Stay informed about the latest college announcements and updates."
    )

    section_label = models.CharField(
        max_length=100,
        default="Latest Updates"
    )

    section_title = models.CharField(
        max_length=250,
        default="College Notices"
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        verbose_name = "Notices Page"
        verbose_name_plural = "Notices Page"

    def __str__(self):
        return "Notices Page"


class WebsiteNotice(models.Model):

    date = models.DateField()

    category = models.CharField(
        max_length=100
    )

    title = models.CharField(
        max_length=250
    )

    description = models.TextField(
        blank=True
    )

    order = models.PositiveIntegerField(
        default=0
    )

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ["-date", "order", "id"]

    def __str__(self):
        return self.title



# ============================================================
# WEBSITE PLACEMENTS
# ============================================================

class WebsitePlacementsPage(models.Model):

    hero_label = models.CharField(
        max_length=100,
        default="Career & Placement"
    )

    hero_title = models.CharField(
        max_length=250,
        default="Build Your Career With Us"
    )

    hero_description = models.TextField(
        blank=True,
        default="Explore career development and placement opportunities available to our students."
    )

    intro_label = models.CharField(
        max_length=100,
        default="Placement Support"
    )

    intro_title = models.CharField(
        max_length=250,
        default="Preparing Students for the Future"
    )

    intro_description_1 = models.TextField(
        blank=True,
        default="Our placement activities help students develop technical knowledge, communication skills and professional confidence."
    )

    intro_description_2 = models.TextField(
        blank=True,
        default="Students can participate in training, career guidance and recruitment activities."
    )

    intro_image = models.ImageField(
        upload_to="website/placements/",
        blank=True,
        null=True
    )

    feature_label = models.CharField(
        max_length=100,
        default="Career Development"
    )

    feature_title = models.CharField(
        max_length=250,
        default="Placement Activities"
    )

    cta_title = models.CharField(
        max_length=250,
        default="Interested in Our Programs?"
    )

    cta_description = models.TextField(
        blank=True,
        default="Explore our courses and start preparing for your career."
    )

    cta_button_text = models.CharField(
        max_length=100,
        default="Explore Courses"
    )

    cta_button_link = models.CharField(
        max_length=250,
        default="/courses"
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        verbose_name = "Placements Page"
        verbose_name_plural = "Placements Page"

    def __str__(self):
        return "Placements Page"


class WebsitePlacementFeature(models.Model):

    icon = models.CharField(
        max_length=50,
        default="💼"
    )

    title = models.CharField(
        max_length=250
    )

    description = models.TextField(
        blank=True
    )

    order = models.PositiveIntegerField(
        default=0
    )

    is_active = models.BooleanField(
        default=True
    )

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title




class CourseApplication(models.Model):

    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Contacted", "Contacted"),
        ("Rejected", "Rejected"),
    ]

    course = models.ForeignKey(
        CoursePageCourse,
        on_delete=models.CASCADE,
        related_name="applications"
    )

    applicant_name = models.CharField(max_length=150)

    email = models.EmailField()

    address = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Pending"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.applicant_name} - {self.course.name}"
