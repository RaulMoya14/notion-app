import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShareNotesService {

  constructor(private httpClient:HttpClient) { }

  shareNote(idNote: string, idFriend: string) {
    let body = {
      users: idFriend
    }
    return this.httpClient.put<any>(`http://localhost:3000/notes/addUsers/${idNote}`,body);
  }
}
