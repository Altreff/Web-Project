import { Component, OnInit } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Router} from "@angular/router";
import {HttpService} from "../services/http.service";
import {provideHttpClient, withFetch} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone:true,
  imports: [RouterOutlet],
})
export class LoginComponent implements OnInit{
  logged: boolean = false;
  username: string = "";
  password: string = "";
  errorMessage: string = "";

  constructor(private httpService: HttpService,  private router: Router) {

  }

  ngOnInit() {
    const access = localStorage.getItem("access");
    if(access){
      this.logged = true;
    }
  }

  login(){
    this.httpService.login(this.username, this.password)
      .subscribe((data) =>{
        this.logged = true;
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.access);
        this.router.navigateByUrl('/shop')
      },
        (error) =>{
        this.errorMessage = "Invalid Username or password"
        });
  }

  logout(){
    this.logged = false;
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }

}
