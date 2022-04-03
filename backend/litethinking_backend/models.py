from django.db import models


class Business(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    nit = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
