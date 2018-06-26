from rest_framework import serializers
from mart.models import Advertiser
from django.contrib.auth import get_user_model
User = get_user_model()

class AdvertisersSerializer(serializers.ModelSerializer):

    class Meta:
        model=Advertiser
        fields=('source_of_image_or_gif','redirected_to_link')
