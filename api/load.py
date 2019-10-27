import os
from django.contrib.gis.utils import LayerMapping
from .models import OriginalMeterData
from .models import testmodel_mapping as mapping_dict

# mapping_dict = {
#     'fips' : 'FIPS',
#     'iso2' : 'ISO2',
#     'iso3' : 'ISO3',
#     'un' : 'UN',
#     'name' : 'NAME',
#     'area' : 'AREA',
#     'pop2005' : 'POP2005',
#     'region' : 'REGION',
#     'subregion' : 'SUBREGION',
#     'lon' : 'LON',
#     'lat' : 'LAT',
#     'mpoly' : 'MULTIPOLYGON',
# }

world_shp = os.path.abspath(
    '/Users/jaredfuelberth/PycharmProjects/parallel/data/changed2/Parking_Space_File.shp',
    # os.path.join(os.path.dirname(__file__), 'data', 'TM_WORLD_BORDERS-0.3.shp'),
)

def run(verbose=True):
    lm = LayerMapping(OriginalMeterData, world_shp, mapping_dict, transform=False)
    # lm = LayerMapping(OriginalMeterData, world_shp, mapping_dict, transform=False, source_srs='+proj=tmerc +lat_0=40.25 +lon_0=-96.68805555555555 +k=1.000054615 +x_0=49999.99999999998 +y_0=0 +ellps=GRS80 +units=us-ft +no_defs ')
    lm.save(strict=True, verbose=verbose)
