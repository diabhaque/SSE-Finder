from rest_framework import serializers
from .models import Case, Event

class CaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Case
        fields = ("case_number", "person_name", "identify_document_number",
                  "date_of_birth", "date_of_onset_of_symptoms",
                  "date_of_confirmation_of_infection_by_testing")


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ("Cases", "date_of_the_event", "venue_name", "venue_location",
                  "address_of_the_venue_location",
                  "hk1980_grid_coordinates_of_the_venue_location",
                  "description_of_the_event")
