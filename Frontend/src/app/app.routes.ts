import { Routes } from '@angular/router';
import { AuthFunctionComponent } from './auth-function/auth-function.component';
import { ProfileComponent } from './Dashboard/profile/profile.component';
import { ClassesComponent } from './Dashboard/classes/classes.component';
import { CourseContentComponent } from './Dashboard/course-content/course-content.component';
import { AuthGuard } from './services/auth/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: AuthFunctionComponent
    },
    {
        path: 'home',
        component: ClassesComponent, canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent, canActivate: [AuthGuard]
    },
    {
        path: 'coursepage',
        component: CourseContentComponent, canActivate: [AuthGuard]
    }
];
