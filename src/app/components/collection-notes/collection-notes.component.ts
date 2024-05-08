import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CollectionService } from '../../services/collection.service';
import { Collection } from '../../models/collection';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { MultiSelectModule } from 'primeng/multiselect';
import { FriendsService } from '../../services/friends.service';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FriendList } from '../../models/friend-list';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-collection-notes',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,ToastModule,MultiSelectModule,NgxSpinnerModule],
  templateUrl: './collection-notes.component.html',
  styleUrl: './collection-notes.component.css',
  providers: [MessageService]
})
export class CollectionNotesComponent implements OnInit{

  collectionTitle: string = '';
  userCollections:Collection[] = [];
  users: FormGroup;
  userFriends:any[] = [];

  constructor(private collectionService: CollectionService, private message:MessageService,
              private router:Router, private friendsService:FriendsService, private spinner:NgxSpinnerService
  ) {
    this.users= new FormGroup({
      selectedFriends: new FormControl<any>(null)
    });
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getUserCollections();
    this.getFriends();
    this.spinner.hide();
  }

  addCollection() {
    let user = sessionStorage.getItem('userId') || '';
    this.collectionService.addCollection(user,this.collectionTitle).subscribe({
      next: (data) => {
        this.message.add({severity:'success', summary:'Success', detail:'Collection added'});
        this.getUserCollections();
      },
      error: (error) => {
        this.message.add({severity:'error', summary:'Error', detail:'Error adding collection'});
      }
    });
  }
  getUserCollections(){
    let user = sessionStorage.getItem('userId') || '';
    this.collectionService.getCollections(user).subscribe((data) => {
      console.log(data);
      this.userCollections = data;
    });
  }
  deleteCollection(idCollection:string){
    this.collectionService.deleteCollection(idCollection).subscribe({
      next: (data:any) => {
        this.message.add({severity:'success', summary:'Success', detail:'Collection deleted'});
        this.getUserCollections();
      },
      error: (error:any) => {
        this.message.add({severity:'error', summary:'Error', detail:'Error deleting collection'});
      }
    });
  }
  viewCollection(idCollection:string){
    console.log(this.userCollections)
    // this.router.navigate([`/viewCollection/${idCollection}`]);
  }

  getFriends(){
    this.friendsService.getFriends(sessionStorage.getItem('username') || '').subscribe({
      next: (data) => {
        console.log(data)
        for(let user in data.friends){
          console.log(data.friends[user])
          this.userFriends.push({ username: data.friends[user] });
        }
      },
      error: (error:any) => {
        console.log('Error getting friends');
      }
    });
  }

  shareCollection(idCollection:string){
    if(this.users.value.selectedFriends != null){
      let friends = this.users.value.selectedFriends;
      console.log(friends);
      console.log(idCollection);
      for(let friend in friends){
        console.log(friends[friend].username);
        this.collectionService.shareCollection(friends[friend].username,idCollection).subscribe({
          next: (data:any) => {
            this.message.add({severity:'success', summary:'Success', detail:'Collection shared'});
          },
          error: (error:any) => {
            this.message.add({severity:'error', summary:'Error', detail:'Error sharing collection'});
          }
        });
      }
    }
  }
}
