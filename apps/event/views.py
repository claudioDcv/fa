from django.views.generic import TemplateView
from django.views.generic import DetailView
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.pagination import PageNumberPagination

from apps.event.serializers import EventSerializer, InvitationSerializer
from django.db.models import Q

from operator import __or__ as OR


def reduce(func, items):
    result = items.pop()
    for item in items:
        result = func(result, item)

    return result


class LargeResultsSetPagination(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 4


class EventView(DetailView):
    template_name = 'event/event.html'
    model = EventSerializer.Meta.model


class CalendarView(TemplateView):
    template_name = 'event/calendar.html'


# API
class EventViewSet(viewsets.ModelViewSet):
    '''
    start=iso-8601
    end=iso-8601
    '''
    serializer_class = EventSerializer
    model = serializer_class.Meta.model
    queryset = model.objects.all()

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


class InvitationViewSet(viewsets.ModelViewSet):
    '''
    user_type= owner / user_invited / any
    without param = None
    '''

    serializer_class = InvitationSerializer
    model = serializer_class.Meta.model
    queryset = model.objects.all()
    pagination_class = LargeResultsSetPagination

    def update(self, request, pk=None):
        import ipdb; ipdb.set_trace()
        pass

    def partial_update(self, request, pk=None):
        import ipdb; ipdb.set_trace()
        pass

    def get_queryset(self):
        if self.action == 'list':
            user = self.request.user
            user_type = self.request.query_params.get('user_type', '')
            q = self.request.query_params.get('q', '')

            model = self.model.objects
            if q:
                lst = [
                    Q(name__icontains=q),
                    Q(owner__username__icontains=q),
                    Q(user_invited__username__icontains=q)
                ]
                model = model.filter(reduce(OR, lst))

            if user_type == 'owner':
                data = model.filter(owner=user)
                return data

            if user_type == 'user_invited':
                data = model.filter(user_invited=user)
                return data

            if user_type == 'any':
                data = model.filter(
                    Q(owner=user) |
                    Q(user_invited=user)
                )
                return data

        return self.queryset


class NotificationListView(TemplateView):
    template_name = 'event/notification.html'


class NotificationDetailView(DetailView):
    template_name = 'event/notification-view.html'
    model = InvitationSerializer.Meta.model
