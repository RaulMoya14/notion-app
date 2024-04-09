import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownItemComponent } from '../dropdown-item/dropdown-item.component';
import { Item } from '../../models/item';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [FormsModule,DropdownItemComponent],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.css'
})
export class AddNoteComponent {

  title?: string;
  itemNote?: string;

  item?: Item;
  itemsList: Item[] = [];

  constructor(private notesService:NotesService) { }

  addFieldToNote(fieldType: string) {
    let new_item = { type: fieldType, data: '', orden: this.itemsList.length+1};
    this.itemsList.push(new_item);
  }

  clickAddFieldToNote(event: MouseEvent, container: HTMLDivElement) {
    if (event.target === container) {
      this.addFieldToNote('Text');
    }
  }

  addNote(){

    let note = {
      user: sessionStorage.getItem('userId') || '',
      title: this.title,
      items: [{}]
    };

    for (let i = 0; i < this.itemsList.length; i++) {
      note.items.push(this.itemsList[i]);
    }
    console.log('Note: ', note);
    this.notesService.addNote(note);
    let user = sessionStorage.getItem('userId') || '';
    console.log(user)
    // this.notesService.getNotes(user).subscribe((data) => {
    //   console.log(data)});


  }

  onFileSelected(event: any, item:Item) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        item.data = reader.result as string
      };
      reader.readAsDataURL(file);
    }
  }

}
