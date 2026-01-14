import { Routes } from "@angular/router";
import { Shell } from "./shell/shell";
import { authGuard } from "../core/guards/auth-guard";
import { Dashboard } from "./dashboard/dashboard";
import { NoteForm } from "./components/note-form/note-form";
import { TagsList } from "./pages/tags-list/tags-list";
import { ChangePassword } from "./components/change-password/change-password";

export const mainRoutes: Routes = [
    {
        path: '',
        component: Shell,
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                component: Dashboard,
                title: 'Dashboard',
                children: [
                    { path: ':id', component: NoteForm }
                ]
            },
            {
                path: 'archived',
                component: Dashboard,
                title: 'Archived',
                children: [
                    { path: ':id', component: NoteForm }
                ]
            },
            {
                path: 'tags/:id',
                component: Dashboard,
                title: 'Tags',
                children: [
                    { path: ':noteId', component: NoteForm }
                ]
            },
            {
                path: 'tags',
                component: TagsList,
                title: 'Tags',
            },
            {
                path: 'create',
                component: Dashboard,
                title: 'Create Note',
                children: [
                    { path: '', component: NoteForm }
                ]
            },
            {
                path: 'settings',
                component: Dashboard,
                title: 'Settings',
                children: [
                    { path: 'password-change', component: ChangePassword, title: 'Change Password' }
                ]
            },
            {
                path: 'search',
                component: Dashboard,
                title: 'Search'
            },
            {path:'', redirectTo:'dashboard', pathMatch:'full'},
        ]
    }
];