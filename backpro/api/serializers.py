from django.contrib import auth
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

from api.models import Game, Review, User, Category, Country, Year, Favorite


class ReviewsSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    game = serializers.CharField()
    text = serializers.CharField()
    user = serializers.CharField()
    rating = serializers.FloatField()

    def create(self, validated_data):
        instance = Review.objects.create(game=validated_data.get("game"),
                                            text=validated_data.get("text"),
                                            user=validated_data.get("user"),
                                            rating=validated_data.get("city"))
        return instance

    def update(self, instance, validated_data):
        instance.game = validated_data.get('game')
        instance.text = validated_data.get('text')
        instance.user = validated_data.get('user')
        instance.rating = validated_data.get('rating')
        instance.save()
        return instance

class CategoriesSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()

    def create(self, validated_data):
        instance = Category.objects.create(name=validated_data.get("name"))
        return instance

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name')
        instance.save()
        return instance


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['id', 'name']

class YearSerializer(serializers.ModelSerializer):
    class Meta:
        model = Year
        fields = ['id', 'year']

class GameSerializer(serializers.ModelSerializer):
    categories = CategoriesSerializer(many=True)
    country = CountrySerializer()
    class Meta:
        model = Game
        fields = ("id", "name", "description", "year", "categories", "country", "price", "rating")


class ReviewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ("id", "game", "text",
                  "user", "rating")


# Authentication Serializers
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    class Meta:
        model = User
        fields = ['email', 'username', 'password']
    def validate(self, attrs):
        email = attrs.get('email', '')
        username = attrs.get('username', '')
        if not username.isalnum():
            raise serializers.ValidationError(
                self.default_error_messages)
        return attrs
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class LoginSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6,write_only=True)
    username = serializers.CharField(max_length=255, min_length=3)
    tokens = serializers.SerializerMethodField()
    def get_tokens(self, obj):
        user = User.objects.get(username=obj['username'])
        return {
            'refresh': user.tokens()['refresh'],
            'access': user.tokens()['access']
        }
    class Meta:
        model = User
        fields = ['password','username','tokens']
    def validate(self, attrs):
        username = attrs.get('username','')
        password = attrs.get('password','')
        user = auth.authenticate(username=username,password=password)
        if not user:
            raise AuthenticationFailed('Invalid credentials, try again')
        if not user.is_active:
            raise AuthenticationFailed('Account disabled, contact admin')
        return {
            'email': user.email,
            'username': user.username,
            'tokens': user.tokens
        }

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs
    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            self.fail('bad_token')

class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ['id', 'user', 'movie']