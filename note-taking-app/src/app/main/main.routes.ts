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
                path: 'archived',
                component: Dashboard,
                title: 'Archived'
            },
            {
                path: 'tags',
                component: Dashboard,
                title: 'Tags'
            },
            {path:'', redirectTo:'dashboard', pathMatch:'full'},
        ]
    }
];