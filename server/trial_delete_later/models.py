from django.db import models

# Create your models here.

class Case(models.Model):
    case_number = models.UUIDField(
                primary_key=True,
                editable=False)
    person_name = models.CharField(max_length=50)
    identify_document_number = models.CharField(max_length=50, unique=True)
    date_of_birth = models.DateField()
    date_of_onset_of_symptoms = models.DateField()
    date_of_confirmation_of_infection_by_testing = models.DateField()

    def _str_(self):
        return self.person_name


class Event(models.Model):
    Cases = models.ManyToManyField(Case)
    date_of_the_event = models.DateField()
    vanue_name = models.CharField(max_length=50)
    vanue_location = models.CharField(max_length=256)
    address_of_the_venue_location = models.CharField(max_length=256)
    hk1980_grid_coordinates_of_the_venue_location = models.CharField(max_length=256)
    description_of_the_event = models.CharField(max_length=256)
    count = models.IntegerField(default=0)
    
    def _str_(self):
        return self.venue_name
