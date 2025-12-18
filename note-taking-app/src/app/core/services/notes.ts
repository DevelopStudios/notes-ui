import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Note, NotePayload, PaginatedNoteResponse, PaginatedTagResponse, Tag } from '../models/note.model';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private apiUrl = environment.apiUrl + 'notes/';
  private tagsUrl = environment.apiUrl + 'tags/';
  private noteSubject = new BehaviorSubject<Note[]>([]);
  private tagSubject = new BehaviorSubject<Tag[]>([]);

  tags$ = this.tagSubject.asObservable();
  notes$ = this.noteSubject.asObservable();
  constructor(private http: HttpClient) { }

  // Refresh Methods
  refreshNotes():void {
    this.http.get<PaginatedNoteResponse>(this.apiUrl).subscribe(response => {
      this.noteSubject.next(response.results);
  });
  }

  refreshTags():void {
    this.http.get<PaginatedTagResponse>(this.tagsUrl).subscribe(response => {
      this.tagSubject.next(response.results);
    });
  }

  // Helper Function
  fetchNotesByQuery(params: any): void {
    this.http.get<PaginatedNoteResponse>(this.apiUrl, {params}).subscribe(res => {
      this.noteSubject.next(res.results);
    })
  }

  // CRUD Operations
  archiveNote(id: string): Observable<any> {
    return this.http.patch<any>(this.apiUrl + id + '/', { is_archived: true });
  }

  getTags(): Observable<PaginatedTagResponse> {
    return this.http.get<PaginatedTagResponse>(environment.apiUrl + 'tags');
  }

  getNoteById(id: string): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}${id}/`);
  }

  getNotesByTag(tagId: string): Observable<PaginatedNoteResponse> {
    return this.http.get<PaginatedNoteResponse>(`${this.apiUrl}?tag_id=${tagId}`);
  }

  createNote(note: NotePayload): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note).pipe(tap(() => 
      this.refreshTags()
    ));
  }

  searchNote(query: string): Observable<PaginatedNoteResponse> {
    return this.http.get<PaginatedNoteResponse>(`${this.apiUrl}search/`, {
      params: { q: query }
    });
  }

  updateNote(id: number, note: NotePayload): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}${id}/`, note).pipe(tap(()=> {
      this.refreshTags();
      this.refreshNotes();
    }
    ));
  }

  deleteNote(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`).pipe(tap(()=> 
      this.refreshTags()
    ));
  }

  // Read-Only
  getNotes(): Observable<PaginatedNoteResponse> {
    return this.http.get<PaginatedNoteResponse>(this.apiUrl);
  }

  getArchivedNotes(): Observable<PaginatedNoteResponse> {
    return this.http.get<PaginatedNoteResponse>(this.apiUrl + 'archived');
  }

}