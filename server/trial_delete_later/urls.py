from . import views
from rest_framework.routers import SimpleRouter
from django.urls import path

# router = SimpleRouter()
# router.register("cases", views.CaseViewSet, "cases")
#
# urlpatterns = router.urls

app_name='trial_delete_later'
urlpatterns = [
    # ex: /polls/
    path('', views.CaseViewSet, name='CaseViewSet'),

]

# how to create a url endpoint for a model, e.g. cases
# Create Model
# Add serializer for the Model
# Create a ViewSet for the model. Or others tbh.
# Add it to urls.py of app
# access /api/"name_of_model"
