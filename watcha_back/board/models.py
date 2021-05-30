from django.db    import models
from users.models import User

class Board(models.Model):
    title   = models.CharField(max_length=200)
    content = models.CharField(max_length=250)
    user    = models.ForeignKey(User , on_delete=models.CASCADE)

    class Meta:
        db_table = 'boards'

class BoardImg(models.Model):
    board    = models.ForeignKey(Board , on_delete=models.CASCADE)
    img_path = models.ImageField(upload_to='images/', blank=True, null=True)

    class Meta:
        db_table = 'board_imgs'
