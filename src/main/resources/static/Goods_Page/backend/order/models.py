from django.db import models

from user.models    import User
from product.models import ShoeColorSize

class OrderStatus(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        db_table = 'order_status'

class Order(models.Model):
    user          = models.ForeignKey(User, on_delete = models.SET_NULL, null = True)
    status        = models.ForeignKey(OrderStatus, on_delete = models.SET_NULL, null = True)
    order_date    = models.DateTimeField(auto_now_add = True)
    product_order = models.ManyToManyField(ShoeColorSize, through = 'ProductOrder')

    class Meta:
        db_table = 'orders'

class ProductOrder(models.Model):
    order          = models.ForeignKey(Order, on_delete = models.SET_NULL, null = True)
    product        = models.ForeignKey(ShoeColorSize, on_delete = models.SET_NULL, null = True)
    order_quantity = models.IntegerField()

    class Meta:
        db_table = 'products_orders'