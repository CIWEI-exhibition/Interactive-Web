from django.db import models

class Gender(models.Model):
    name = models.CharField(max_length = 50)

    class Meta:
        db_table = 'genders'

class User(models.Model):
    email        = models.EmailField(max_length = 255, unique = True)
    password     = models.CharField(max_length = 100)
    name         = models.CharField(max_length = 50)
    phone_number = models.CharField(max_length = 50, unique = True)
    birth_date   = models.DateField()
    gender       = models.ForeignKey(Gender, on_delete = models.SET_NULL, null = True)
    is_active    = models.BooleanField(default = False)

    class Meta:
        db_table = 'users'