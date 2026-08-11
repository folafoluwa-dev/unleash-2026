from django.db import models

class EventSettings(models.Model):
    event_name = models.CharField(max_length=200)
    theme = models.CharField(max_length=200, blank=True)

    start_date = models.DateField()
    end_date = models.DateField()

    start_time = models.TimeField(null=True, blank=True)

    venue = models.CharField(max_length=200)
    address = models.TextField()

    registration_open = models.BooleanField(default=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.event_name