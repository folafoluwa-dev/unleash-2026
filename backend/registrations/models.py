from django.db import models
import uuid


class Registration(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
        ("attended", "Attended"),
        ("cancelled", "Cancelled"),
    ]

    AGE_GROUP_CHOICES = [
        ("13-17", "13–17"),
        ("18-25", "18–25"),
        ("26-35", "26–35"),
        ("36-45", "36–45"),
        ("46-55", "46–55"),
        ("56+", "56+"),
    ]

    registration_id = models.CharField(
        max_length=20,
        unique=True,
        editable=False
    )

    # LOCCI information
    is_locci_member = models.BooleanField(default=False)

    locci_branch = models.CharField(
        max_length=150,
        blank=True,
        default=""
    )

    # Personal information
    full_name = models.CharField(max_length=150)

    email = models.EmailField()

    phone_number = models.CharField(max_length=20)

    age_group = models.CharField(
    max_length=10,
    choices=AGE_GROUP_CHOICES,
    default="18-25"
)

    city = models.CharField(max_length=100)

    additional_information = models.TextField(
        blank=True,
        default=""
    )

    # Registration information
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending"
    )

    registered_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.registration_id:
            year = 2026
            unique_part = uuid.uuid4().hex[:8].upper()
            self.registration_id = f"UNL-{year}-{unique_part}"

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.registration_id} - {self.full_name}"