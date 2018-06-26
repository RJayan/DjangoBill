from django.contrib.auth.models import AbstractUser
from django.db import models
import datetime
from django.utils import timezone



class User(AbstractUser):
    email = models.EmailField(unique=False,)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_pos_employee=models.BooleanField(default=False)
    is_advertiser=models.BooleanField(default=False)
    is_store_manager=models.BooleanField(default=False)

    def has_usable_password(self):
        return(True)

    def save(self,*args,**kwargs):
        if self.is_store_manager:
            Manager.objects.create(manager=self.username)
        elif self.is_pos_employee:
            Employee.objects.create(employee=self.username)
        elif self.is_advertiser:
            Advertiser.objects.create(advertiser=self.username)
        super(User,self).save(*args,**kwargs)


class Employee(models.Model):
    employee=models.CharField(max_length=30,primary_key=True)

    def __str__(self):
        return(self.employee)

class Manager(models.Model):
    manager=models.CharField(max_length=30,primary_key=True)

    def __str__(self):
        return(self.manager)


class Advertiser(models.Model):
    advertiser=models.CharField(max_length=30,primary_key=True)

    def __str__(self):
        return(self.advertiser)


class Advertiser_ads(models.Model):
    advertiser=models.ForeignKey(Advertiser,on_delete=models.CASCADE)
    source_of_image_or_gif=models.CharField(max_length=100)
    redirected_to_link=models.CharField(max_length=100)



class Products(models.Model):
    product_upc=models.CharField(max_length=20,default='not given')
    product_name=models.CharField(max_length=30)
    product_stock=models.IntegerField(default=0)
    product_price=models.DecimalField(max_digits=10,decimal_places=2)

    def __str__(self):
        return(self.product_name)


class Buyers(models.Model):
    employee_id=models.CharField(max_length=30,)
    performance=models.DecimalField(max_digits=3,decimal_places=2,default=0)
    unique_identifier_string=models.CharField(primary_key=True,unique=True,max_length=50)
    date_and_time_of_purchase=models.DateTimeField('date_of_purchase',auto_now_add=True)
    customers_email=models.CharField(default='not given',max_length=50)
    customers_contact_number=models.IntegerField(default=0)

    def customers_date_time_allowed_verification(self):
        return(self.date_and_time_of_purchase>=timezone.now()-datetime.timedelta(days=3)) #currently set to three days

    def __str__(self):
        return(self.unique_identifier_string)

    class Meta:
        ordering=('date_and_time_of_purchase',)


class StoreManager(models.Model):
    manager_id=models.ForeignKey(Manager,on_delete=models.CASCADE)
    products=models.ForeignKey(Products,related_name='managers',on_delete=models.CASCADE)
    bills=models.ForeignKey(Buyers,related_name='bills',on_delete=models.PROTECT) #protect bills

    def __str__(self):
        return(self.manager_id)


class Bought(models.Model):
    consumer_unique_string=models.ForeignKey(Buyers,related_name='buyers_bought_list',on_delete=models.CASCADE)
    bought_product_name=models.CharField('bought_product_name',max_length=30)
    bought_product_upc=models.CharField('bought_product_upc',max_length=20,default='not given')
    bought_product_qty=models.IntegerField('bought_product_qty',default=0)
    bought_product_price=models.DecimalField('bought_product_price',max_digits=10,decimal_places=2)

    def __str__(self):
        return(self.consumer_unique_string)



"""

from django.db import models
import datetime
from django.utils import timezone



class Products(models.Model):
    #owner=models.ForeignKey('auth.User',related_name='products',default=1,on_delete=models.CASCADE)
    product_upc=models.CharField(max_length=20,default='not given')
    product_name=models.CharField(max_length=30)
    product_stock=models.IntegerField(default=0)
    #product_price=models.IntegerField(default=0)
    product_price=models.DecimalField(max_digits=10,decimal_places=2)

    def __str__(self):
        return(self.product_name)


class Buyers(models.Model):
    employee_id=models.ForeignKey('auth.User',related_name='buyers',default=1,on_delete=models.CASCADE)
    performance=models.DecimalField(max_digits=3,decimal_places=2,default=0)
    unique_identifier_string=models.CharField(primary_key=True,unique=True,max_length=50)
    date_and_time_of_purchase=models.DateTimeField('date_of_purchase',auto_now_add=True)
    customers_email=models.CharField(default='not given',max_length=50)
    customers_contact_number=models.IntegerField(default=0)

    def customers_date_time_allowed_verification(self):
        return(self.date_and_time_of_purchase >= timezone.now()-datetime.timedelta(days=3))

    def __str__(self):
        return(self.unique_identifier_string)
    class Meta:
        ordering=('date_and_time_of_purchase',)


class Bought(models.Model):
    consumer_unique_string=models.ForeignKey(Buyers,related_name='buyers_bought_list',on_delete=models.CASCADE)
    bought_product_name=models.CharField('bought_product_name',max_length=30)
    bought_product_upc=models.CharField('bought_product_upc',max_length=20,default='not given')
    bought_product_qty=models.IntegerField('bought_product_qty',default=0)
    bought_product_price=models.DecimalField('bought_product_price',max_digits=10,decimal_places=2)

    def __str__(self):
        return(self.consumer_unique_string)



class Advertiser(models.Model):
    source_of_image_or_gif=models.CharField(max_length=100)
    redirected_to_link=models.CharField(max_length=100)
"""
