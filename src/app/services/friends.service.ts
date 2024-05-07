import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ListPendingRequests } from '../models/list-pending-requests';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private HttpClient: HttpClient) { }

  getUsers(){
    return this.HttpClient.get('http://localhost:3000/users');
  }

  sendRequestFriend(user:string,requestedFriend:string){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    let sendRequestFriend = {
      friendsRequests: requestedFriend
    }
    return this.HttpClient.put(`http://localhost:3000/friends/sendFriendRequest/${user}`,sendRequestFriend);
  }

  getFriends(user:string){
    return this.HttpClient.get(`http://localhost:3000/friends/${user}`);
  }

  removeFriend(user:string,friend:string){
    let removeFriend = {
      friends: friend
    }
    return this.HttpClient.put(`http://localhost:3000/friends/deleteFriend/${user}`,removeFriend);
  }

  getPendingRequests(user:string){
    return this.HttpClient.get<ListPendingRequests>(`http://localhost:3000/friends/requests/${user}`);
  }

  acceptRequest(user:string,friend:string){
    let acceptFriend = {
      friendsRequests: friend
    }
    return this.HttpClient.put(`http://localhost:3000/friends/acceptFriend/${user}`,acceptFriend );
  }

  rejectRequest(user:string,friend:string){
    let rejectRequest = {
      friendsRequests: friend
    }
    return this.HttpClient.put(`http://localhost:3000/friends/declineFriend/${user}`,rejectRequest );
  }

}
