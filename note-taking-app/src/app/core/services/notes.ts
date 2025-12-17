import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Note, NotePayload, PaginatedNoteResponse, PaginatedTagResponse } from '../models/note.model';

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

  archiveNote(id:string): Observable<any> {
    console.log(true);
    return this.http.patch<any>(this.apiUrl+id+'/', {is_archived:true});
  }

  getTags(): Observable<PaginatedTagResponse> {
    return this.http.get<PaginatedTagResponse>(environment.apiUrl+'tags');
  }

  getNoteById(id: string): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}${id}/`);
  }

  getNotesByTag(tagId:string): Observable<PaginatedNoteResponse> {
    return this.http.get<PaginatedNoteResponse>(`${this.apiUrl}?tag_id=${tagId}`);
  }

  createNote(note: NotePayload): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note);
  }

  searchNote(query:string): Observable<PaginatedNoteResponse> {
    return this.http.get<PaginatedNoteResponse>(`${this.apiUrl}search/`,{
      params:{q: query}
    });
  }

  updateNote(id: number, note: NotePayload): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}${id}/`, note);
  }

  deleteNote(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

}