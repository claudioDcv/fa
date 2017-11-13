from django.contrib import admin
from apps.event.models import Event, EventStatus, Invitation



@admin.register(EventStatus)
class EventStatusAdmin(admin.ModelAdmin):
    pass


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    pass


@admin.register(Invitation)
class InvitationAdmin(admin.ModelAdmin):
    pass
