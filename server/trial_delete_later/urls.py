from . import views
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register("cases", views.CaseViewSet, "cases")

urlpatterns = router.urls

# how to create a url endpoint for a model, e.g. cases
# Create Model
# Add serializer for the Model
# Create a ViewSet for the model. Or others tbh.
# Add it to urls.py of app
# access /api/"name_of_model"