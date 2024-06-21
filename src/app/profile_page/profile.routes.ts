import { Routes } from "@angular/router";
import { HomeComponent } from "../home_page/home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from "@angular/fire/auth-guard";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

export const PROFILE_ROUTES: Routes = [
    {
        path: ':uid',
        title: 'OLB Graduates 2024 | View Profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin }
    }
]