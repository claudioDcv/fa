from django.contrib import admin

from .models import MusicalStyle, MusicalGroup, Song, Playlist, MusicalInstrument, UserMusicalInstrumentStyle


@admin.register(MusicalStyle)
class MusicalStyleAdmin(admin.ModelAdmin):
    pass


@admin.register(MusicalGroup)
class MusicalGroupAdmin(admin.ModelAdmin):
    pass


@admin.register(Song)
class SongAdmin(admin.ModelAdmin):
    pass


@admin.register(Playlist)
class PlaylistAdmin(admin.ModelAdmin):
    pass

@admin.register(MusicalInstrument)
class MusicalInstrumentAdmin(admin.ModelAdmin):
    pass

@admin.register(UserMusicalInstrumentStyle)
class UserMusicalInstrumentStyleAdmin(admin.ModelAdmin):
    pass
