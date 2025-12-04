import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule,CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  tags = [
    'Cooking', 'Dev', 'Fitness', 'Health', 'Personal', 
    'React', 'Recipes', 'Shopping', 'Travel', 'TypeScript'
  ]
}
