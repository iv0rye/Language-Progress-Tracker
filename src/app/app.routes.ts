import { Routes } from '@angular/router';
import { LogIn } from './auth/components/log-in/log-in';
import { LogOut } from './auth/components/log-out/log-out';
import { SignUp } from './auth/components/sign-up/sign-up';

export const routes: Routes = [
    { path: 'login', component: LogIn },
    { path: 'logout', component: LogOut },
    { path: 'sign-up', component: SignUp }
];
