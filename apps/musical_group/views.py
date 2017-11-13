from django.views.generic import TemplateView
from apps.musical_group.models import MusicalGroup, Song
from django.shortcuts import redirect
from apps.musical_group.forms import SongForm
from django.views.generic.edit import UpdateView, CreateView
from conf.utils import merge_list, roles_by_object


class HomeView(TemplateView):
    template_name = 'musical_group/home.html'
    model = MusicalGroup

    def get_context_data(self, **kwargs):

        model = self.model.objects
        user = self.request.user
        context = super(self.__class__, self).get_context_data(**kwargs)
        context['user'] = self.request.user
        context['musical_groups'] = model.filter(directors__id=user.pk)
        context['musical_groups_permanent'] = model.filter(permanent_musician__id=user.pk)
        context['musical_groups_guest'] = model.filter(guest_musician__id=user.pk)
        return context


class MusicalGroupView(TemplateView):
    template_name = 'musical_group/group.html'

    def get_context_data(self, **kwargs):
        context = super(self.__class__, self).get_context_data(**kwargs)
        musical_group = MusicalGroup.objects.get(pk=kwargs['group_id'])

        context['user'] = self.request.user
        context['roles'] = roles_by_object(self.request.user, musical_group)
        context['musical_group'] = musical_group
        context['songs'] = musical_group.songs.all()
        return context


class SongView(TemplateView):
    template_name = 'musical_group/song.html'

    def get_context_data(self, **kwargs):
        context = super(self.__class__, self).get_context_data(**kwargs)
        user = self.request.user
        song = Song.objects.get(pk=kwargs['song_id'])
        context['user'] = user
        context['song'] = song

        r_b_o = roles_by_object
        roles = merge_list(r_b_o(user, song, 'directors') + r_b_o(user, song.musical_group))
        context['roles'] = roles
        context['has_edit'] = True if 'is_director' in context['roles'] else False
        return context

    def get(self, request, **kwargs):
        context = self.get_context_data(**kwargs)
        if context['song']:
            context['file'] = context['song'].upload.url
            return self.render_to_response(context)
        return redirect('home')


class SongCreateView(CreateView):
    template_name = 'musical_group/song-create.html'
    form_class = SongForm
    success_url = '/home/song/'
    model = Song

    def get_context_data(self, **kwargs):
        context = super(self.__class__, self).get_context_data(**kwargs)
        context['group_id'] = 1
        return context


class SongEditView(UpdateView):
    template_name = 'musical_group/song-edit.html'
    form_class = SongForm
    success_url = '/home/song/'
    model = Song

    def get_context_data(self, **kwargs):
        context = super(self.__class__, self).get_context_data(**kwargs)
        context['musical_styles'] = context['object'].musical_styles.all()
        context['guest_musician'] = context['object'].guest_musician.all()
        context['permanent_musician'] = context['object'].permanent_musician.all()
        context['file'] = context['object'].upload.url
        return context

    def dispatch(self, request, *args, **kwargs):
        """ Making sure that only authors can update stories """
        obj = self.get_object()
        directors = [user.pk for user in obj.musical_group.directors.all()]
        if self.request.user.pk in directors:
            return super(self.__class__, self).dispatch(request, *args, **kwargs)
        return redirect('{}{}/'.format(self.success_url, self.get_object().pk))

    def get_success_url(self):
        return '{}{}/'.format(self.success_url, self.object.pk)

    def form_valid(self, form):
        form.valid_color()
        return super(SongEditView, self).form_valid(form)
