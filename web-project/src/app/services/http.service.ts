import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable, throwError} from 'rxjs';
import {Category, Game} from "../models/game.model"; // Предположим, что у вас есть модель Game
import {Token} from "../models/token.model"
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl = 'http://127.0.0.1:8000/api/'; // Замените на вашу базовую URL-адрес API

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<Token> {
    return this.http.post<Token>(
      `${this.baseUrl}/api/login/`,
      {username, password}
    )
  }

  // Пример метода для получения списка всех игр
  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.baseUrl}games/`);
  }

  // Пример метода для получения деталей игры по её ID
  getGameDetails(gameId: number): Observable<Game> {
    return this.http.get<Game>(`${this.baseUrl}games/${gameId}/`);
  }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.baseUrl}categories/`)
  }

  getGamesbyCategory(categoryId: number): Observable<Game[]> {
    return this.http.get<{ games: Game[] }>(`${this.baseUrl}categories/${categoryId}/games`)
      .pipe(
        map(response => response.games),
        catchError(error => {
          console.error('Error fetching games by category:', error);
          return throwError(error);
        })
      );
  }

  getTop25Games(): Observable<Game[]>{
    return this.http.get<Game[]>(`${this.baseUrl}games/top25games/`)
  }







  // Добавьте методы для других запросов к вашему API (например, для получения отзывов, категорий и т. д.)
}
