import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import {Category, Game} from '../models/game.model';
import {RouterLink, RouterOutlet} from "@angular/router";
import {CommonModule, NgSwitch} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-top25',
  standalone: true,
    imports: [CommonModule, RouterOutlet, FormsModule, RouterLink, FooterComponent],
  templateUrl: './top25.component.html',
  styleUrl: './top25.component.css'
})
export class Top25Component implements OnInit{
  top25games: Game[] = []

  constructor(private httpService: HttpService) { }
 ngOnInit() {
   this.loadTop25Games();
 }

  loadTop25Games() {
    this.httpService.getTop25Games().subscribe(top25games => {
      this.top25games = top25games;
    });
  }


}
