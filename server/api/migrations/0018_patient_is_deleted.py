# Generated by Django 5.1.2 on 2024-12-08 13:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_allergyhistory_is_deleted_familyhistory_is_deleted_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='patient',
            name='is_deleted',
            field=models.BooleanField(default=False),
        ),
    ]