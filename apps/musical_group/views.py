from django.views.generic import TemplateView
from apps.musical_group.models import MusicalGroup, Song
from django.db.models import Q
from django.shortcuts import redirect
from apps.musical_group.forms import SongForm
from django.views.generic.edit import UpdateView
from conf.utils import merge_list, roles_by_object


class HomeView(TemplateView):
    template_name = 'musical_group/home.html'
    model = MusicalGroup

    def get_context_data(self, **kwargs):

        model = self.model.objects
        user = self.request.user
        context = super(HomeView, self).get_context_data(**kwargs)
        context['user'] = self.request.user
        context['musical_groups'] = model.filter(
            directors__id=user.pk
        )
        context['musical_groups_permanent'] = model.filter(
            permanent_musician__id=user.pk
        )
        context['musical_groups_guest'] = model.filter(
            guest_musician__id=user.pk
        )
        return context


class MusicalGroupView(TemplateView):
    template_name = 'musical_group/group.html'

    def get_context_data(self, **kwargs):
        context = super(MusicalGroupView, self).get_context_data(**kwargs)
        context['user'] = self.request.user

        musical_group = MusicalGroup.objects.get(pk=kwargs['group_id'])


        context['roles'] = roles_by_object(self.request.user, musical_group)

        context['musical_group'] = musical_group
        context['songs'] = context['musical_group'].songs.all()
        return context


class SongView(TemplateView):
    template_name = 'musical_group/song.html'

    def get_context_data(self, **kwargs):
        context = super(SongView, self).get_context_data(**kwargs)
        user = self.request.user
        song = Song.objects.get(pk=kwargs['song_id'])
        context['user'] = user
        context['song'] = song

        context['roles'] = merge_list(
            roles_by_object(user,song, 'directors')
            + roles_by_object(user, song.musical_group),
        )

        context['has_edit'] = True if 'is_director' in context['roles'] else False

        return context

    def get(self, request, **kwargs):
        context = self.get_context_data(**kwargs)
        if context['song']:
            context['file'] = context['song'].upload.url
            return self.render_to_response(context)
        return redirect('home')


class SongEditView(UpdateView):
    template_name = 'musical_group/song-edit.html'
    form_class = SongForm
    success_url = '/home/song/'
    model = Song

    def get_context_data(self, **kwargs):
        context = super(SongEditView, self).get_context_data(**kwargs)
    #     # context['a'] = self.model.objects
    #     dictionaries = [obj.as_dict() for obj in context['object'].musical_styles.all()]
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
            return super(SongEditView, self).dispatch(request, *args, **kwargs)
        return redirect('{}{}/'.format(self.success_url, self.get_object().pk))

    def get_success_url(self):
        return '{}{}/'.format(self.success_url, self.object.pk)

    def form_valid(self, form):
        # This method is called when valid form data has been POSTed.
        # It should return an HttpResponse.
        form.valid_color()
        return super(SongEditView, self).form_valid(form)


'''
class SaveForm(ModelForm):
    somedata = forms.CharField(required=False)

    class Meta:
        model = SomeModel  # with attr somedata
        fields = ('somedata', 'someotherdata')

    def clean_somedata(self):
        return sometransformation(self.cleaned_data['somedata'])


class SaveView(UpdateView):
    template_name = 'sometemplate.html'
    form_class = SaveForm
    model = SomeModel

    # That should be all you need. If you need to do any more custom stuff
    # before saving the form, override the `form_valid` method, like this:

    def form_valid(self, form):
        self.object = form.save(commit=False)

        # Do any custom stuff here

        self.object.save()

        return render_to_response(self.template_name, self.get_context_data())
'''
