from rest_framework import routers, serializers, viewsets, status
from rest_framework.response import Response
from .serializers import UserSerializer, CaseSerializer, EventSerializer
from .models import Case, Event
from rest_framework import filters

# ViewSets define the view behavior.
# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
    

class CaseViewSet(viewsets.ModelViewSet):
    """
    List all workers, or create a new worker.
    """
    queryset = Case.objects.all()
    serializer_class = CaseSerializer


class EventViewSet(viewsets.ModelViewSet):
    """
    List all workkers, or create a new worker.
    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer
