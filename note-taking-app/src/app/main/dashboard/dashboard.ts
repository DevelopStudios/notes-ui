import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
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
