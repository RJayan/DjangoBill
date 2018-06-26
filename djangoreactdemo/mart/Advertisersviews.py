from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,permissions
from mart.models import Advertiser
from mart.AdvertisersSerializer import AdvertisersSerializer
from django.contrib.auth import login
from django.shortcuts import redirect,render
from django.views.generic import CreateView
from django.http import HttpResponse,HttpResponseRedirect

from mart.forms import AdvertiserSignUpForm
from django.contrib.auth import get_user_model
User = get_user_model()

class AdvertiserSignUpView(CreateView):
    model = User
    form_class = AdvertiserSignUpForm
    template_name = 'mart/registration/signup_form.html'

    def get_context_data(self, **kwargs):
        kwargs['user_type'] = 'advertiser'
        return super().get_context_data(**kwargs)

    def get(self,request):
        return render(request, 'mart/registration/signup_form.html')

    def form_valid(self, form):
        user = form.save()
        #login(self.request, user)
        return(HttpResponseRedirect('http://127.0.0.1:8000/mart/api-auth/login/'))

class AdvertisersLinkstaker(APIView):

    def get(self, request, format=None):
        links = Advertiser.objects.all()
        serializer = AdvertisersSerializer(links, many=True)
        return Response(serializer.data)


    def post(self, request, format=None):
        serializer = AdvertisersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
