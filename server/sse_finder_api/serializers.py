from rest_framework import serializers
from .models import Case, Event, User

# Serializers define the API representation.
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')

class CaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Case
        fields = (
            "case_number", 
            "person_name", 
            "identify_document_number",
            "date_of_birth", 
            "date_of_onset_of_symptoms",
            "date_of_confirmation_of_infection_by_testing",
            "events"
        )
        extra_kwargs = {'events': {'required': False}}

class EventSerializer(serializers.ModelSerializer):
    cases = CaseSerializer(many=True, read_only=True)
    class Meta:
        model = Event
        fields = (
            "cases",
            "id",
            "date_of_the_event", 
            "venue_name",
            "venue_location",
            "address_of_the_venue_location",
            "hk1980_grid_coordinates_of_the_venue_location",
            "description_of_the_event"
        )
        extra_kwargs = {'cases': {'required': False}}
