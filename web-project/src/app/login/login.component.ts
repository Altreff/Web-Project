import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    username: 'user',
    password: '1234'
  };

  constructor(private authService: AuthService) { }

  onSubmit() {
    this.authService.login(this.user).subscribe(
      (res) => {
        // Обработка успешного входа в систему
        console.log('Успешный вход в систему!', res);
      },
      (err) => {
        // Обработка ошибок аутентификации
        console.error('Ошибка аутентификации', err);
      }
    );
  }
}
