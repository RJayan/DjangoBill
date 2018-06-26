from mart.BuyersSerializer import BuyersSerializer,BoughtSerializer,POSProductsSerializer,BuyersCustomerOnlySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,generics,permissions
from random import randint
from mart.models import Buyers,Products
from mart.permissions import IsOwnerOrReadOnly,PosPermissions
import jwt
from django.contrib.auth import get_user_model
from djangoreactdemo.settings import SIMPLE_JWT

secret_key=SIMPLE_JWT["SIGNING_KEY"]
User = get_user_model()


class BuyersCustomerOnly(APIView):
    permission_classes=(IsOwnerOrReadOnly,)
    def get(self,request,str,format=None):
        bill=Buyers.objects.get(unique_identifier_string=str)

        #check date of saving
        if bill.customers_date_time_allowed_verification():
            serializer=BuyersCustomerOnlySerializer(bill)
            return(Response(serializer.data))
        else:
            return(Response(status=status.HTTP_404_NOT_FOUND))


def Token(token):
    try:
        data=jwt.decode(token,secret_key,algorithms=['HS512'])
        if data["username"]:
            print('valid')
            print('data:::::',data)
        elif data["code"]:
            print('expired')
            print('data:::::',data)
        else:
            print('else')
            print('data:::::',data)
    except ExpiredSignatureError:
        print('expired')
        #redirect to get new token
    else:
        print('in try else')

class BuyersBuyingList(APIView):

    def get(self, request):
        #check if pos employee or manager
        products = Products.objects.all()
        serializer = POSProductsSerializer(products, many=True)
        return Response(serializer.data,status=status.HTTP_202_ACCEPTED)


    def post(self,request):
        #check the token
        token=request.data.pop("token")
        try:
            data=jwt.decode(token,secret_key,algorithms=['HS512'])
            username=data["username"]
        except Exception:
            return(Response(status=status.HTTP_400_BAD_REQUEST))

        #check authorisation manager or employee has it
        if(User.objects.get(username=username).is_pos_employee or User.objects.get(username=username).is_store_manager):
            serializer=BuyersSerializer(data=request.data)
            if serializer.is_valid():
                #send mail if it was given

                #create a string and check if exists in database if does create new else use it
                def unique_string_giver():
                    unique_identifier_string=''
                    tupleset=('1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a',
                    'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
                    'o', 'p', 'q', 'r', 's', 't', 'v', 'u', 'w', 'x', 'y', 'z', 'A',
                    'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
                        'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z')
                    for k in range(randint(45,50)):
                        #values to between 45 and 50
                        unique_identifier_string+=tupleset[randint(0,61)]
                    return(unique_identifier_string)
                unique_string=unique_string_giver()
                try:
                    while(Buyers.objects.get(product_upc=unique_string)):
                        #if it is in database gives object else throws
                        unique_string=unique_string_giver()
                        #once out of this means new string not in db

                except Exception:
                    #does not exist in db
                    serializer.validated_data["unique_identifier_string"]=unique_string
                    serializer.save()


                    return Response(serializer.data,status=status.HTTP_201_CREATED)  #creation done
                return(Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST))
        return(Response(status=status.HTTP_405_METHOD_NOT_ALLOWED))



"""

class BuyersBuyingList(APIView):
    permission_classes=(permissions.IsAuthenticated,)
    #def perform_create(self, serializer):
        #serializer.save(owner=self.request.user)

    def get(self, request):
        try:
            x=User.objects.get(username=self.request.user)
            if x.is_store_manager or x.is_pos_employee:
                products = Products.objects.all()
                serializer = POSProductsSerializer(products, many=True)
                return Response(serializer.data,status=status.HTTP_202_ACCEPTED)
            else:
                #redirect to the login page
                return(Response(status=status.HTTP_405_METHOD_NOT_ALLOWED))
        except Exception:
            return(Response(status=status.HTTP_417_EXPECTATION_FAILED))




    def post(self,request):
        try:
            x=User.objects.get(username=self.request.user)
            if x.is_store_manager or x.is_pos_employee:
                serializer=BuyersSerializer(data=request.data)
                if serializer.is_valid():
                    #send mail if it was given

                    #create a string and check if exists in database if does create new else use it
                    def unique_string_giver():
                        unique_identifier_string=''
                        tupleset=('1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a',
                         'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
                          'o', 'p', 'q', 'r', 's', 't', 'v', 'u', 'w', 'x', 'y', 'z', 'A',
                           'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
                            'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z')
                        for k in range(randint(45,50)): #values to between 45 and 50
                            unique_identifier_string+=tupleset[randint(0,61)]
                        return(unique_identifier_string)
                    unique_string=unique_string_giver()
                    try:
                        while(Buyers.objects.get(product_upc=unique_string)):
                            #if it is in database gives object else throws
                            unique_string=unique_string_giver()
                            #once out of this means new string not in db
                    except Exception:
                        #does not exist in db
                        serializer.validated_data["unique_identifier_string"]=unique_string
                        #removing customers data in response to the POST from pos
                        serializer.validated_data.pop('customers_email')
                        serializer.validated_data.pop('customers_contact_number')
                        serializer.save()

                        return Response(serializer.data,status=status.HTTP_201_CREATED)  #creation done
                return(Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST))

            else:
                return(Response(status=status.HTTP_405_METHOD_NOT_ALLOWED))
        except ValueError:
            return(Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST))
"""
