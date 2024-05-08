import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CollectionService {

    constructor(private httpclient: HttpClient) { }

    getCollections(idUser: string): Observable<any> {
        return this.httpclient.get<any>(`http://localhost:3000/collection/user/${idUser}`);
    }

    addCollection(idUser:string,collectionTitle: string): Observable<any> {
      let new_collection = {
        owner:idUser,
        notes: [],
        title: collectionTitle
      }
      console.log(new_collection)
      return this.httpclient.post<any>(`http://localhost:3000/collection/insert`, new_collection);
    }

    deleteCollection(idCollection: string): Observable<any> {
        return this.httpclient.delete<any>(`http://localhost:3000/collection/${idCollection}`);
    }

    shareCollection(idCollection: string, idFriend: string): Observable<any> {
        let body = {
          users: idFriend
        }
        console.log(body)
        console.log(idCollection)
        return this.httpclient.put<any>(`http://localhost:3000/collection/addUsers/${idCollection}`, body);
    }
}
