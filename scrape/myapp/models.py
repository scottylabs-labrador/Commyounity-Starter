from django.db import models

class Events(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    month = models.CharField(max_length=20)
    day = models.IntegerField()
    weekday = models.CharField(max_length=20)
    time = models.CharField(max_length=20)

    def __str__(self):
        return self.title

class User(models.Model):
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.username