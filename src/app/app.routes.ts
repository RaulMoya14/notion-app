import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ViewUserNotesComponent } from './components/view-user-notes/view-user-notes.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { ViewNoteComponent } from './components/view-note/view-note.component';
import { RegisterComponent } from './components/register/register.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { CollectionNotesComponent } from './components/collection-notes/collection-notes.component';

export const routes: Routes = [

    { path: 'register', component: RegisterComponent},
    { path: '', component: LoginComponent},
    { path: '', component: MainLayoutComponent,children: [
        { path: 'home', component: HomeComponent},
        { path: 'userNotes', component: ViewUserNotesComponent},
        { path: 'addNote', component: AddNoteComponent},
        { path: 'viewNote/:id', component: ViewNoteComponent},
        { path: 'collection', component: CollectionNotesComponent}
    ]}
];
