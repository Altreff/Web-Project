from django.contrib import admin
from .models import Game, Category, Review, Country, Year, Favorite


# Register your models here.

@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'year', 'get_categories', 'country', 'price', 'rating')

    def get_categories(self, obj):
        return ", ".join([category.name for category in obj.categories.all()])
    get_categories.short_description = 'Categories'



@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'game', 'text', 'user', 'rating')
    search_fields = ('game',)



@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

@admin.register(Year)
class YearAdmin(admin.ModelAdmin):
    list_display = ('id', 'year')
    search_fields = ('year',)

@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'game')
    search_fields = ('user',)