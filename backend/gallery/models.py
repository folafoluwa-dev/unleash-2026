from django.db import models

class Media(models.Model):
    CATEGORY_CHOICES = [
        ("event", "Event"),
        ("youth", "Youth"),
        ("worship", "Worship"),
        ("speakers", "Speakers"),
        ("church", "Church"),
        ("other", "Other"),
    ]

    title = models.CharField(max_length=200, blank=True)
    caption = models.TextField(blank=True)
    image = models.ImageField(upload_to="media/")
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        default="event",
    )
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["display_order", "-created_at"]

    def __str__(self):
        return self.title or f"Media {self.pk}"