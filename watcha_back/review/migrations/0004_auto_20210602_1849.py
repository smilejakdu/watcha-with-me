# Generated by Django 3.1.5 on 2021-06-02 18:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('review', '0003_review_created_at'),
    ]

    operations = [
        migrations.RenameField(
            model_name='review',
            old_name='email',
            new_name='nickname',
        ),
    ]
