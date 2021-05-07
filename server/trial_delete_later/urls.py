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
    path('cases/', views.case_list, name='case_list'),
    path('cases/<int:case_id>', views.case_detail, name='case_detail'),
    path('events/', views.event_list, name='event_list'),
    path('events/<int:pk>', views.event_detail, name='event_detail'),
    path('sse/<str:start>/<str:end>', views.compute_sse, name='compute_sse')
    path('add/events/<int:pk>/cases/<int:case_id>', views.event_case_add, name='event_related'),
    path('events/cases/<int:pk>', views.event_related_to_case, name='event_related'),
    path('cases/events/<int:pk>', views.case_related_to_event, name='case_related'),
 
]

######################################
#/api/cases
#GET:       get all case records (DISPLAY)
#POST:      add new case record (CREATE)

#e.g.: /api/cases/1
#GET:       get case record of case_number=1 (DISPLAY)
#PUT:       update case record of case_number=1 (UPDATE)
#DELETE:    delete case record of case_number=1 (REMOVE)

#/api/events
#GET:       get all event records (DISPLAY)
#POST:      add new event record (CREATE)

#e.g.: /api/events/1
#GET:       get event record of pk=1 (DISPLAY)
#PUT:       update event record of pk=1 (UPDATE)
#DELETE:    delete event record of pk=1 (REMOVE)

#e.g.: /api/events/cases/1
#GET:       get all event records of case_number=1 (DISPLAY)
#DELETE:    delete event record of case_number=1 (REMOVE)

#######################################

# how to create a url endpoint for a model, e.g. cases
# Create Model
# Add serializer for the Model
# Create a ViewSet for the model. Or others tbh.
# Add it to urls.py of app
# access /api/"name_of_model"
