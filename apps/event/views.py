from django.views.generic import TemplateView
from django.views.generic import DetailView
from rest_framework import viewsets
from apps.event.serializers import EventSerializer
from apps.event.models import Event
from django.db.models import Q
from rest_framework.response import Response


class EventView(DetailView):
    template_name = 'event/event.html'
    model = Event


class CalendarView(TemplateView):
    template_name = 'event/calendar.html'


# API
class EventViewSet(viewsets.ViewSet):
    '''
    ?start_dt=1510284123937&end_dt=1541820123937
    '''
    model = Event
    queryset = model.objects.all()
    serializer_class = EventSerializer

    def update(self, request, pk=None):
        import ipdb; ipdb.set_trace()
        pass

    def partial_update(self, request, pk=None):
        obj = self.model.objects.get(pk=pk)
        obj.start = request.data['start']
        obj.end = request.data['end']
        data = obj.save()
        serializer = self.serializer_class(data, many=False)
        return Response(serializer.data)


    def list(self, request):
        queryset = self.queryset
        start = self.request.query_params.get('start', 0)
        end = self.request.query_params.get('end', 0)
        user = self.request.user
        if start is not 0 and end is not 0 and user:
            queryset = queryset.filter(
                Q(start__range=[start, end]) |
                Q(end__range=[start, end])
            ).filter(users__pk=user.id)
        else:
            queryset = queryset[:100]

        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
