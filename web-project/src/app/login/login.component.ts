import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    username: 'User1', 
    password: 'pass1' 
  };

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.user).subscribe(
      (res) => {
        // Обработка успешного входа в систему
        console.log('Успешный вход в систему!', res);
        this.router.navigate(['shop']);
      },
      (err) => {
        // Обработка ошибок аутентификации
        console.error('Ошибка аутентификации', err);
      }
    );
  }
}
