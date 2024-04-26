import {Component, OnInit} from '@angular/core';
import {Game} from "../models/game.model";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {HttpService} from "../services/http.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-category-games',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './category-games.component.html',
  styleUrl: './category-games.component.css'
})
export class CategoryGamesComponent implements OnInit {
  categoryId!: number;
  games: Game[] = [];

  constructor(private route: ActivatedRoute, private httpService: HttpService) { }

  ngOnInit(): void {
    const categoryIdParam = this.route.snapshot.paramMap.get('categoryId');
    if (categoryIdParam) {
      this.categoryId = +categoryIdParam;
      this.loadCategoryGames(this.categoryId);
    } else {
      // Обработка случая, когда параметр categoryId отсутствует
    }
  }

  loadCategoryGames(categoryId: number) {
    this.httpService.getGamesbyCategory(categoryId).subscribe(games => {
      this.games = games;
    });
  }
}
