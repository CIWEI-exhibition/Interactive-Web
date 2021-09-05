from django.db import models

class MainCategory(models.Model):
    name = models.CharField(max_length = 50)

    class Meta:
        db_table = 'main_categories'

class ShoeCategory(models.Model):
    main_category = models.ForeignKey(MainCategory, on_delete = models.SET_NULL, null = True)
    name          = models.CharField(max_length = 50)

    class Meta:
        db_table = 'shoe_categories'

class Size(models.Model):
    name = models.IntegerField()

    class Meta:
        db_table = 'sizes'

class ColorFilter(models.Model):
    name = models.CharField(max_length = 50)

    class Meta:
        db_table = 'color_filters'

class Color(models.Model):
    color_category = models.ForeignKey(ColorFilter, on_delete = models.SET_NULL, null = True)
    name           = models.CharField(max_length = 50)

    class Meta:
        db_table = 'colors'

class TypeFilter(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        db_table = 'type_filters'

class GenderSegmentation(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        db_table = 'gender_segmentation'

class Detail(models.Model):
    main_detail   = models.CharField(max_length = 100)
    sub_detail    = models.CharField(max_length = 500)
    feature       = models.CharField(max_length = 500)
    feature_image = models.CharField(max_length = 300)
    name          = models.CharField(max_length = 50)
    is_main       = models.BooleanField(default = False)
    
    class Meta:
        db_table = 'details'

class Shoe(models.Model):
    main_category       = models.ForeignKey(MainCategory, on_delete = models.SET_NULL, null = True)
    shoe_category       = models.ForeignKey(ShoeCategory, on_delete = models.SET_NULL, null = True)
    type_filter         = models.ForeignKey(TypeFilter, on_delete   = models.SET_NULL, null = True)
    detail              = models.ForeignKey(Detail, on_delete = models.SET_NULL, null = True)
    gender_segmentation = models.ForeignKey(GenderSegmentation, on_delete = models.SET_NULL, null = True)
    price               = models.DecimalField(max_digits = 8, decimal_places=2)
    color               = models.ManyToManyField(Color, through = 'ShoeColor')

    class Meta:
        db_table = 'shoes'

class MainImage(models.Model):
    image = models.CharField(max_length=300)

    class Meta:
        db_table = 'main_images'

class ShoeColor(models.Model):
    shoe  = models.ForeignKey(Shoe, on_delete = models.SET_NULL, null = True)
    color = models.ForeignKey(Color, on_delete = models.SET_NULL, null = True)
    image = models.OneToOneField(MainImage, on_delete = models.SET_NULL, null = True)
    size  = models.ManyToManyField(Size, through = 'ShoeColorSize')
    
    class Meta:
        db_table = 'shoes_colors'

class ShoeColorSize(models.Model):
    shoecolor = models.ForeignKey(ShoeColor, on_delete = models.SET_NULL, null = True)
    size      = models.ForeignKey(Size, on_delete = models.SET_NULL, null = True)
    quantity  = models.IntegerField()
    
    class Meta:
        db_table = 'shoecolor_sizes'

class SubImage(models.Model):
    shoe_color  = models.ForeignKey(ShoeColor, on_delete = models.SET_NULL, null = True)
    image       = models.CharField(max_length = 300)
    is_hovered  = models.BooleanField(default = False)
    
    class Meta:
        db_table = 'sub_images'