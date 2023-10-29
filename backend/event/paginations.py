from rest_framework import pagination
from rest_framework.response import Response


class EventPagination(pagination.PageNumberPagination):
    page_size = '10'
    page_size_query_param = 'page_size'
    ordering = 'date'

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.page.next_page_number() if self.page.has_next() else None,
                'previous': self.page.previous_page_number() if self.page.has_previous() else None
            },
            'range': self.page.paginator.get_elided_page_range(number=self.page.number ,on_each_side=1, on_ends=1),
            'results': data
        })