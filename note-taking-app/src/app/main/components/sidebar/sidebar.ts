import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotesService } from '../../../core/services/notes';
import { Tag } from '../../../core/models/note.model';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule,CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  tags: Tag[]=[];
  constructor(private notesService: NotesService){

  }
  
  ngOnInit(): void {
    this.getTags();
  }

  getTags(){
    this.notesService.getTags().subscribe(value => {
      this.tags = value.results;
    });
  }


}
