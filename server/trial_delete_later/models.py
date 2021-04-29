from django.db import models
from datetime import datetime
# Create your models here.

class Case(models.Model):
    case_number = models.AutoField(primary_key=True)
                # models.UUIDField(
                # primary_key=True,
                # default=1,
                # editable=False)
    person_name = models.CharField(max_length=50)
    identity_document_number = models.CharField(max_length=50, unique=True, default="0000000")
    date_of_birth = models.DateField(default=datetime.now, blank=True)
    date_of_onset_of_symptoms = models.DateField(default=datetime.now, blank=True)
    date_of_confirmation_of_infection_by_testing = models.DateField(default=datetime.now, blank=True)

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
