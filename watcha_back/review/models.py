from django.db    import models
from board.models import Board
from users.models import User

class Review(models.Model):
    content = models.TextField()
    board   = models.ForeignKey(Board , on_delete=models.CASCADE)
    email   = models.CharField(max_length=200)
    user    = models.ForeignKey(User , on_delete=models.CASCADE)

    class Meta:
        db_table = 'reviews'
