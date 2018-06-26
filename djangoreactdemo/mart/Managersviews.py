#from mart.ManagersSerializers import
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,permissions
from mart.ManagersSerializers import POSEmployeeCreateSerializer
#from django.contrib.auth.models import User
from mart.permissions import IsOwnerOrReadOnly
#from time import strftime
from django.contrib.auth import get_user_model
User = get_user_model()

class ManagersPosemployeeCreateView(APIView):
    pass
    def post(self,request):
        serializer=POSEmployeeCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)  #creation done
        return(Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST))
