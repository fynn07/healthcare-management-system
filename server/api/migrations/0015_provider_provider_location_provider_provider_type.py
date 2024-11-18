# Generated by Django 5.1.2 on 2024-11-17 05:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_allergyhistory'),
    ]

    operations = [
        migrations.AddField(
            model_name='provider',
            name='provider_location',
            field=models.CharField(default='Labangon, Cebu City, Cebu', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='provider',
            name='provider_type',
            field=models.CharField(default='Hospital', max_length=50),
            preserve_default=False,
        ),
    ]