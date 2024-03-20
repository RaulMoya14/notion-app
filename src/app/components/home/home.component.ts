import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { Button, ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../interfaces/note';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, InputGroupAddonModule, InputGroupModule, ButtonModule, CalendarModule], // Agrega CommonModule aquí
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  notes: Note[] = [];

  constructor(private notesService: NotesService) {
    this.getNotes();
    console.log("notes: " + this.notes)
  }

  addNote() {
    const titleInput = document.getElementById('titleInput') as HTMLInputElement;
    const descriptionInput = document.getElementById('descriptionInput') as HTMLInputElement;

    const title = titleInput.value;
    const description = descriptionInput.value;

    this.notesService.createNote(title, description);
  }

  getNotes() {
    console.log("EN getNotes")
    this.notesService.getNotes().subscribe(
      (response) => {
        console.log(response)
        if (response.status === 'OK') {
          this.notes = response.data
        } else {
          console.log('Error');
        }
      },
      (error) => {
        console.error('Error en la solicitud: ', error);
      }
    );
  }

  editNote(id: number){
    //this.notesService.updateNote(id);
  }


  deleteNote(id: number){
    this.notesService.deleteNote(id);
    location.reload();
  }
}
