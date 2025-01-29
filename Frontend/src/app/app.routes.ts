import { Routes } from '@angular/router';
import { AuthFunctionComponent } from './auth-function/auth-function.component';
import { HeaderComponent } from './Dashboard/header/header.component';

export const routes: Routes = [
    {
        path: '' ,
        component: AuthFunctionComponent
    },
    {
        path: 'login',
        component: HeaderComponent
    }
];
