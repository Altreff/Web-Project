import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ProfileComponent } from './profile/profile.component';
import {LoginComponent} from "./login/login.component";
import {GameDetailsComponent} from "./game-details/game-details.component";
import {Top25Component} from "./top25/top25.component";
import {CategoriesComponent} from "./categories/categories.component";
import {CategoryGamesComponent} from "./category-games/category-games.component";

export const routes: Routes = [
  { path: '', redirectTo: '/shop', pathMatch: 'full' },
  { path: 'shop', component: ShopComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent},
  { path: 'games/:id', component: GameDetailsComponent },
  { path: 'shop/top25', component: Top25Component},
  { path: 'shop/categories', component: CategoriesComponent},
  { path: 'shop/categories/:categoryId', component:CategoryGamesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
