import { Routes } from '@angular/router';

import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard'

import { AuthComponent } from './auth_page/auth/auth.component';
import { HomeComponent } from './home_page/home/home.component';
import { UpdateProfileComponent } from './update_profile_page/update-profile/update-profile.component';
import { ProfileComponent } from './profile_page/profile/profile.component';

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
        path: 'update-profile',
        title: 'OLB Graduates 2024 | Update Profile',
        component: UpdateProfileComponent,
        canActivate: [AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
    },
    {
        path: 'home',
        title: 'OLB Graduates 2024 | Home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
    },
    {
        path: 'profile/:uid',
        // loadChildren: () => import('./profile_page/profile.routes').then(r => r.PROFILE_ROUTES),
        component: ProfileComponent,
        title: 'OLB Graduates 2024 | View Profile',
        canActivate: [AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
    },

];
