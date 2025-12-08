export interface Note {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
    tags: Tag[];
}
export interface Tag {
  id: number;
  name: string;
}
export interface PaginatedNoteResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Note[];
}

export interface PaginatedTagResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Tag[];
}