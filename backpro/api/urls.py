from . import views
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from .views import FavoriteListCreateAPIView, FavoriteRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('register/',views.RegisterView.as_view(),name="register"),
    path('login/',views.LoginAPIView.as_view(),name="login"),
    path('logout/', views.LogoutAPIView.as_view(), name="logout"),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('games/', views.game_list, name='games'),
    path('games/<int:game_id>/', views.game_detail, name='game_detail'),
    path('reviews/', views.reviews_list, name='reviews'),
    path('reviews/<int:review_id>/', views.review_detail, name='review_detail'),
    path('categories/', views.categories_list, name='categories'),
    path('categories/<int:category_id>/games/', views.get_games_by_category, name='get_games_by_category'),
    path('countries/', views.country_list, name='country_list'),
    path('countries/<int:country_id>/games/', views.country_games, name='country_games'),
    path('years/', views.year_list, name='year_list'),
    path('years/<int:year_id>/', views.year_single, name='year'),
    path('years/<int:year_id>/games/', views.year_games, name='year_games'),
    path('games/top25games/', views.Top25GamesAPIView.as_view(), name='top25games'),
    path('top25reviews/', views.Top25ReviewsAPIView.as_view(), name='top25reviews'),
    path('favorites/', FavoriteListCreateAPIView.as_view(), name='favorite-list-create'),
    path('favorites/<int:pk>/', FavoriteRetrieveUpdateDestroyAPIView.as_view(),
         name='favorite-retrieve-update-destroy'),
]