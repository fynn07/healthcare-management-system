from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class HistoryPageNumberPagination(PageNumberPagination):
    page_size = 8

    def paginate_queryset(self, queryset, request, view=None):
        return super().paginate_queryset(queryset, request, view)

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'current_page': self.page.number,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data,
        })

def initialize_pagination(queryset, request):
    paginator = HistoryPageNumberPagination()
    paginated_queryset = paginator.paginate_queryset(queryset, request)
    return paginator, paginated_queryset
