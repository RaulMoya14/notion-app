import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownItemComponent } from '../dropdown-item/dropdown-item.component';
import { Item } from '../../models/item';
import { NotesService } from '../../services/notes.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [FormsModule,DropdownItemComponent,ToastModule],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.css',
  providers: [MessageService]
})
export class AddNoteComponent {

  title?: string;
  itemNote?: string;

  item?: Item;
  itemsList: Item[] = [];

  constructor(private notesService:NotesService, private message:MessageService) { }

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
      owner: sessionStorage.getItem('userId') || '',
      title: this.title,
      items: [{}]
    };

    for (let i = 0; i < this.itemsList.length; i++) {
      note.items.push(this.itemsList[i]);
    }
    this.notesService.addNote(note).subscribe({
      next: response => {
        console.log(response);
        this.message.add({severity:'success', summary:'Success', detail:'Note added successfully'});
      },
      error: err => this.message.add({severity:'error', summary:'Error', detail:'An error occurred while adding the note'})
    });
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
