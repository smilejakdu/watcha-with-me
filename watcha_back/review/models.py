from django.db    import models
from board.models import Board
from users.models import User

# Create your models here.

class Review(models.Model):
    content = models.TextField()
    board   = models.ForeignKey(Board , on_delete=models.CASCADE)
    user    = models.ForeignKey(User , on_delete=models.CASCADE)

    class Meta:
        db_table = 'reviews'
