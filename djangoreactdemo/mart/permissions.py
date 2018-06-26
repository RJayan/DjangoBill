from rest_framework import permissions
import jwt
from djangoreactdemo.settings import SIMPLE_JWT
#import djangoreactdemo.settings.JWT_AUTH.JWT_SECRET_KEY as secret_key

secret_key=SIMPLE_JWT["SIGNING_KEY"]

#print('permissions.SAFE_METHODS::::;',permissions.SAFE_METHODS)

class IsOwnerOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        #Write permissions are only allowed to the owner of the snippet.
        return obj.owner == request.user

class PosPermissions(permissions.BasePermission):
    #print('permissions')
    def has_object_permission(self, request, view, obj):
        print('kin here')
        print('reequest',request)
