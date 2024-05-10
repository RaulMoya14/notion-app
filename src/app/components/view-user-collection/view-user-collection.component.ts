import { CollectionService } from './../../services/collection.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotesService } from '../../services/notes.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-view-user-collection',
  standalone: true,
  imports: [CommonModule,ToastModule],
  templateUrl: './view-user-collection.component.html',
  styleUrl: './view-user-collection.component.css',
  providers: [MessageService]
})
export class ViewUserCollectionComponent {

  idCollection: string = '';
  title: string = '';
  itemsList: any[] = [];
  itemsListNotes: any[] = [];

  constructor(private collectionService: CollectionService,private route: ActivatedRoute, private router:Router,
              private notesService:NotesService, private message:MessageService
  ) { }

  ngOnInit(){
    this.getCollection();
  }
  getCollection(){
    const idCollection = this.route.snapshot.paramMap.get('id');
    if(idCollection){
      this.idCollection = idCollection;
      this.collectionService.getCollection(idCollection).subscribe({
        next: (data) => {
          console.log(data)
          this.addInfoToListCollection(data);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  addInfoToListCollection(data:any){
    this.title = data[0].title;
    this.itemsList = data[0].notes;
    this.itemsListNotes = this.getNamesNotes(this.itemsList);
    console.log(this.itemsListNotes)
  }

  editNote(){
    this.router.navigate([`/editNote/${this.idCollection}`]);
  }

  deleteNote(note:any){
    this.collectionService.deleteNoteFromCollection(this.idCollection,note).subscribe({
      next: (data:any) => {
        this.message.add({severity:'success', summary:'Success', detail:'Note deleted in the shared collection'});
        this.getCollection();
      },
      error: (error:any) => {
        this.message.add({severity:'error', summary:'Error', detail:'Error deleting note in the shared collection'});
        console.log(error);
      }
    });
  }

  seeNoteCollection(note:any){
    console.log(note);
    this.router.navigate([`/viewNote/${note}`]);
  }
  goBack(){
    window.history.back();
  }

  getNamesNotes(notes:any){
    let notesList:any[] = [];
    notes.forEach((note:any) => {
      this.notesService.getNote(note).subscribe({
        next: (data:any) => {
          notesList.push({
            title:data[0].title,
            id:data[0]._id
          });
        },
        error: (error:any) => {
          console.log(error);
        }
      });
    });
    return notesList;

  }
}
