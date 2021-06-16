from django.db    import models
from users.models import User

class Scheduler(models.Model):
    genre = models.CharField(max_length = 250 , null=True)
    title = models.CharField(max_length = 250 , null=True)
    date  = models.CharField(max_length = 250 , null=True)
    user  = models.ForeignKey(User, on_delete=models.CASCADE)
    
    class Meta:
        db_table = 'schedulers'
