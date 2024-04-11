import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { FormsModule } from '@angular/forms';
import { NotesService } from '../../services/notes.service';
import { DropdownItemComponent } from '../dropdown-item/dropdown-item.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-note',
  standalone: true,
  imports: [FormsModule,DropdownItemComponent],
  templateUrl: './view-note.component.html',
  styleUrl: './view-note.component.css'
})
export class ViewNoteComponent implements OnInit{

  title?: string;
  itemNote?: string;
  item?: Item;
  itemsList: Item[] = [];
  idNote?: string;

  constructor(private notesService:NotesService, private route: ActivatedRoute) { }

  ngOnInit(){
    this.getNote();
  }
  getNote(){
    const idNote = this.route.snapshot.paramMap.get('id');
    console.log('idNote: ', idNote);
    if(idNote){
      this.idNote = idNote;
      this.notesService.getNote(idNote).subscribe((data) => {
        console.log('Data: ', data);
        this.addInfoToListNotes(data);
      });
    }
  }

  addInfoToListNotes(data:any){
    this.title = data[0].title;
    this.itemsList = data[0].items;
    console.log('En añaadir info a la lista de notas');
    console.log('ItemsList: ', this.itemsList);
  }

  addFieldToNote(fieldType: string) {
    let new_item = { type: fieldType, data: '', orden: this.itemsList.length+1};
    this.itemsList.push(new_item);
  }

  clickAddFieldToNote(event: MouseEvent, container: HTMLDivElement) {
    if (event.target === container) {
      this.addFieldToNote('Text');
    }
  }

  editNote(){
    let note = {
      user: sessionStorage.getItem('userId') || '',
      title: this.title,
      items: [this.itemsList]
    };
    // for (let i = 0; i < this.itemsList.length; i++) {
    //   note.items.push(this.itemsList[i]);
    // }
    console.log('Note: ', note);
    this.notesService.updateNote(note,this.idNote || '')
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
