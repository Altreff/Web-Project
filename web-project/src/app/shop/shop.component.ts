import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import {Category, Game} from '../models/game.model';
import {RouterLink, RouterOutlet} from "@angular/router";
import {CommonModule, NgSwitch} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, RouterLink, FooterComponent],
})
export class ShopComponent implements OnInit {
  games: Game[] = [];
  query: string = '';
  filteredgames: Game[] = []

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
    if (!this.query) {
      // Если запрос пустой, показываем все игры
      this.filteredgames = this.games;
    } else {
      // Фильтруем игры по введенному запросу
      this.filteredgames = this.games.filter(game =>
        game.name.toLowerCase().includes(this.query.toLowerCase())
      );
    }
  }






}
