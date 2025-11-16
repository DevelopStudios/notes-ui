export interface Note {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}

export interface PaginatedNoteResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Note[];
}