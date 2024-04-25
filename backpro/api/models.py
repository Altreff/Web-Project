from django.db import models
from django.contrib.auth.models import AbstractUser
from rest_framework_simplejwt.tokens import RefreshToken

class User(AbstractUser):
    email = models.EmailField(max_length=255, unique=True, db_index=True, default='')

    class Meta:
        # add this meta class to avoid clashes with the default User model
        swappable = 'AUTH_USER_MODEL'

    def __str__(self):
        return self.username

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return{
            'refresh':str(refresh),
            'access':str(refresh.access_token)
        }


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def str(self):
        return self.name

class Country(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Year(models.Model):
    year = models.IntegerField()

    def __str__(self):
        if self.year is not None:
            return str(self.year)
        return ""

class Game(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    year = models.IntegerField()
    categories = models.ManyToManyField(Category)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    price = models.IntegerField()
    rating = models.FloatField(max_length=10)

    def __str__(self):
        return self.name


class Review(models.Model):
    game = models.ForeignKey(Game, related_name='reviews', on_delete=models.CASCADE)
    text = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.FloatField(max_length=10)
    def str(self):
        return self.name

class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)

    class Meta:
        unique_together = ['user', 'game']