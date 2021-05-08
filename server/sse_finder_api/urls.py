from rest_framework.routers import SimpleRouter
from django.urls import path
from .views import CaseViewSet, EventViewSet

router = SimpleRouter()
router.register("cases", CaseViewSet, "cases")
router.register("events", EventViewSet, "events")

urlpatterns = router.urls