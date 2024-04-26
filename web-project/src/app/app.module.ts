import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import {ShopComponent} from "./shop/shop.component";
import {FavoritesComponent} from "./favorites/favorites.component";
import {ProfileComponent} from "./profile/profile.component";
import {LoginComponent} from "./login/login.component";
import {HttpService} from "./services/http.service";
import {GameDetailsComponent} from "./game-details/game-details.component";
import {FooterComponent} from "./footer/footer.component";
import {Top25Component} from "./top25/top25.component";
import {CategoriesComponent} from "./categories/categories.component";
import {CategoryGamesComponent} from "./category-games/category-games.component";

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppComponent,
    ShopComponent,
    GameDetailsComponent,
    FooterComponent,
    ProfileComponent,
    FavoritesComponent,
    LoginComponent,
    Top25Component,
    CategoriesComponent,
    CategoryGamesComponent

  ],
  providers: [HttpService],
  bootstrap: []
})
export class AppModule { }
