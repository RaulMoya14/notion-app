import { ViewNoteComponent } from './../view-note/view-note.component';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { Button, ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../interfaces/note';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, InputGroupAddonModule, InputGroupModule, ButtonModule, CalendarModule,FormsModule,FileUploadModule], // Agrega CommonModule aquí
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [MessageService]
})
export class HomeComponent {

  notes: Note[] = [];
  fechaFormulario: Date = new Date();
  title: string = '';
  description: string = '';
  url_img_note: string = '';

  constructor(private notesService: NotesService, private messageService: MessageService) {
    this.getNotes();
    console.log("notes: " + this.notes)
  }

  onBasicUploadAuto(event: UploadEvent) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Image link to the note' });
}

  addNote() {
    console.log("EN addNote")
    console.log("title: " + this.title)
    console.log("description: " + this.description)
    console.log("fechaFormulario: " + this.fechaFormulario)
    console.log("url_img_note: " + this.url_img_note)
    this.notesService.createNote(this.title, this.description,this.fechaFormulario,this.url_img_note);
    this.getNotes();
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
    console.log("EN editNote")

    this.notesService.updateNote(id,this.title,this.description,this.fechaFormulario,this.url_img_note);
    this.getNotes();
  }

  viewNote(id: number){
    console.log("EN ViewNoteComponent")
  }

  deleteNote(id: number){
    console.log("EN deleteNote")
    this.notesService.deleteNote(id);
    this.getNotes();
  }
}
