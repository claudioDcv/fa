from django.contrib import admin

from .models import UserInfo, AvailableSpace


@admin.register(UserInfo)
class UserInfoAdmin(admin.ModelAdmin):
    pass


@admin.register(AvailableSpace)
class AvailableSpaceAdmin(admin.ModelAdmin):
    pass
