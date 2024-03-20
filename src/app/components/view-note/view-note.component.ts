import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../interfaces/note';

@Component({
  selector: 'app-view-note',
  standalone: true,
  imports: [],
  templateUrl: './view-note.component.html',
  styleUrl: './view-note.component.css'
})
export class ViewNoteComponent implements OnInit{

  id: number =0;
  note: Note = {
    id: 0,
    title: '',
    content: '',
    date: new Date(),
    url_img_note: ''
  };

  constructor(private route: ActivatedRoute, private notesService:NotesService  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      if (idString !== null) {
        this.id = parseInt(idString);
        console.log("id view note: " + this.id)
      }
    });
    this.getNote();
  }

  getNote() {
    console.log("EN getNote")
    console.log("idNota: " + this.id)
    this.notesService.getNote(this.id).subscribe(
      (response) => {
        console.log(response)
        this.note = response.data;
        console.log(this.note)
      },
      (error) => {
        console.log(error)
      }
    );
  }

}
