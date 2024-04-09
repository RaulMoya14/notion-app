import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note';

@Injectable({
    providedIn: 'root'
})
export class NotesService {

    constructor(private httpclient: HttpClient) { }

    addNote(jsonNote:any) {
        this.httpclient.post<any>('http://localhost:3000/notes/insert', jsonNote,{ headers: { 'Content-Type': 'application/json' } } ).subscribe(data => {
            console.log(data);
        }, (error) => {
            console.log('Error en la solicitud: ', error);
        });
    }

    getNote(id:number) {
      return this.httpclient.get<any>(`http://localhost:3000/notes/${id}`);
    }

    updateNote(id: number, title: string, content: string, date: Date, imageUrl: string) {
        this.httpclient.put<any>(`http://localhost:3000/notes/${id}`, { title: title, content: content , date: date, imageUrl: imageUrl }).subscribe(data => {
            console.log(data);
        }, (error) => {
            console.log('Error en la solicitud: ', error);
        });
    }

    deleteNote(id: number) {
        this.httpclient.delete<any>(`http://localhost:3000/notes/${id}`).subscribe(data => {
            console.log(data);
        }, (error) => {
            console.log('Error en la solicitud: ', error);
        });
    }

    getNotes(idUser:string): Observable<any> {
        return this.httpclient.get<any>(`http://localhost:3000/notes/user/${idUser}`);
    }

}
