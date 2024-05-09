import { CollectionService } from './../../services/collection.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-user-collection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-user-collection.component.html',
  styleUrl: './view-user-collection.component.css'
})
export class ViewUserCollectionComponent {

  idCollection: string = '';
  title: string = '';
  itemsList: any[] = [];

  constructor(private collectionService: CollectionService,private route: ActivatedRoute, private router:Router) { }

  ngOnInit(){
    this.getCollection();
  }
  getCollection(){
    const idCollection = this.route.snapshot.paramMap.get('id');
    if(idCollection){
      this.idCollection = idCollection;
      this.collectionService.getCollection(idCollection).subscribe({
        next: (data) => {
          console.log(data)
          this.addInfoToListCollection(data);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  addInfoToListCollection(data:any){
    this.title = data[0].title;
    this.itemsList = data[0].notes;
  }

  editNote(){
    this.router.navigate([`/editNote/${this.idCollection}`]);
  }

  deleteNote(note:any){
    this.collectionService.deleteNoteFromCollection(note).subscribe({
      next: (data:any) => {
        console.log(data);
        this.router.navigate([`/collection`]);
      },
      error: (error:any) => {
        console.log(error);
      }
    });
  }

  seeNoteCollection(note:any){
    this.router.navigate([`/viewNote/${note}`]);
  }
  goBack(){
    window.history.back();
  }
}
