import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Category, Game} from "../models/game.model"; // Предположим, что у вас есть модель Game

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl = 'http://127.0.0.1:8000/api/'; // Замените на вашу базовую URL-адрес API

  constructor(private http: HttpClient) { }

  // Пример метода для получения списка всех игр
  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.baseUrl}games/`);
  }

  // Пример метода для получения деталей игры по её ID
  getGameDetails(gameId: number): Observable<Game> {
    return this.http.get<Game>(`${this.baseUrl}games/${gameId}/`);
  }

  getCategories(): Observable<Category>{
    return this.http.get<Category>(`${this.baseUrl}categories/`)
  }

  getGamesbyCategory(categoryId: number): Observable<Category>{
    return this.http.get<Category>(`${this.baseUrl}categories/${categoryId}/games`)
  }

  getTop25Games(): Observable<Game>{
    return this.http.get<Game>(`${this.baseUrl}top25Games/`)
  }

  searchGames(query: string): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.baseUrl}games/?search=${query}`);
  }





  // Добавьте методы для других запросов к вашему API (например, для получения отзывов, категорий и т. д.)
}
