# Generated by Django 5.1.2 on 2024-11-02 03:56

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_vaccinationhistory_brand_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='FamilyHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_added', models.DateField()),
                ('relationship', models.CharField(max_length=30)),
                ('condition_illness', models.CharField(max_length=50)),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.patient')),
            ],
        ),
    ]
