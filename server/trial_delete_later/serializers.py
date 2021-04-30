from rest_framework import serializers
from .models import Case

class CaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Case
        fields = ("case_number", "person_name", "identify_document_number",
                  "date_of_birth", "date_of_onset_of_symptoms",
                  "date_of_confirmation_of_infection_by_testing")
