from django.contrib import admin
from apps.event.models import Event, EventStatus



@admin.register(EventStatus)
class EventStatusAdmin(admin.ModelAdmin):
    pass


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    pass
