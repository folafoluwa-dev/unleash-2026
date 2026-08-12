from django.conf.urls import static
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
def health_check(request):
    return JsonResponse({"status": "ok"})

urlpatterns = [
    path("admin/", admin.site.urls),

    path(
        "api/",
        include("registrations.urls"),
    ),
    path(
        "api/",
        include("gallery.urls"),
    ),
    path(
        "api/",
        include("speakers.urls"),
    ),
    path(
        "api/",
        include("events.urls"),
    ),
    path(
        "api/",
        include("contact.urls"),
    ),
    path("api/health/", health_check),
]
if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )