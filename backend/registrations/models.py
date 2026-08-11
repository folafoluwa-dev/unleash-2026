from django.db import models
import uuid


class Registration(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
        ("attended", "Attended"),
        ("cancelled", "Cancelled"),
    ]

    registration_id = models.CharField(
        max_length=20,
        unique=True,
        editable=False
    )

    full_name = models.CharField(max_length=150)

    email = models.EmailField()

    phone_number = models.CharField(max_length=20)

    age = models.PositiveIntegerField()

    city = models.CharField(max_length=100)

    additional_information = models.TextField(
        blank=True,
        default=""
    )

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