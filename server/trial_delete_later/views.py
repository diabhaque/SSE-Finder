from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CaseSerializer
from .models import Case

# Create your views here.
def CaseViewSet(viewsets.ModelViewSet):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer
    
