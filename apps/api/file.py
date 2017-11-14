from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import View
from  apps.musical_group.models import Song
from  apps.api.serializers import SongSerializer

from apps.users.models import AvailableSpace

import json
from django.http import HttpResponse
from rest_framework import status


class FileView(View):
    # def get(self, request):
    #     import ipdb; ipdb.set_trace()
    #     photos_list = Photo.objects.all()
    #     return render(self.request, 'photos/basic_upload/index.html', {'photos': photos_list})

    def post(self, request):

        available_space = AvailableSpace.objects.get(user_id=self.request.user.id)

        max_size = available_space.max_size_bite
        current_size = available_space.current_size_bite


        _file = self.request.FILES['file']
        _size = _file.size

        total = _size + current_size

        if total <= max_size:
            if _file.content_type == 'audio/mp3':
                song = Song.objects.get(pk=self.request.POST['id'])
                song.upload = _file
                song.save()

                available_space.current_size_bite = total
                available_space.save()

                serializer = SongSerializer(song)
                return HttpResponse(json.dumps(serializer.data), content_type='application/json')
            else:
                return HttpResponse(json.dumps(
                    { 'error': 'solo se admiten archivos de audio'}),
                    content_type='application/json',
                    status=status.HTTP_401_UNAUTHORIZED,
                )
        else:
            return HttpResponse(json.dumps(
                { 'error': 'se alcanzo la cuota'}),
                content_type='application/json',
                status=status.HTTP_401_UNAUTHORIZED,
            )
