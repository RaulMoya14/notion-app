import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,InputGroupAddonModule,InputGroupModule,ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username?: string;
  password?: string;

  constructor( private router:Router) { }

  login() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    if (this.username == 'a' && this.password == 'a') {
      console.log('Login successful');
      this.router.navigate(['home']);
    }

  }
}
