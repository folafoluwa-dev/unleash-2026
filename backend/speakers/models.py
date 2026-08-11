from django.db import models

class Speaker(models.Model):
    name = models.CharField(max_length=150)
    title = models.CharField(max_length=150, blank=True)
    biography = models.TextField(blank=True)
    photo = models.ImageField(
        upload_to="speakers/",
        blank=True,
        null=True
    )
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["display_order", "name"]

    def __str__(self):
        return self.name
    
