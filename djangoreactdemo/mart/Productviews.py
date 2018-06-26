from mart.models import Products,Buyers
from mart.ProductsSerializer import ProductsSerializer,ProductsListSerializer
from mart.BuyersSerializer import BuyersSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,permissions
from djangoreactdemo.settings import SIMPLE_JWT
from django.contrib.auth import get_user_model
import jwt

User = get_user_model()
secret_key=SIMPLE_JWT["SIGNING_KEY"]


class ProductsList(APIView):
    #permission_classes=(permissions.IsAuthenticated,)

    def get(self, request):
        products = Products.objects.all()
        serializer = ProductsSerializer(products, many=True)
        return Response(serializer.data,status=status.HTTP_202_ACCEPTED)



    def post(self, request, format=None):  #put for creating updating many

        #check token
        token=request.data.pop()["token"]
        try:
            data=jwt.decode(token,secret_key,algorithms=['HS512'])
            username=data["username"]
        except Exception:
            return(Response(status=status.HTTP_428_PRECONDITION_REQUIRED))

        #check authorisation    
        if (not (User.objects.get(username=username).is_store_manager)):
            return(Response(status=status.HTTP_401_UNAUTHORIZED))

        instance=[]
        for value in request.data[0]["update_products"]:
            try:
                instance.append(Products.objects.get(product_upc=value['product_upc']))
            except Exception:
                instance.append(Products.objects.create(product_upc=value['product_upc']
                        ,product_price=value['product_price'],product_name=value['product_name'],product_stock=value['product_stock']))

        serializer = ProductsSerializer(instance=instance,data=request.data[0]["update_products"],many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
