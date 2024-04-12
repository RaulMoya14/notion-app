import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotesService } from '../../services/notes.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-collection-notes',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './collection-notes.component.html',
  styleUrl: './collection-notes.component.css'
})
export class CollectionNotesComponent implements OnInit{

  userNotes?:any[];
  selectedNoteId: any = '';
  collectionTitle: string = '';

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    let user = sessionStorage.getItem('userId') || '';
    this.notesService.getNotes(user).subscribe((data) => {
      console.log('User Notes:', data);
      this.userNotes = data;
    } );
  }

  selectNoteToAdd(noteId: any) {
    this.selectedNoteId = noteId;
  }

  addNote() {
    console.log(this.collectionTitle.valueOf())
    if (!this.selectedNoteId || !this.collectionTitle) {
      console.log('Please select a note and enter a collection title.');
      return;
    }
    console.log('Selected Note ID:', this.selectedNoteId);
    console.log('Collection Title:', this.collectionTitle);
    this.selectedNoteId = '';
    this.collectionTitle = '';
  }
}
