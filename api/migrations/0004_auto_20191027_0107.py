# Generated by Django 2.2.6 on 2019-10-27 01:07

import django.contrib.gis.db.models.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20191026_2150'),
    ]

    operations = [
        migrations.AlterField(
            model_name='originalmeterdata',
            name='geom',
            field=django.contrib.gis.db.models.fields.PointField(srid=4019),
        ),
    ]
