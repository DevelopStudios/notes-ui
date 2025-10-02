// src/app/core/services/notes.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Note {
  id?: number;
  user?: number; // Django's user ID
  title: string;
  content: string;
  tags: { id: number, name: string }[]; // Displayed tags
  tag_names?: string[]; // For sending to backend
  is_archived: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Tag {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private apiUrl = 'https://symmetrical-fortnight-jr95gggpj453pvvr-8000.app.github.dev/api/';

  constructor(private http: HttpClient) { 
    console.log(this.apiUrl);
  }

  // --- Note API Calls ---

  getNotes(): Observable<Note[]> {
    console.log(this.apiUrl);
    return this.http.get<Note[]>(`${this.apiUrl}notes/`);
  }

  getArchivedNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}notes/archived/`);
  }

  getNoteById(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}notes/${id}/`);
  }

  createNote(note: Note): Observable<Note> {
    const dataToSend = {
      title: note.title,
      content: note.content,
      tag_names: note.tags.map(tag => tag.name),
      is_archived: note.is_archived
    };
    return this.http.post<Note>(`${this.apiUrl}notes/`, dataToSend);
  }

  updateNote(id: number, note: Note): Observable<Note> {
    const dataToSend = {
      title: note.title,
      content: note.content,
      tag_names: note.tags.map(tag => tag.name),
      is_archived: note.is_archived
    };
    return this.http.put<Note>(`${this.apiUrl}notes/${id}/`, dataToSend);
  }

  partialUpdateNote(id: number, updates: Partial<Note>): Observable<Note> {
    const dataToSend: any = { ...updates };
    if (updates.tags && updates.tags.length > 0) {
        dataToSend.tag_names = updates.tags.map(tag => tag.name);
    }
    return this.http.patch<Note>(`${this.apiUrl}notes/${id}/`, dataToSend);
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}notes/${id}/`);
  }

  toggleArchiveStatus(id: number): Observable<Note> {
    return this.http.patch<Note>(`${this.apiUrl}notes/${id}/toggle_archive/`, {});
  }

  searchNotes(query: string): Observable<Note[]> {
    let params = new HttpParams().set('q', query);
    return this.http.get<Note[]>(`${this.apiUrl}notes/search/`, { params });
  }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.apiUrl}tags/`);
  }
}