from django.urls import path

from apps.albums.views import AlbumsView, AlbumData, SignAlbumView, createAlbums

urlpatterns = [
    # path('albums/', AlbumsView.as_view()),
    path('album/<user_id>/', SignAlbumView.as_view()),
    path('albums/', AlbumData.as_view()),
    path('createAlbum/', createAlbums.as_view())

]
