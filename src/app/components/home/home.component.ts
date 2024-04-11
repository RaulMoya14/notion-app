import { Component } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ListNoteComponent } from '../list-note/list-note.component';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,MenuComponent], // Agrega CommonModule aquí
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [MessageService]
})
export class HomeComponent {



}
