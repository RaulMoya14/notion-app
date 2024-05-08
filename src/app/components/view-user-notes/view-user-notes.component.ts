import { Component,OnInit } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Item } from '../../models/item';
import { DropdownItemComponent } from '../dropdown-item/dropdown-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CollectionService } from '../../services/collection.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FriendsService } from '../../services/friends.service';
import { NgxSpinnerModule, Spinner } from 'ngx-spinner';
import { NgxSpinnerService } from "ngx-spinner";
import { ShareNotesService } from '../../services/share-notes.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-view-user-notes',
  standalone: true,
  imports: [DropdownItemComponent, CommonModule, ReactiveFormsModule,MultiSelectModule,FormsModule, NgxSpinnerModule, ToastModule],
  templateUrl: './view-user-notes.component.html',
  styleUrl: './view-user-notes.component.css',
  providers: [MessageService]

})
export class ViewUserNotesComponent implements OnInit{

  notes: any[] = [];
  userCollections: any[] = [];
  collectionSelected: any;
  friendsSelected: any;
  userFriends: any[] = [];
  username:string = '';
  idUser:string = '';

  constructor(private notesService:NotesService, private router:Router, private collectionService:CollectionService,
              private friendsService:FriendsService, private spinner:NgxSpinnerService, private shareNotesService:ShareNotesService,
              private messageService:MessageService
  ) { }

  ngOnInit(){
    this.username = sessionStorage.getItem('username') || '';
    this.idUser = sessionStorage.getItem('userId') || '';
    this.getNotes();
    this.getUserCollections();
    this.getFriendsList();
    this.notes.forEach(note => {
      note.selectedCollection = null;
      note.friendsSelected = null
    });
  }

  getNotes(){
    let user = sessionStorage.getItem('userId') || '';
    this.notesService.getNotes(user).subscribe((data) => {
      console.log("NOTAS USER")
      console.log(data);
      this.addInfoToListNotes(data);
    });
  }
  addInfoToListNotes(data:any){
    for (let i = 0; i < data.length; i++) {
      let note = {
        idNote: data[i]._id,
        title: data[i].title,
        owner: data[i].owner,
        users: data[i].users,
      }
      this.notes.push(note);
    }
    console.log('NotesList: ', this.notes);
  }

  deleteNoteById(id:string){
    console.log('Eliminando nota con id: ', id);
    this.notesService.deleteNoteById(id).subscribe({
      next: (data:any) => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Note deleted'});
      },
      error: (err:any) => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Error deleting note'});
      }
    });
    this.getNotes();
  }
  editNoteById(idNote:string){
    console.log(idNote)
    console.log('Editando nota con id: ', idNote);
    this.router.navigate([`/viewNote/${idNote}`]);
  }
  getUserCollections(){
    let user = sessionStorage.getItem('userId') || '';
    this.collectionService.getCollections(user).subscribe({
      next: (data) => {
        this.userCollections = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  addNoteToCollection(note:any){
    console.log(this.collectionSelected);
  }

  getFriendsList():void{
    this.userFriends = [];
    this.spinner.show();
    this.friendsService.getFriends(this.username).subscribe((data)=>{
      if ('friends' in data && Array.isArray(data.friends)) {
        for(let friend in data.friends){
          this.userFriends.push({
            label: data.friends[friend],
            value: data.friends[friend]
          }
          )
        }
      }
      this.spinner.hide();
    });
  }
  shareNoteWithFriend(nota:any){
    for (let i = 0; i < nota.friendsSelected.length; i++) {
      this.shareNotesService.shareNote(nota.idNote, nota.friendsSelected[i].value).subscribe({
        next: (data) => {
          this.messageService.add({severity:'success', summary:'Success', detail:'Note shared with friend'});
        },
        error: (error) => {
          this.messageService.add({severity:'error', summary:'Error', detail:'Error sharing note with friend'});
        }
      });
    }
  }

}
