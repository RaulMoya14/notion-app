import { FriendsService } from '../../services/friends.service';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormControl } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-friend',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MultiSelectModule,ListboxModule,CommonModule],
  templateUrl: './add-friend.component.html',
  styleUrl: './add-friend.component.css'
})
export class AddFriendComponent implements OnInit{

  friends?:any[];
  users: FormGroup;
  selectedFriends!:any;
  username:string = '';
  userFriends:any[] = [];

  pruebaFriends:any[] = [{
    label: 'User 1',
    value: 'User 1'
  },
  {
    label: 'User 2',
    value: 'User 2'
  },
  {
    label: 'User 3',
    value: 'User 3'
  }];

  constructor(private friendsService:FriendsService) {
    this.users = new FormGroup({});
  }

  ngOnInit(): void {
    this.friendsService.getUsers().subscribe((data)=>{
      console.log(data);
      this.friends = data as string[];
    });
    this.getFriendsList();
    this.users= new FormGroup({
      selectedUsers: new FormControl<any>(null)
    });
    this.username = sessionStorage.getItem('username') || '';
  }

  addFriend(){
    console.log(this.users.value.selectedUsers);
    let requests_friend = this.users.value.selectedUsers;
    this.users.reset();
    // this.friendsService.addFriend(this.username,requests_friend).subscribe((data)=>{
    //   console.log(data);
    // });
  }

  getFriendsList():void{

    this.friendsService.getFriends('admin').subscribe((data)=>{
      if ('friends' in data && Array.isArray(data.friends)) {
        const friendsArray: string[]= data.friends;
        console.log(friendsArray);
        this.userFriends = friendsArray;
      }
    });
  }

}
