from django.views.static import serve
from django.http import HttpResponseRedirect
from apps.musical_group.models import Song
from django.db.models import Q


# @login_required
def protected_song_file(request, path, document_root=None, show_indexes=False):
    song = Song.objects.filter(
        Q(musical_group__directors__id=request.user.pk) |
        Q(guest_musician__id=request.user.pk) |
        Q(permanent_musician__id=request.user.pk)
    ).filter(upload=path).first()
    if song:
        return serve(request, path, document_root, show_indexes)
    else:
        return HttpResponseRedirect('/')
