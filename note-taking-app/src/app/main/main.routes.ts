import { Routes } from "@angular/router";
import { Shell } from "./shell/shell";
import { authGuard } from "../core/guards/auth-guard";
import { Dashboard } from "./dashboard/dashboard";
import { NoteEditor } from "./note-editor/note-editor";

export const mainRoutes: Routes = [
    {
        path: '',
        component: Shell,
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                component: Dashboard,
                title: 'Dashboard'
            },
            {path: 'notes/new', component: NoteEditor, title: 'New Note'},
            {path: 'notes/:id', component: NoteEditor, title: 'Edit Note'},
            //Default route
            {path:'', redirectTo:'dashboard', pathMatch:'full'}
        ]
    }
];