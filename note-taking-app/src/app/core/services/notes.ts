// src/app/core/services/notes.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Note, PaginatedNoteResponse } from '../models/note.model';


export interface Tag {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {private apiUrl = environment.apiUrl + 'notes/'; // Base URL for notes

  constructor(private http: HttpClient) { }

  // GET: /api/notes/
  getNotes(): Observable<PaginatedNoteResponse> {
    return this.http.get<PaginatedNoteResponse>(this.apiUrl);
  }

  // GET: /api/notes/{id}/
  getNoteById(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}${id}/`);
  }

  // POST: /api/notes/
  createNote(note: { title: string, content: string }): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note);
  }

  // PUT: /api/notes/{id}/
  updateNote(id: number, note: { title: string, content: string }): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}${id}/`, note);
  }

  // DELETE: /api/notes/{id}/
  deleteNote(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}