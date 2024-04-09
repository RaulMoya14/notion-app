import { ViewNoteComponent } from './../view-note/view-note.component';
import { Component } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { Button, ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
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

//   notes: Note[] = [];
//   fechaFormulario: Date = new Date();
//   title: string = '';
//   description: string = '';
//   url_img_note: string = '';
//   editingNoteId: number | null = null;

//   constructor(private router:Router,private notesService: NotesService, private messageService: MessageService) {
//     this.getNotes();
//     console.log("notes: " + this.notes)
//   }

//   onBasicUploadAuto(event: UploadEvent) {
//     this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Image link to the note' });
// }
//   /*
//   addNote() {
//     console.log("EN addNote")
//     console.log("title: " + this.title)
//     console.log("description: " + this.description)
//     console.log("fechaFormulario: " + this.fechaFormulario)
//     console.log("url_img_note: " + this.url_img_note)
//     this.notesService.createNote(this.title, this.description,this.fechaFormulario,this.url_img_note);
//     this.getNotes();
//   }
//   */


//   addOrUpdateNote() {
//     if (this.editingNoteId !== null) {
//       this.notesService.updateNote(this.editingNoteId, this.title, this.description, this.fechaFormulario, this.url_img_note);
//       this.editingNoteId = null;
//     } else {
//       this.notesService.createNote(this.title, this.description, this.fechaFormulario, this.url_img_note);
//     }
//     this.resetForm();
//     this.getNotes();
//   }

//   editNote(id: number) {
//     this.editingNoteId = id;
//     const note = this.notes.find(note => note.id === id);
//     if (note) {
//       this.title = note.title;
//       this.description = note.content;
//       this.fechaFormulario = new Date(note.date);
//       this.url_img_note = note.url_img_note;
//     }
//   }

//   cancelEdit() {
//     this.editingNoteId = null;
//     this.resetForm();
//   }

//   resetForm() {
//     this.title = '';
//     this.description = '';
//     this.fechaFormulario = new Date();
//     this.url_img_note = '';
//   }

//   getNotes() {
//     console.log("EN getNotes")
//     this.notesService.getNotes().subscribe(
//       (response) => {
//         console.log(response)
//         if (response.status === 'OK') {
//           this.notes = response.data
//         } else {
//           console.log('Error');
//         }
//       },
//       (error) => {
//         console.error('Error en la solicitud: ', error);
//       }
//     );
//   }
//   /*
//   editNote(id: number){
//     console.log("EN editNote")

//     this.notesService.updateNote(id,this.title,this.description,this.fechaFormulario,this.url_img_note);
//     this.getNotes();
//   } */

//   viewNote(id: number){
//     console.log("EN ViewNoteComponent")
//     this.router.navigate([`/viewNote/${id}`]);
//   }

//   deleteNote(id: number){
//     console.log("EN deleteNote")
//     this.notesService.deleteNote(id);
//     this.getNotes();
//   }

//   onFileSelected(event: any) {
//     console.log("EN onFileSelect")
//     console.log(event)
//     this.url_img_note = event.files[0].objectURL.changingThisBreaksApplicationSecurity;
//   }

}
