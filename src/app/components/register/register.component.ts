import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,InputGroupAddonModule,InputGroupModule,ButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  username: string = '';
  password: string = '';
  email: string = '';
  registerCompleted: boolean = false;

  constructor( private router:Router, private loginService:LoginService) { }

  register() {
    this.loginService.register(this.username, this.password, this.email).subscribe(response => {
      console.log('Response:', response);
      if (response.username == this.username) {
        this.registerCompleted = true;
        this.router.navigate(['/']);
      }
    });
  }
}
