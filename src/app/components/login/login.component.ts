import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,InputGroupAddonModule,InputGroupModule,ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor( private router:Router, private loginService:LoginService) { }

  login() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    this.loginService.login(this.email, this.password).subscribe(response => {
      if (response.status === "OK") {
        this.router.navigate(['/home']);
        sessionStorage.setItem('user', response.user.username);
      }
    });

  }
}
