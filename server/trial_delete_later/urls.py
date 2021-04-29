from . import views
from django.urls import path
from rest_framework.routers import SimpleRouter
app_name='trial_delete_later'
#router = SimpleRouter()
#router.register("cases", views.CaseViewSet, "cases")

#urlpatterns = router.urls

urlpatterns = [
    path('', views.CaseViewSet, name="CaseViewSet")
]

#urlpatterns += router.urls

# how to create a url endpoint for a model, e.g. cases
# Create Model
# Add serializer for the Model
# Create a ViewSet for the model. Or others tbh.
# Add it to urls.py of app
# access /api/"name_of_model"
