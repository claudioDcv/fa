from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth.decorators import login_required
from apps.musical_group.views import HomeView, MusicalGroupView, MusicalGroupPermanentView, \
    MusicalGroupGuestView, SongView, SongEditView
from apps.event.views import CalendarView, EventView
from django.contrib.auth import views as auth_views
from django.conf import settings
from django.conf.urls.static import static
from conf.protected import protected_song_file


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', auth_views.login, name='login', kwargs={'redirect_authenticated_user': True}),
    url(r'^logout/$', auth_views.logout, name='logout'),
    url(r'^home/$', login_required(HomeView.as_view()), name='home'),
    url(
        r'^home/group/(?P<group_id>\w{0,50})/$',
        login_required(MusicalGroupView.as_view()),
        name='group',
    ),
    url(
        r'^home/group-permanent-musician/(?P<group_id>\w{0,50})/$',
        login_required(MusicalGroupPermanentView.as_view()),
        name='group-permanent-musician',
    ),
    url(
        r'^home/group-guest-musician/(?P<group_id>\w{0,50})/$',
        login_required(MusicalGroupGuestView.as_view()),
        name='group-guest-musician',
    ),
    url(
        r'^home/song/(?P<song_id>\w{0,50})/$',
        login_required(SongView.as_view()),
        name='song',
    ),
    url(
        r'^home/song/(?P<pk>\w{0,50})/edit/$',
        login_required(SongEditView.as_view()),
        name='song-edit',
    ),

    url(
        r'^home/calendar/$',
        login_required(CalendarView.as_view()),
        name='calendar',
    ),

    url(
        r'^home/event/(?P<pk>\w{0,50})/$',
        login_required(EventView.as_view()),
        name='event',
    ),

    url(r'^api/', include('apps.api.urls', namespace='api'))
]


if settings.DEBUG:
    # static files (images, css, javascript, etc.)
    urlpatterns += static(
        settings.MEDIA_URL,
        protected_song_file,
        document_root=settings.MEDIA_ROOT,
    )
