import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-note',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list-note.component.html',
  styleUrl: './list-note.component.css'
})
export class ListNoteComponent {

  listNotes: string[] = [];
  listItem: string = '';

  addNoteToList() {
    if (this.listItem.trim() !== '') {
      this.listNotes.push(this.listItem);
      this.listItem = ''; // Limpiar el input después de agregar la nota
    }
  }
}
