import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import {Category, Game} from '../models/game.model';
import {RouterLink, RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, RouterLink],
})
export class ShopComponent implements OnInit {
  games: Game[] = [];
  categories: Category[] = []
  query: string = '';

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.loadAllGames();
  }

  loadAllGames() {
    this.httpService.getGames().subscribe(games => {
      this.games = games;
    });
  }

  searchGames() {
    if (this.query.trim() === '') {
      this.loadAllGames();
      return;
    }
    this.httpService.searchGames(this.query).subscribe(games => {
      this.games = games;
    });
  }

  switchTab(tab: string) {
    switch (tab) {
      case 'all':
        this.loadAllGames();
        break;
      case 'top25':
        this.loadTop25Games();
        break;
      case 'Categories':
        this.loadCategories();
        break;

      // Добавьте обработку других вкладок здесь
      default:
        break;
    }
  }

  loadTop25Games() {
    this.httpService.getTop25Games().subscribe(games => {
      this.games = [games];
    });
  }

  loadCategories(){
    this.httpService.getCategories().subscribe(categories =>{
      this.categories =  [categories]
    });
  }
}
