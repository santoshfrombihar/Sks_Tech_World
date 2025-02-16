import { Routes } from '@angular/router';
import { AuthFunctionComponent } from './auth-function/auth-function.component';
import { HeaderComponent } from './Dashboard/header/header.component';
import { ProfileComponent } from './Dashboard/profile/profile.component';
import { ClassesComponent } from './Dashboard/classes/classes.component';
export const routes: Routes = [
    {
        path: '',
        component: AuthFunctionComponent
    },
    {
        path: 'home',
        component: ClassesComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    }
];
