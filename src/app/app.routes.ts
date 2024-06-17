import { Routes } from '@angular/router';

import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard'

import { AuthComponent } from './auth_page/auth/auth.component';
import { HomeComponent } from './home_page/home/home.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

export const routes: Routes = [
    {
        path: '',
        title: 'OLB Graduates 2024 | Login',
        component: AuthComponent,
        canActivate: [AuthGuard],
        data: { authGuardPipe: redirectLoggedInToHome },
    },
    {
        path: 'login',
        title: 'OLB Graduates 2024 | Login',
        component: AuthComponent,
        canActivate: [AuthGuard],
        data: { authGuardPipe: redirectLoggedInToHome },
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
    },

];
