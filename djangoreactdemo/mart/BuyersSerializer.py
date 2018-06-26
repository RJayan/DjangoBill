from rest_framework import serializers
from mart.models import Buyers,Bought,Products,Employee
from django.contrib.auth import get_user_model
User = get_user_model()



class BoughtSerializer(serializers.ModelSerializer):
    bought_product_price=serializers.DecimalField(max_digits=10,decimal_places=2,required=False)
    class Meta:
        model=Bought
        fields=('bought_product_upc','bought_product_name','bought_product_qty','bought_product_price')

#for get requests for bills no customers data or employee data returned
class BuyersCustomerOnlySerializer(serializers.ModelSerializer):

    #unique_identifier_string=serializers.CharField(required=False,max_length=50)
    buyers_bought_list=BoughtSerializer(many=True)
    class Meta:
        model=Buyers
        fields=('date_and_time_of_purchase','unique_identifier_string','buyers_bought_list')

    #don't allow create
    def create(self,validated_data):
        return(None)




class BuyersSerializer(serializers.ModelSerializer):
    employee_id = serializers.CharField(max_length=30,write_only=True)
    customers_email=serializers.CharField(required=False,max_length=50,write_only=True)
    customers_contact_number=serializers.IntegerField(required=False,write_only=True)
    unique_identifier_string=serializers.CharField(required=False,max_length=50)
    buyers_bought_list=BoughtSerializer(many=True)

    class Meta:
        model=Buyers
        fields=('date_and_time_of_purchase','unique_identifier_string','performance',
                'buyers_bought_list','customers_email','customers_contact_number','employee_id')

    def create(self,validated_data):
        bought_data=validated_data.pop('buyers_bought_list')
        bought=Buyers.objects.create(**validated_data)
        for bought_product_data in bought_data:

            product=Products.objects.get(product_upc=bought_product_data["bought_product_upc"])
            bought_product_data['bought_product_price']=product.product_price
            product.product_stock-=bought_product_data["bought_product_qty"]
            product.save()
            Bought.objects.create(consumer_unique_string=bought,**bought_product_data)
        return(bought)


class POSProductsSerializer(serializers.ModelSerializer):

    class Meta:
        model=Products
        fields=('product_upc','product_name','product_price')
