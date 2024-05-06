import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{

  username: string = '';

  constructor(private router:Router, private loginService:LoginService) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username') || '';
    console.log('Username:', this.username);
  }
  signOut(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  deleteAccount(){
    this.loginService.deleteAccount(this.username).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        console.error('There was an error during the action!', error);
      }
    });
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
