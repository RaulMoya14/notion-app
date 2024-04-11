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

    getNote(id:string) {
      return this.httpclient.get<any>(`http://localhost:3000/notes/${id}`);
    }

    updateNote(jsonNote:any,idNote:string) {
        this.httpclient.put<any>(`http://localhost:3000/notes/${idNote}`,jsonNote,{ headers: { 'Content-Type': 'application/json' } }).subscribe(data => {
            console.log(data);
        }, (error) => {
            console.log('Error en la solicitud: ', error);
        });
    }

    deleteNoteById(id: number) {
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
