import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NoteList } from "../components/note-list/note-list";
import { NoteForm } from '../components/note-form/note-form';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, NoteList, NoteForm],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  constructor() {}

  ngOnInit(): void {
    
  }
 
  onSearchChange($event: Event) {
    const query = (event?.target as HTMLInputElement).value;
    console.log(query);
  }

}
