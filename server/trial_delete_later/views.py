import json
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import CaseSerializer, EventSerializer
from .models import Case, Event
import datetime


# Create your views here.

# Create your views here.
#Viewset is unused now.
#api_view is used since it provides more controls
"""
def CaseViewSet(viewsets.ModelViewSet):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer
"""

#/api/cases
#GET:       get all case records (DISPLAY)
#POST:      add new case record (CREATE)
@api_view(['GET', 'POST'])
def case_list(request):
    if request.method == 'GET':
        cases = Case.objects.all()
        serializer = CaseSerializer(cases, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CaseSerializer(data=request.data)
        print(serializer.is_valid)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

#e.g.: /api/cases/1
#GET:       get case record of case_number=1 (DISPLAY)
#PUT:       update case record of case_number=1 (UPDATE)
#DELETE:    delete case record of case_number=1 (REMOVE)
@api_view(['GET', 'PUT', 'DELETE'])
def case_detail(request, case_id):
    try:
        case = Case.objects.get(case_number=case_id)
    except Case.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CaseSerializer(case)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CaseSerializer(case, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        case.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#/api/events
#GET:       get all event records (DISPLAY)
#POST:      add new event record (CREATE)
@api_view(['GET', 'POST'])
def event_list(request):
    if request.method == 'GET':
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

#e.g.: /api/events/1
#GET:       get event record of pk=1 (DISPLAY)
#PUT:       update event record of pk=1 (UPDATE)
#DELETE:    delete event record of pk=1 (REMOVE)
@api_view(['GET', 'PUT', 'DELETE'])
def event_detail(request, pk):
    try:
        event = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = EventSerializer(event)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CaseSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def event_case_add(request, pk, case_id):
    try:
        event = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    try:
        case = Case.objects.get(case_number=case_id)
    except Case.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    event.Cases.add(case)
    return Response(status=status.HTTP_201_CREATED)


#e.g.: /api/events/cases/1
#GET:       get all event records of case_number=1 (DISPLAY)
#DELETE:    delete event record of case_number=1 (REMOVE)

@api_view(['GET', 'DELETE'])
def event_related_to_case(request, pk):
    try:
        events = Event.objects.filter(Cases__case_number=pk)
        print(events)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

    #elif request.method == 'PUT':

    elif request.method == 'DELETE':
        events.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'DELETE'])
def case_related_to_event(request, pk):
    try:
        cases = Case.objects.filter(event__pk=pk)
        print(cases)
    except Case.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CaseSerializer(cases, many=True)
        return Response(serializer.data)

    #elif request.method == 'PUT':

    elif request.method == 'DELETE':
        events.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



@api_view(['GET'])
def compute_sse(request, start, end):
    start_date = datetime.datetime.strptime(start, "%Y-%m-%d").date()
    end_date = datetime.datetime.strptime(end, "%Y-%m-%d").date()
    #print(start_date)
    #print(end_date)
    sse_query = Event.objects.none()
    print(sse_query)
    event = Event.objects.filter(date_of_the_event__gte=start_date).filter(date_of_the_event__lte=end_date)
    print(event)
    places = list(dict.fromkeys([i.venue_location for i in event]))#remove duplicate
    print(places)
    for i in places:
        #compute sse
        evt = event.filter(venue_location=i)
        counts = Case.objects.filter(event__venue_location=i).count()
        print(counts)
        evt.update(count=counts)
        if counts >= 6:
            sse_query = sse_query | evt

    serializer = EventSerializer(sse_query, many=True)
    return  Response(serializer.data)


"""
def CaseViewSet(request):
    #return HttpResponse("Hello, world. You're at the polls index.")
    #serializer_class = CaseSerializer
    queryset = Case.objects.all()
    output = ', '.join([q.person_name for q in queryset])
    return HttpResponse(output)
"""

{
    "case_number": "1",
    "date_of_the_event": "2021-05-07",
    "venue_name": "Stadium",
    "venue_location": "asdfgh",
    "address_of_the_venue_location": "asdfgh",
    "hk1980_grid_coordinates_of_the_venue_location": "asdfghj",
    "description_of_the_event": "asdfghjkl"
}