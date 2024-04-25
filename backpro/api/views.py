from django.contrib import messages
# from django.contrib.auth.decorators import login_required
from django.http import Http404
from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic import View
from rest_framework.decorators import api_view
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated

from api.models import Game, User, Review, Category, Country, Year, Favorite
from rest_framework import status, generics, permissions, viewsets
from rest_framework.views import APIView
from api.serializers import (GameSerializer, RegisterSerializer, LoginSerializer, LogoutSerializer,
                             ReviewsSerializer, CategoriesSerializer, CountrySerializer, YearSerializer,
                             FavoriteSerializer)

from rest_framework.request import Request
from rest_framework.response import Response


class Top25GamesAPIView(APIView):
    def get(self, request):
        games = Game.objects.order_by('-rating')[:25]
        serializer = GameSerializer(games, many=True)
        return Response(serializer.data)


class Top25ReviewsAPIView(APIView):
    def get(self, request):
        reviews = Review.objects.order_by('-rating')[:25]
        serializer = ReviewsSerializer(reviews, many=True)
        return Response(serializer.data)



class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    def post(self,request):
        user=request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data
        return Response(user_data, status=status.HTTP_201_CREATED)

class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    def post(self,request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

class LogoutAPIView(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = (permissions.IsAuthenticated,)
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(["GET", "POST"])
def game_list(request):
    if request.method == 'GET':
        companies = Game.objects.all()
        serializer = GameSerializer(companies, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = GameSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(["GET", "POST"])
def reviews_list(request):
    if request.method == 'GET':
        reviews = Review.objects.all()
        serializer = ReviewsSerializer(reviews, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ReviewsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET", "POST"])
def categories_list(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategoriesSerializer(categories, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CategoriesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_games_by_category(request, category_id):
    try:
        games = Game.objects.filter(categories__id=category_id)
        game_serializer = GameSerializer(games, many=True)
        data = {
            'games': game_serializer.data,
        }
        return Response(data)
    except (Game.DoesNotExist):
        raise NotFound("No games found for the specified category ID.")



@api_view(['GET'])
def country_list(request):
    if request.method == 'GET':
        countries = Country.objects.all()
        serializer = CountrySerializer(countries, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def country_games(request, country_id):
    country = get_object_or_404(Country, pk=country_id)
    games = Game.objects.filter(country=country)
    game_serializer = GameSerializer(games, many=True)
    data = {
        'games': game_serializer.data,
    }
    return Response(data)

@api_view(['GET'])
def year_list(request):
    years = Year.objects.all()
    data = [{'id': year.id, 'year': year.year} for year in years]
    return Response(data)


@api_view(['GET'])
def year_games(request, year_id):
    try:
        year = Year.objects.get(id=year_id)
        games = Game.objects.filter(year=year.year)
        game_serializer = GameSerializer(games, many=True)
        response_data = {
            'games': game_serializer.data,
        }
        return Response(response_data)
    except Year.DoesNotExist:
        return Response({'message': 'Year not found'}, status=404)



@api_view(['GET'])
def year_single(request, year_id):
    year = get_object_or_404(Year, pk=year_id)
    serializer = YearSerializer(year)
    return Response(serializer.data)

@api_view(['GET'])
def game_detail(request, game_id):
    game = get_object_or_404(Game, pk=game_id)
    serializer = GameSerializer(game)
    return Response(serializer.data)

@api_view(['GET'])
def review_detail(request, review_id):
    review = get_object_or_404(Review, pk=review_id)
    serializer = ReviewsSerializer(review)
    return Response(serializer.data)

class FavoriteListCreateAPIView(generics.ListCreateAPIView):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class FavoriteRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)