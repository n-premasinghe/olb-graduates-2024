import { Routes } from '@angular/router';
import { AuthComponent } from './auth_page/auth/auth.component';

export const routes: Routes = [
    {
        path: '/auth_page/app-auth',
        title: 'OLB Graduates 2024 | Login',
        component: AuthComponent
    }
];
