import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { FormsModule } from '@angular/forms';
import { NotesService } from '../../services/notes.service';
import { DropdownItemComponent } from '../dropdown-item/dropdown-item.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-view-note',
  standalone: true,
  imports: [FormsModule,DropdownItemComponent,ToastModule],
  templateUrl: './view-note.component.html',
  styleUrl: './view-note.component.css',
  providers: [MessageService]
})
export class ViewNoteComponent implements OnInit{

  title?: string;
  itemNote?: string;
  item?: Item;
  itemsList: Item[] = [];
  idNote?: string;

  constructor(private notesService:NotesService, private route: ActivatedRoute, private router:Router,
              private message:MessageService) { }

  ngOnInit(){
    this.getNote();
  }
  getNote(){
    const idNote = this.route.snapshot.paramMap.get('id');
    if(idNote){
      this.idNote = idNote;
      this.notesService.getNote(idNote).subscribe((data) => {
        this.addInfoToListNotes(data);
      });
    }
  }

  addInfoToListNotes(data:any){
    this.title = data[0].title;
    this.itemsList = data[0].items;
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
      items: this.itemsList
    };
    this.notesService.updateNote(note,this.idNote || '').subscribe({
      next: response => {
        this.message.add({severity:'success', summary:'Success', detail:'Note updated'});
      },
      error: err => this.message.add({severity:'error', summary:'Error', detail:'Error updating note'})
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

  goBack(){
    window.history.back();
  }

}
