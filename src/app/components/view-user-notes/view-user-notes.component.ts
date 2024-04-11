import { Component,OnInit } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Item } from '../../models/item';
import { DropdownItemComponent } from '../dropdown-item/dropdown-item.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-user-notes',
  standalone: true,
  imports: [DropdownItemComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './view-user-notes.component.html',
  styleUrl: './view-user-notes.component.css'
})
export class ViewUserNotesComponent implements OnInit{

  notes: any[] = [];

  constructor(private notesService:NotesService, private router:Router) { }

  ngOnInit(){
    this.getNotes();
  }

  getNotes(){
    let user = sessionStorage.getItem('userId') || '';
    this.notesService.getNotes(user).subscribe((data) => {
      console.log(data);
      this.addInfoToListNotes(data);
    });
  }
  addInfoToListNotes(data:any){
    for (let i = 0; i < data.length; i++) {
      let note = {
        idNote: data[i]._id,
        title: data[i].title,
      }
      this.notes.push(note);
    }
    console.log('NotesList: ', this.notes);
  }

  deleteNoteById(id:string){
    console.log('Eliminando nota con id: ', id);
    this.notesService.deleteNoteById(id);
    window.location.reload();
  }
  editNoteById(idNote:string){
    console.log(idNote)
    console.log('Editando nota con id: ', idNote);
    this.router.navigate([`/viewNote/${idNote}`]);
  }

}
