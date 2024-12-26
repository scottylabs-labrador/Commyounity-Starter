from django.db import models
from django.contrib.postgres.fields import ArrayField
import uuid

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
    username = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    nickname = models.CharField(max_length=100, default='New User')
    bio = models.CharField(max_length=500, default='Biography: Hi! I\'m new to Comm-you-nity, plz hmu if yall are interested in going out together! insta: @')
    password = models.CharField(max_length=100)
    email = models.CharField(max_length=100, unique=True, default='default@example.com')
    verified = models.BooleanField(default=False)
    preference = ArrayField(models.CharField(max_length=100), blank=True, default=list)
    events = ArrayField(models.IntegerField(), blank=True, default=list)

    def __str__(self):
        return self.username