from django.db import models
from django.contrib.postgres.fields import ArrayField
import uuid

class Events(models.Model):
    title = models.CharField(max_length=10000)
    category = models.CharField(max_length=255)
    description = models.CharField(max_length=10000)
    link = models.CharField(max_length=10000)
    img = models.CharField(max_length=10000)
    location = models.CharField(max_length=10000)
    month = models.CharField(max_length=20)
    day = models.IntegerField()
    weekday = models.CharField(max_length=20)
    time = models.CharField(max_length=20)

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        # Truncate fields to their max_length if necessary
        self.title = self.title[:9999]
        self.category = self.category[:255]
        self.description = self.description[:9999]
        self.link = self.link[:9999]
        self.img = self.img[:9999]
        self.location = self.location[:9999]
        self.month = self.month[:20]
        self.weekday = self.weekday[:20]
        self.time = self.time[:20]
        super().save(*args, **kwargs)

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