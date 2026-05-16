from django.shortcuts import render

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Avg, Count
from .models import MediaItem
from .serializers import MediaItemSerializer

class MediaItemViewSet(viewsets.ModelViewSet):
    serializer_class = MediaItemSerializer

    def get_queryset(self):
        qs = MediaItem.objects.all()
        for field in ['genre', 'platform', 'status', 'type']:
            val = self.request.query_params.get(field)
            if val:
                qs = qs.filter(**{field: val})

        sort = self.request.query_params.get('sort_by', '-created_at')
        sort_map = {'rating': '-rating', 'title': 'title', 'year': '-year', 'created_at': '-created_at'}
        qs = qs.order_by(sort_map.get(sort, '-created_at'))
        return qs

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

    @action(detail=False, methods=['get'])
    def stats(self, request):
        items = MediaItem.objects.all()
        genres = dict(items.values_list('genre').annotate(c=Count('id')).values_list('genre', 'c'))
        platforms = dict(items.values_list('platform').annotate(c=Count('id')).values_list('platform', 'c'))
        avg = items.filter(rating__isnull=False).aggregate(avg=Avg('rating'))['avg']
        return Response({
            'total': items.count(),
            'completed': items.filter(status='completed').count(),
            'watching': items.filter(status='watching').count(),
            'wishlist': items.filter(status='wishlist').count(),
            'avg_rating': round(avg, 1) if avg else 0,
            'genres': genres,
            'platforms': platforms,
        })

    @action(detail=False, methods=['get'])
    def recommend(self, request):
        completed = MediaItem.objects.filter(status='completed', rating__gte=4)
        if not completed.exists():
            return Response({'recommendations': [], 'message': 'Rate completed items to get recommendations'})

        genre_scores = {}
        platform_counts = {}
        for item in completed:
            genre_scores[item.genre] = genre_scores.get(item.genre, 0) + (item.rating or 0)
            platform_counts[item.platform] = platform_counts.get(item.platform, 0) + 1

        top_genre = max(genre_scores, key=genre_scores.get)
        top_platform = max(platform_counts, key=platform_counts.get)

        wishlist = MediaItem.objects.filter(status='wishlist')
        scored = []
        for item in wishlist:
            score = (2 if item.genre == top_genre else 0) + (1 if item.platform == top_platform else 0)
            scored.append((score, item))

        scored.sort(key=lambda x: x[0], reverse=True)
        results = []
        for score, item in scored[:5]:
            data = MediaItemSerializer(item).data
            data['match_score'] = score
            results.append(data)

        return Response({'recommendations': results, 'based_on': {'top_genre': top_genre, 'top_platform': top_platform}})