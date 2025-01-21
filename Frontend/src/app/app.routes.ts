import { Routes } from '@angular/router';
import { AuthFunctionComponent } from './auth-function/auth-function.component';
import { HeaderComponent } from './Dashboard/header/header.component';

export const routes: Routes = [
    {
        path: 'login' ,
        component: AuthFunctionComponent
    },
    {
        path: '',
        component: HeaderComponent
    }
];
