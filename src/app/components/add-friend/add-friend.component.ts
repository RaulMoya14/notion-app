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
  showFriends:boolean = false;
  pendingRequests:any[] = [];

  constructor(private friendsService:FriendsService, private spinner:NgxSpinnerService, private message:MessageService) {
    this.users = new FormGroup({});
  }

  ngOnInit(): void {
    this.friendsService.getUsers().subscribe((data)=>{
      console.log(data);
      this.friends = data as string[];
    });
    this.users= new FormGroup({
      selectedUsers: new FormControl<any>(null)
    });
    this.username = sessionStorage.getItem('username') || '';
    this.idUser = sessionStorage.getItem('userId') || '';
    this.getFriendsList();
    this.getPendingRequests();
  }

  sendRequest(){
    console.log(this.users.value.selectedUsers);
    let requests_friend = this.users.value.selectedUsers;
    this.users.reset();
    for(let request in requests_friend){
      this.friendsService.sendRequestFriend(this.idUser,request).subscribe((data)=>{
        console.log(data);
        this.message.add({severity:'success', summary:'Success', detail:'Friend request sent'});
      });
    }
  }

  getFriendsList():void{
    this.spinner.show();
    this.friendsService.getFriends(this.idUser).subscribe((data)=>{
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
      console.log(this.userFriends);
      this.showFriends = true;
      this.spinner.hide();
    });
  }

  getPendingRequests():void{
    this.spinner.show();
    this.friendsService.getPendingRequests(this.username).subscribe((data)=>{
      console.log(data);
      if ('pending_requests' in data && Array.isArray(data.pending_requests)) {
        this.pendingRequests = data.pending_requests;
      }
      console.log(this.pendingRequests);
      this.spinner.hide();
    });
  }

  removeFriend(){
    this.spinner.show();
    console.log(this.selectedFriends);

  }

}
