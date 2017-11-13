from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView


class FileView(APIView):
    """
    A view that can accept POST requests with JSON content.
    """
    parser_classes = (JSONParser,)

    def post(self, request, format=None):
        import ipdb; ipdb.set_trace()
        return Response({'received data': request.data})
