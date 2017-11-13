from django.views.static import serve
from django.http import HttpResponseRedirect
from apps.musical_group.models import Song
from conf.utils import merge_list, roles_by_object, has_edit


# @login_required
def protected_song_file(request, path, document_root=None, show_indexes=False):
    song = Song.objects.get(upload=path)
    user = request.user

    is_edit = has_edit(merge_list(
        roles_by_object(user,song, 'directors')
        + roles_by_object(user, song.musical_group),
    ))
    if is_edit:
        return serve(request, path, document_root, show_indexes)
    else:
        return HttpResponseRedirect('/')
