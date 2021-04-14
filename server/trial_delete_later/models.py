from django.db import models

# Create your models here.

class Case(models.Model):
    name = models.CharField(max_length=50)
    hasCovid = models.BooleanField(default=True)

    def _str_(self):
        return self.name