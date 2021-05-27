from django.db import models

class User(models.Model):
    email    = models.EmailField(max_length=250)

    class Meta:
        db_table = 'users'
