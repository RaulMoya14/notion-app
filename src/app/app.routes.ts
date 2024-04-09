import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ViewNoteComponent } from './components/view-note/view-note.component';
import { AddNoteComponent } from './components/add-note/add-note.component';

export const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'home', component: HomeComponent},
    { path: 'addNote', component: AddNoteComponent},
    { path: 'viewNote/:id', component: ViewNoteComponent}
];
