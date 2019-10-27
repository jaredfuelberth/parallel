# from django.db import models

from django.contrib.gis.db import models
# Create your models here.


class Meter(models.Model):
    zone = models.CharField(max_length=6)
    space = models.CharField(max_length=20)
    point = models.PointField()


# class Person(models.Model):
#     first_name = models.CharField(max_length=30)
#     last_name = models.CharField(max_length=30)

# This is an auto-generated Django model module created by ogrinspect.
class OriginalMeterData(models.Model):
    objectid = models.BigIntegerField()
    enf_zone = models.CharField(max_length=21)
    restrict_field = models.CharField(max_length=21)
    type = models.CharField(max_length=21)
    post_num = models.CharField(max_length=11)
    meter_num = models.CharField(max_length=12)
    mech_num = models.CharField(max_length=11)
    coll_zone = models.CharField(max_length=11)
    park_rate = models.CharField(max_length=12)
    a_st = models.CharField(max_length=50)
    b_x = models.CharField(max_length=50)
    c_side = models.CharField(max_length=50)
    d_n = models.CharField(max_length=50)
    e_key = models.CharField(max_length=50)
    capacity = models.IntegerField()
    handicap = models.IntegerField()
    loading = models.IntegerField()
    motorcycle = models.IntegerField()
    public_field = models.IntegerField()
    onstreet = models.IntegerField()
    struct = models.IntegerField()
    hooded = models.CharField(max_length=50)
    removedate = models.DateField(null=True)
    space = models.CharField(max_length=254)
    globalid = models.CharField(max_length=38)
    geom = models.PointField(srid=4019)


# Auto-generated `LayerMapping` dictionary for TestModel model
testmodel_mapping = {
    'objectid': 'OBJECTID',
    'enf_zone': 'ENF_ZONE',
    'restrict_field': 'RESTRICT_',
    'type': 'TYPE',
    'post_num': 'POST_NUM',
    'meter_num': 'METER_NUM',
    'mech_num': 'MECH_NUM',
    'coll_zone': 'COLL_ZONE',
    'park_rate': 'PARK_RATE',
    'a_st': 'A_St',
    'b_x': 'B_X',
    'c_side': 'C_Side',
    'd_n': 'D_N',
    'e_key': 'E_Key',
    'capacity': 'Capacity',
    'handicap': 'HandiCap',
    'loading': 'Loading',
    'motorcycle': 'Motorcycle',
    'public_field': 'Public_',
    'onstreet': 'OnStreet',
    'struct': 'Struct',
    'hooded': 'Hooded',
    'removedate': 'RemoveDate',
    'space': 'Space',
    'globalid': 'GlobalID',
    'geom': 'POINT',
}
