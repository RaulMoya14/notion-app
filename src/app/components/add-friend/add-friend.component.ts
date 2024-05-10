import { FriendsService } from '../../services/friends.service';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormControl } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule, Spinner } from 'ngx-spinner';
import { NgxSpinnerService } from "ngx-spinner";
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ListPendingRequests } from '../../models/list-pending-requests';

@Component({
  selector: 'app-add-friend',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MultiSelectModule,ListboxModule,CommonModule,NgxSpinnerModule,ToastModule],
  templateUrl: './add-friend.component.html',
  styleUrl: './add-friend.component.css',
  providers: [MessageService]
})
export class AddFriendComponent implements OnInit{

  friends?:any[];
  users: FormGroup;
  selectedFriends!:any;
  username:string = '';
  idUser:string = '';
  userFriends:any[] = [];
  pendingRequests:any[] = [];

  constructor(private friendsService:FriendsService, private spinner:NgxSpinnerService, private message:MessageService) {
    this.users = new FormGroup({});
  }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username') || '';
    this.idUser = sessionStorage.getItem('userId') || '';
    this.users= new FormGroup({
      selectedUsers: new FormControl<any>(null)
    });
    this.getFriendsList();
    this.getPendingRequests();
    this.getUsers();
  }

  getUsers(){
    this.friendsService.getUsers().subscribe((data)=>{
      this.friends = data as string[];
      console.log(this.userFriends);
      this.friends = this.friends.filter(friend => friend.username !== this.username && !this.userFriends.some(user => user.label === friend.username));
    });
  }

  sendRequest(){
    let requests_friend = this.users.value.selectedUsers;
    this.users.reset();
    for(let request in requests_friend){
      this.friendsService.sendRequestFriend(this.idUser,requests_friend[request].username).subscribe((data)=>{
        this.message.add({severity:'success', summary:'Success', detail:'Friend request sent'});
      });
    }
  }

  getFriendsList():void{
    this.userFriends = [];
    this.spinner.show();
    this.friendsService.getFriends(this.username).subscribe((data)=>{
      console.log(data);
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

  getPendingRequests():void{
    this.spinner.show();
    this.friendsService.getPendingRequests(this.username).subscribe(
      (data:ListPendingRequests) => {
        this.pendingRequests = data.friendsRequests;
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
      this.spinner.hide();
    });
  }

  removeFriend(){
    this.spinner.show();
    for(let friend in this.selectedFriends){
      this.friendsService.removeFriend(this.idUser,this.selectedFriends[friend].value).subscribe({
        next: response => {
          console.log(response);
          this.getFriendsList();
          this.spinner.hide();
          this.message.add({severity:'success', summary:'Success', detail:'Friend removed successfully'});
        },
        error: err => {
          this.spinner.hide();
          this.message.add({severity:'error', summary:'Error', detail:'An error occurred while removing the friend'})
        }
      });
    }
  }

  acceptRequest(user:any){
    this.spinner.show();
    this.friendsService.acceptRequest(this.idUser,user).subscribe({
      next: response => {
        console.log(response);
        this.getFriendsList();
        this.getPendingRequests();
        this.getUsers();
        this.spinner.hide();
        this.message.add({severity:'success', summary:'Success', detail:'Friend added successfully'});
      },
      error: err => {
        this.spinner.hide();
        this.message.add({severity:'error', summary:'Error', detail:'An error occurred while accepting the friend'})
      }
    });
  }

  rejectRequest(user:any){
    this.spinner.show();
    this.friendsService.rejectRequest(this.idUser,user).subscribe({
      next: response => {
        console.log(response);
        this.getFriendsList();
        this.getPendingRequests();
        this.spinner.hide();
        this.message.add({severity:'success', summary:'Success', detail:'Request friend rejected'});
      },
      error: err => {
        this.spinner.hide();
        this.message.add({severity:'error', summary:'Error', detail:'An error occurred while rejecting the request friend'})
      }
    });
  }

}
