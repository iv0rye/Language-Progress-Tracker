import { Routes } from '@angular/router';
import { LogIn } from './auth/components/log-in/log-in';
import { SignUp } from './auth/components/sign-up/sign-up';
import { FooterOnlyLayout } from './layouts/footer-only-layout/footer-only-layout';

export const routes: Routes = [{
    path: 'auth',
    component: FooterOnlyLayout,
    children: [
      { path: 'login', component: LogIn },
      { path: 'signup', component: SignUp }
    ]
}];
