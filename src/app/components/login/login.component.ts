import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,InputGroupAddonModule,InputGroupModule,ButtonModule,ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor( private router:Router, private loginService:LoginService,private message:MessageService) { }

  login() {
    this.loginService.login(this.username, this.password).subscribe({
      next: response => {
        if (response.status == "OK") {
          this.router.navigate(['/home']);
          sessionStorage.setItem('username', response.user.username);
          sessionStorage.setItem('userId', response.user.id);
          this.message.add({severity:'success', summary:'Success', detail:'Login successful'});
        } else {
          this.message.add({severity:'error', summary:'Error', detail:'Incorrect user or password'});
        }
      },
      error: err => this.message.add({severity:'error', summary:'Error', detail:'An error occurred during login'})
    });
  }
}
