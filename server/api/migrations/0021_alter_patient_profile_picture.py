# Generated by Django 5.1.2 on 2024-12-09 08:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0020_patient_profile_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='profile_picture',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]