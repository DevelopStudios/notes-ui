import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Note, PaginatedNoteResponse, PaginatedTagResponse } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {private apiUrl = environment.apiUrl + 'notes/';

  constructor(private http: HttpClient) { }

  getNotes(): Observable<PaginatedNoteResponse> {
    return this.http.get<PaginatedNoteResponse>(this.apiUrl);
  }

  getArchivedNotes(): Observable<PaginatedNoteResponse> {
    return this.http.get<PaginatedNoteResponse>(this.apiUrl+'archived');
  }

  getTags(): Observable<PaginatedTagResponse> {
    return this.http.get<PaginatedTagResponse>(environment.apiUrl+'tags');
  }

  getNoteById(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}${id}/`);
  }

  getNotesByTag(tagId:string): Observable<PaginatedNoteResponse> {
    return this.http.get<PaginatedNoteResponse>(`${this.apiUrl}?tag_id=${tagId}`);
  }

  createNote(note: { title: string, content: string }): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note);
  }

  searchNote(query:string): Observable<PaginatedNoteResponse> {
    return this.http.get<PaginatedNoteResponse>(`${this.apiUrl}search/`,{
      params:{q: query}
    });
  }

  updateNote(id: number, note: { title: string, content: string }): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}${id}/`, note);
  }

  deleteNote(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

}