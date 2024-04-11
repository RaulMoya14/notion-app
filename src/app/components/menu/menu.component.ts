import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{

  username: string = '';

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username') || '';
    console.log('Username:', this.username);
  }
  signOut(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
