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

  sendRequestFriend(user:string,requestedFriend:string){
    let sendRequestFriend = {
      friendsRequests: requestedFriend
    }
    let body = JSON.stringify(sendRequestFriend);
    return this.HttpClient.put(`http://localhost:3000/friends/sendFriendRequest/${user}`,body);
  }

  getFriends(user:string){
    return this.HttpClient.get('http://localhost:3000/friends/admin');
  }

  removeFriend(user:string,friend:string){
    let removeFriend = {
      user: user,
      friend: friend
    }
    let body = JSON.stringify(removeFriend);
    return this.HttpClient.post('http://localhost:3000/deleteFriend',body);
  }

  getPendingRequests(user:string){
    return this.HttpClient.get(`http://localhost:3000/friends/requests/${user}`);
  }

}
