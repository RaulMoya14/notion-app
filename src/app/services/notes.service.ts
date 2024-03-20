import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../interfaces/note';

@Injectable({
    providedIn: 'root'
})
export class NotesService {

    constructor(private httpclient: HttpClient) { }

    createNote(title: string, content: string) {
        this.httpclient.post<any>('http://localhost:3000/notes/create', { title: title, content: content }).subscribe(data => {
            console.log(data);
        }, (error) => {
            console.log('Error en la solicitud: ', error);
        });
    }

    updateNote(id: number, title: string, content: string) {
        this.httpclient.put<any>(`http://localhost:3000/notes/${id}`, { title, content }).subscribe(data => {
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

    getNotes(): Observable<any> {
        return this.httpclient.get<any>(`http://localhost:3000/notes`);
    }

}
