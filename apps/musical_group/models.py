from django.db import models
from django.contrib.auth.models import User
from apps.user.models import UserInfo
from autoslug import AutoSlugField


class MusicalInstrument(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        verbose_name = 'Instrumento Musical'
        verbose_name_plural = 'Instrumentos Musicales'

    def __str__(self):
        return self.name


class MusicalStyle(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        verbose_name = 'Estilo Musical'
        verbose_name_plural = 'Estilos Musicales'

    def __str__(self):
        return self.name

    def as_dict(self):
        return {
            "id": self.id,
            "text": self.name,
        }


class UserMusicalInstrumentStyle(models.Model):
    user = models.ForeignKey(User)
    musical_styles = models.ManyToManyField(MusicalStyle)
    musical_instruments = models.ManyToManyField(
        MusicalInstrument,
        related_name='musical_instrument',
    )

    class Meta:
        verbose_name = 'Musico Intrumento y Estilo'
        verbose_name_plural = 'Musicos Instrumento y Estilos'
    #
    # @property
    # def popularity(self):
    #     likes = self.id
    #     return likes

    def __str__(self):
        instruments = [x.name for x in self.musical_instruments.all()]
        return '{} {}'.format(
            self.user.username,
            instruments,
        )


class MusicalGroup(models.Model):
    name = models.CharField(max_length=255)
    slug = AutoSlugField(populate_from='name')
    color = models.CharField(max_length=10)
    musical_styles = models.ManyToManyField(MusicalStyle)
    directors = models.ManyToManyField(User)
    guest_musician = models.ManyToManyField(
        User,
        related_name='guest_musicians',
        blank=True,
    )
    permanent_musician = models.ManyToManyField(
        User,
        related_name='permanent_musicians',
        blank=True,
    )

    class Meta:
        verbose_name = 'Grupo Musical'
        verbose_name_plural = 'Grupos Musicales'

    def __str__(self):
        return self.name


def directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return '{0}/songs/{1}'.format(instance.musical_group.pk, filename)


class Song(models.Model):
    name = models.CharField(max_length=255)
    slug = AutoSlugField(populate_from='name')
    upload = models.FileField(upload_to=directory_path)
    duration = models.DurationField()
    creation_date = models.DateField()
    color = models.CharField(max_length=10)
    musical_styles = models.ManyToManyField(MusicalStyle)
    musical_group = models.ForeignKey(MusicalGroup, related_name='songs')
    guest_musician = models.ManyToManyField(
        User,
        related_name='song_guest_musicians',
        blank=True,
    )
    permanent_musician = models.ManyToManyField(
        User,
        related_name='song_permanent_musicians',
        blank=True,
    )

    class Meta:
        verbose_name = 'Tema'
        verbose_name_plural = 'Temas'

    def __str__(self):
        return self.name


class Playlist(models.Model):
    name = models.CharField(max_length=255)
    color = models.CharField(max_length=10)
    songs = models.ManyToManyField(Song)

    class Meta:
        verbose_name = 'Playlist'
        verbose_name_plural = 'Playlists'

    def __str__(self):
        return self.name
