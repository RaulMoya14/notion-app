import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-view-note',
  standalone: true,
  imports: [],
  templateUrl: './view-note.component.html',
  styleUrl: './view-note.component.css'
})

export class ViewNoteComponent {



  constructor(private route: ActivatedRoute, private notesService: NotesService) { }



}
