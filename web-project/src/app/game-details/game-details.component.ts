import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../models/game.model';
import { HttpService } from '../services/http.service';
import {CommonModule} from "@angular/common";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css'],
  standalone:true,
  imports: [CommonModule, FooterComponent]

})
export class GameDetailsComponent implements OnInit {
  game!: Game;

  constructor(private route: ActivatedRoute, private httpService: HttpService) { }

  ngOnInit(): void {
    const gameId = +this.route.snapshot.params['id'];
    this.httpService.getGameDetails(gameId).subscribe(game => {
      this.game = game;
    });
  }
}
