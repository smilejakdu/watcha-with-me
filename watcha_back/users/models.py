from django.db import models

class User(models.Model):
    nickname   = models.CharField(max_length = 250 , null = True)
    password   = models.CharField(max_length = 200 , null = True)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    class Meta:
        db_table = 'users'
