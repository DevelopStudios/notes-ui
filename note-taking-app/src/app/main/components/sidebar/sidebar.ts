import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { NotesService } from '../../../core/services/notes';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule,CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  constructor(private notesService: NotesService){

  }
  ngOnInit(): void {
  }

  tags = [
    'Cooking', 'Dev', 'Fitness', 'Health', 'Personal', 
    'React', 'Recipes', 'Shopping', 'Travel', 'TypeScript'
  ]
}
