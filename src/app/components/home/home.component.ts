import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { Button, ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,InputGroupAddonModule,InputGroupModule,ButtonModule,CalendarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  addNote(){

  }

}
