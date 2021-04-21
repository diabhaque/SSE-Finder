from django.db import models

# Create your models here.

class Case(models.Model):
    case_number = models.UUIDField(
                primary_key=True,
                default=uuid.uuid4,
                editable=False)
    person_name = models.CharField(max_length=50)
    identify_document_number = models.CharField(max_length=50, unique=True)
    date_of_birth = models.DateField()
    date_of_onset_of_symptoms = models.DateField()
    date_of_confirmation_of_infection_by_testing = models.DateField()

    def _str_(self):
        return self.case_number
