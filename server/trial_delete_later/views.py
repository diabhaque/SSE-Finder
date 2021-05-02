from django.shortcuts import render
from rest_framework import viewsets
from django.http import HttpResponse
from .serializers import CaseSerializer
from .models import Case

# Create your views here.

def CaseViewSet(request):
    #return HttpResponse("Hello, world. You're at the polls index.")
    #serializer_class = CaseSerializer
    queryset = Case.objects.all()
    output = ', '.join([q.person_name for q in queryset])
    return HttpResponse(output)
