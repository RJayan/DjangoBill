from rest_framework import serializers
from mart.models import Products
from django.contrib.auth import get_user_model
User = get_user_model()


class ProductsListSerializer(serializers.ListSerializer):
    #multiple updates done
    def update(self,instance,validated_data):

        product_mapping={product.product_upc: product for product in instance}
        data_mapping={item['product_upc']:item for item in validated_data}
        updated=[]
        for upc_value,data in data_mapping.items():
            product=product_mapping.get(upc_value,None)
            if data['should_delete']==True:
                Products.objects.get(product_upc=data["product_upc"]).delete()
                continue
            elif product is None:
                updated.append(self.child.create(data))
            else:
                updated.append(self.child.update(product,data))
        return(updated)

    def create(self, validated_data):
        #bulk_create works
        products=[Products(product_price=item['product_price'],product_upc=item['product_upc'],product_stock=item['product_stock'],product_name=item['product_name']) for item in validated_data]
        return(Products.objects.bulk_create(products))



class ProductsSerializer(serializers.ModelSerializer):
    should_delete=serializers.BooleanField(required=False,default='false')

    class Meta:
        list_serializer_class=ProductsListSerializer
        model=Products
        fields=('product_upc','product_name','product_stock','should_delete','product_price')
