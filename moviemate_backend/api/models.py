from django.db import models

class MediaItem(models.Model):
    TYPE_CHOICES = [('movie', 'Movie'), ('tv', 'TV Show')]
    STATUS_CHOICES = [('wishlist', 'Wishlist'), ('watching', 'Watching'), ('completed', 'Completed'), ('dropped', 'Dropped')]

    title = models.CharField(max_length=255)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES, default='movie')
    director = models.CharField(max_length=255, blank=True, null=True)
    genre = models.CharField(max_length=100)
    platform = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='wishlist')
    rating = models.FloatField(null=True, blank=True)
    review = models.TextField(blank=True, null=True)
    poster_url = models.URLField(blank=True, null=True)
    year = models.IntegerField(null=True, blank=True)
    total_episodes = models.IntegerField(null=True, blank=True)
    episodes_watched = models.IntegerField(null=True, blank=True)
    episode_duration = models.IntegerField(null=True, blank=True)  # minutes
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title