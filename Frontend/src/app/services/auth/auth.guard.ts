import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) { }

    canActivate(): boolean {
        if (isPlatformBrowser(this.platformId) && sessionStorage.getItem('authToken')) {
            return true;
        }
        this.router.navigate(['']);
        return false;
    }
}
