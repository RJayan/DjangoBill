from django.urls import re_path,include,path
from mart import Productviews,Buyersviews,Managersviews,Advertisersviews
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView,TokenVerifyView

urlpatterns = format_suffix_patterns((
    #re_path(r'^users/$', Productviews.UserList.as_view()),
    #re_path(r'^users/(?P<pk>[0-9]+)/$', Productviews.UserDetail.as_view()),
    re_path(r'^productsdata/$', Productviews.ProductsList.as_view()),  #inventory endpoint
    re_path(r'^buyersdata/$', Buyersviews.BuyersBuyingList.as_view()), #pos endpoint
    re_path(r'^boughtdata/(?P<str>\w+)$', Buyersviews.BuyersCustomerOnly.as_view()), #bills endpoint
    #re_path(r'^bought/$', Buyersviews.UserList.as_view()),
    #re_path(r'^bought/(?P<pk>[0-9]+)/$', Buyersviews.UserDetail.as_view()),
    re_path(r'^manager/$',Managersviews.ManagersPosemployeeCreateView.as_view()),
    #re_path(r'^advertiser/',Advertisersviews.AdvertisersLinkstaker.as_view()),
))

urlpatterns += (
    re_path(r'^api/token/$', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    re_path(r'^token/refresh/$', TokenRefreshView.as_view(), name='token_refresh'),
    re_path(r'^token/verify/$', TokenVerifyView.as_view(), name='token_verify'),
    path('accounts/signup/advertiser/', Advertisersviews.AdvertiserSignUpView.as_view(), name='advertiser_signup'),
    re_path(r'^accounts/', include('django.contrib.auth.urls')),


    #re_path(r'^api-auth/',include('rest_framework.urls')),
)


"""

from django.urls import re_path,include
from mart import Productviews,Buyersviews,Managersviews,Advertisersviews
from rest_framework_jwt.views import obtain_jwt_token,refresh_jwt_token,verify_jwt_token
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = format_suffix_patterns([
    re_path(r'^users/$', Productviews.UserList.as_view()),
    re_path(r'^users/(?P<pk>[0-9]+)/$', Productviews.UserDetail.as_view()),
    re_path(r'^productsdata/$', Productviews.ProductsList.as_view()),  #inventory endpoint
    re_path(r'^buyersdata/$', Buyersviews.BuyersBuyingList.as_view()), #pos endpoint
    re_path(r'^boughtdata/(?P<str>\w+)$', Buyersviews.BuyersCustomerOnly.as_view()), #bills endpoint
    re_path(r'^bought/$', Buyersviews.UserList.as_view()),
    re_path(r'^bought/(?P<pk>[0-9]+)/$', Buyersviews.UserDetail.as_view()),
    #re_path(r'^manager/(?P<pk>[0-9]+)/$',Managersviews.POSEmployeesList.as_view()),
    re_path(r'^advertiser/',Advertisersviews.AdvertisersLinkstaker.as_view())
])

urlpatterns += [
    re_path(r'^api-token-auth/', obtain_jwt_token),
    re_path(r'^api-token-refresh/', refresh_jwt_token),
    re_path(r'^api-token-verify/', verify_jwt_token),
    re_path(r'^api-auth/',include('rest_framework.urls')),
]
"""
