import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import {Category, Game} from '../models/game.model';
import {RouterLink, RouterOutlet} from "@angular/router";
import {CommonModule, NgSwitch} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-categories',
  standalone: true,
    imports: [CommonModule, RouterOutlet, FormsModule, RouterLink, FooterComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{
  categories: Category[] = []


  constructor(private httpService: HttpService) { }
  ngOnInit(): void {
    this.loadCategories();
  }
  loadCategories(){
    this.httpService.getCategories().subscribe(categories =>{
      this.categories =  categories;
    });
  }
}
