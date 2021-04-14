from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CaseSerializer
from .models import Case

# Create your views here.

class CaseViewSet(viewsets.ModelViewSet): 
    serializer_class = CaseSerializer
    queryset = Case.objects.all()