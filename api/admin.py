from django.contrib.gis import admin

from .models import OriginalMeterData

# admin.site.register(OriginalMeterData, admin.GeoModelAdmin)

from django.contrib.gis.admin import OSMGeoAdmin
from .models import OriginalMeterData

@admin.register(OriginalMeterData)
class OriginalMeterDataAdmin(OSMGeoAdmin):
    list_display = ('id', 'e_key', 'type', 'meter_num', 'geom')
