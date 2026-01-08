import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NoteList } from "../components/note-list/note-list";
import {map, Observable } from 'rxjs';
import { NotesService } from '../../core/services/notes';
import { Tag } from '../../core/models/note.model';
import { ModalComponent } from "../../core/modals/modal";
import { ToastService } from '../../core/services/toast';
import { UserSettings } from "../components/user-settings/user-settings";


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, NoteList, ModalComponent, UserSettings],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})

export class Dashboard implements OnInit {
  id:string = '';
  tages$: Observable<Tag[]>;
  tagList:any;
  tagName: string = '';
  activeRoute: string = '';
  isDeleteModalOpen = false;
  isArchiveModalOpen = false;
  formId:any = undefined;

  viewportWidth: number = 0;
  currentParams: any = {};
  hideSidebar:boolean = false;


  private noteService = inject(NotesService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  constructor(
    private route: ActivatedRoute,
  ) { 
    this.tages$ = this.noteService.tags$;
  }

  ngOnInit(): void {
   this.tages$.subscribe(value => {
    setTimeout(() => {
      this.tagList = value;
    }, 0);
  });

    this.route?.url.pipe(map((value) => {
      // FIX 1: Wrap Route logic in setTimeout to prevent NG0100 error
      setTimeout(() => {
        this.checkViewPort();
        this.activeRoute = value[0]?.path;
       
        if (value[0]?.path === 'create') {
          this.id = 'create';
        } else if (value[0]?.path === 'tags') {
          if (value[2]) {
            this.id = 'tags/note'
          } else {
            if (value[1]?.path) {
              this.findActiveTag(value[1]?.path);
            }
            this.id = 'tags'
          }
        } else if(value[0]?.path === 'archived') {
          this.id = value[0]?.path;
        } else if(value[0]?.path === 'dashboard'){
          this.id = value[0]?.path;
        } else if(this.activeRoute === 'search') {
          this.id = 'search'
        } else if(this.activeRoute === 'settings') {
          this.id = 'settings'
        } else {
          this.id = value[1]?.path;
        }
      }, 0);
    })).subscribe();
    this.noteService.formActive.subscribe((value: boolean) => {
    setTimeout(() => {
      this.formId = value;
    }, 0);
  });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.checkViewPort();
  }

  checkViewPort() {
    this.viewportWidth = window.innerWidth;
    const params = this.route?.snapshot?.children[0]?.params;
    if(this.viewportWidth < 770 && params !== undefined) {
      this.hideSidebar = true;
    } else {
      this.hideSidebar = false;
    }
  }

  //Modal
  confirmDelete() {
    this.isArchiveModalOpen = false;
    this.isDeleteModalOpen = true;
  }

  toggleUserSettings() {
    console.log(true);
    this.router.navigate(['./settings'])
  }

  confirmArchive() {
    this.isDeleteModalOpen = false;
    this.isArchiveModalOpen = true;
  }

  closeModal() {
    this.isDeleteModalOpen = false;
    this.isArchiveModalOpen = false;
  }

  deleteNote() {
    this.noteService.deleteNote(this.formId).subscribe({
      next:(value)=> {
        this.isDeleteModalOpen = false;
        this.router.navigate(['/dashboard']);
        this.hideSidebar = false;
        this.formId = false;
        this.noteService.refreshNotes();
      }
    })
  }

  findActiveTag(id:any) {
    let idNum = Number(id);
    let found = this.tagList.filter((value:Tag) => {
      return value.id === idNum;
    });
    this.tagName = found[0]?.name;
  }
  
  saveNote(){
    this.noteService.emitSaveEvent();
  }

  archiveNote() {
   this.noteService.archiveNote(this.formId).subscribe({
    next: ()=> {
      this.isArchiveModalOpen = false;
      this.noteService.refreshNotes();
      this.noteService.refreshTags();
      this.toastService.show(
        'Note archived.',       // Message
        'Archived Notes',       // Link Text
        '/archived'             // Link Route
      );
    }
   });
  }

  restoreNote() {
    this.noteService.RestoreNote(this.formId).subscribe({
      next: ()=> {
        this.noteService.getArchivedNotes();
        this.noteService.refreshTags();
      }
    });
  }

  goBack() {
    this.router.navigate(['./dashboard']);
    this.hideSidebar = false;
    this.formId = false;
  }

  onSearchChange(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.noteService.setSearchTerm(query);
  }

  checkNoteId() {
    return this.id !== undefined && this.id !== 'tags';
  }

}
