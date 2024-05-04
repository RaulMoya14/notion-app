import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private HttpClient: HttpClient) { }

  getUsers(){
    return this.HttpClient.get('http://localhost:3000/users');
  }

  addFriend(user:string,new_friends:string[]){
    let sendRequestFriend = {
      user: user,
      new_friend: new_friends
    }
    let body = JSON.stringify(sendRequestFriend);
    return this.HttpClient.post('http://localhost:3000/friends',body);
  }

  getFriends(user:string){
    return this.HttpClient.get('http://localhost:3000/friends/admin');
  }

}
