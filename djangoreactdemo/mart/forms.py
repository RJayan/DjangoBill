from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.db import transaction

from mart.models import Advertiser, User

class AdvertiserSignUpForm(UserCreationForm):

    class Meta(UserCreationForm.Meta):
        model = User

    @transaction.atomic
    def save(self):
        user = super().save(commit=False)
        user.is_advertiser = True
        user.is_staff=False
        user.save()
        advertiser = Advertiser.objects.create(advertiser=user)
        #student.interests.add(*self.cleaned_data.get('interests'))
        return user
