import { Routes } from '@angular/router';
import { LogIn } from './auth/components/log-in/log-in';
import { SignUp } from './auth/components/sign-up/sign-up';

export const routes: Routes = [
    { path: 'login', component: LogIn },
    { path: 'sign-up', component: SignUp }
];
