import { Routes } from "@angular/router";
import { Shell } from "./shell/shell";
import { authGuard } from "../core/guards/auth-guard";
import { Dashboard } from "./dashboard/dashboard";

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
            {
                path: 'dashboard/:id',
                component: Dashboard,
                title: 'Dashboard'
            },
            {
                path: 'archived',
                component: Dashboard,
                title: 'Archived'
            },
            {
                path: 'archived/:id',
                component: Dashboard,
                title: 'Archived'
            },
            {
                path: 'tags/:id',
                component: Dashboard,
                title: 'Tags'
            },
            {
                path: 'create',
                component: Dashboard,
                title: 'Create Note'
            },
            {path:'', redirectTo:'dashboard', pathMatch:'full'},
        ]
    }
];