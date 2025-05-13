import json

from django.views     import View
from django.http      import JsonResponse
from django.db        import transaction
from django.db.models import (
    F,
    Sum,
    IntegerField
)

from .models        import (
    OrderStatus,
    Order,
    ProductOrder
)
from user.models    import User
from product.models import (
)
from utils          import login_required 

class OrderView(View):
    @login_required
    def post(self, request, user_id):
        data = json.loads(request.body)
        user = User.objects.get(id=user_id)
        try:
            if not ShoeColorSize.objects.filter(shoecolor = ShoeColor.objects.get(id=data['id']), size = Size.objects.get(name=data['size'])).exists():
                return JsonResponse({'message' : 'NON_EXISTING_PRODUCT'}, status = 401)
                # 수정필요(재고없음)
            # product = ShoeColorSize.objects.get(
            #     shoecolor = ShoeColor.objects.get(id = data['id']),
            #     size      = Size.objects.get(name = data['size'])
            # )
            if product.quantity < int(data['quantity']):
                return JsonResponse({'message' : 'OUT_OF_STOCK'}, status=400)
            if Order.objects.filter(user=user, status = OrderStatus.objects.get(name='pending')).exists():
                user_order = Order.objects.get(user=user, status = OrderStatus.objects.get(name='pending'))
                if ProductOrder.objects.filter(order=user_order, product=product).exists():
                    order = ProductOrder.objects.get(
                        order          = user_order,
                        product        = product,
                    )
                    with transaction.atomic():
                        order.order_quantity = F('order_quantity') + data['quantity']
                        product.quantity = F('quantity') - data['quantity']
                        product.save()
                        order.save()
                        return JsonResponse({'message' : 'SUCCESS'}, status=200)
                with transaction.atomic():
                    order = ProductOrder.objects.create(
                        order          = user_order,
                        product        = product,
                        order_quantity = int(data['quantity'])
                    )
                    product.quantity = F('quantity') - data['quantity']
                    order.save()
                    product.save()
                    return JsonResponse({'message' : 'SUCCESS'}, status=200)
            with transaction.atomic():
                user_order = Order.objects.create(user=user, status=OrderStatus.objects.get(name='pending'))
                ProductOrder.objects.create(
                    order          = user_order,
                    product        = product,
                    order_quantity = int(data['quantity'])
                )
                product.quantity = F('quantity') - data['quantity']
                return JsonResponse({'message' : 'SUCCESS'}, status=200)
        except KeyError:
            return JsonResponse({'message' : 'KEY_ERROR'}, status=400)

class PendingOrderView(View):
    @login_required
    def get(self, request, user_id):
        user = User.objects.get(id=user_id)
        if not Order.objects.filter(
                user   = User.objects.get(id = user_id),
                status = OrderStatus.objects.get(name = "pending")
        ).exists():
            return JsonResponse({'pending_orders' : []}, status=200)
        order_list = ProductOrder.objects.filter(
            order = Order.objects.get(
                user   = User.objects.get(id = user_id),
                status = OrderStatus.objects.get(name = "pending")
            )).prefetch_related(
            "product",
            # "product__shoecolor__shoe",
            # "product__shoecolor__shoe__detail",
            # "product__shoecolor__image"
        )
        
        pending_orders = [
            {
                "order_id" : order.id,
                "id"       : order.product.id,
                "image"    : order.product.shoecolor.image.image,
                "name"     : order.product.shoecolor.shoe.detail.name,
                "price"    : int(order.product.shoecolor.shoe.price),
                "quantity" : order.order_quantity
            } for order in order_list
        ]

        total_price = int(order_list.aggregate(
            price = Sum(
                F('order_quantity')*F('product__shoecolor__shoe__price'),
                output_field = IntegerField()
            ))['price']) 
        return JsonResponse({"total_price" : total_price, "pending_orders" : pending_orders}, status=200)

class UpdateOrderView(View):
    @login_required
    def post(self, request, user_id):
        data = json.loads(request.body)
        user = User.objects.get(id=user_id)
        try:
            product_order = ProductOrder.objects.filter(id=data['order_id']).prefetch_related("product", "product__shoecolor").first()
            if data['calculate'] == 'plus':
                if product_order.product.quantity == 0:
                    return JsonResponse({'message' : 'OUT_OF_STOCK'}, status=400)
                with transaction.atomic():
                    product_order.order_quantity += 1
                    product_order.product.quantity -= 1
                    product_order.product.save()
                    product_order.save()
            elif data['calculate'] == 'minus':
                with transaction.atomic():
                    product_order.order_quantity -= 1
                    product_order.product.quantity += 1
                    product_order.product.save()
                    product_order.save()

            order_list = ProductOrder.objects.filter(
                order = Order.objects.get(
                    user   = User.objects.get(id = user_id),
                    status = OrderStatus.objects.get(name = "pending")
                )).prefetch_related(
                    "product",
                    # "product__shoecolor",
                    # "product__shoecolor__color",
                    # "product__shoecolor__shoe",
                    # "product__shoecolor__shoe__detail",
                    # "product__shoecolor__image"
                )

            pending_orders = [
                {
                    "order_id" : order.id,
                    "id"       : order.product.id,
                    "image"    : order.product.shoecolor.image.image,
                    "name"     : order.product.shoecolor.shoe.detail.name,
                    "price"    : int(order.product.shoecolor.shoe.price),
                    "quantity" : order.order_quantity
                } for order in order_list
            ]

            total_price = int(order_list.aggregate(
                price = Sum(
                    F('order_quantity')*F('product__shoecolor__shoe__price'),
                    output_field = IntegerField()
                ))['price']) 
            return JsonResponse({'total_price' : total_price, 'pending_orders' : pending_orders}, status=200)
        except KeyError:
            return JsonResponse({'message' : 'KEY_Error'}, status=400)

class DeleteOrderView(View):
    @login_required
    def post(self, request, user_id):
        user = User.objects.get(id=user_id)
        if Order.objects.filter(user=user, status=OrderStatus.objects.get(name='pending')).exists():
            orders = ProductOrder.objects.filter(
                order = Order.objects.get(
                    user   = user,
                    status = OrderStatus.objects.get(name = 'pending')
                )).prefetch_related("product", "order")
            with transaction.atomic():
                for order in orders:
                    order.product.quantity += order.order_quantity
                    order.product.save()
                Order.objects.get(user=user, status=OrderStatus.objects.get(name='pending')).delete()
                return JsonResponse({'pending_orders' : []}, status=200)
        return JsonResponse({'message' : 'NON_EXISTING_ORDER'}, status=400)