import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    // Holds the current user
    private userSource = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('auth_user') || 'null'));
    user$ = this.userSource.asObservable();

    // Set user after login
    setUser(user: any) {
        localStorage.setItem('auth_user', JSON.stringify(user));
        this.userSource.next(user);
    }

    // Logout user
    logout() {
        localStorage.removeItem('auth_user');
        localStorage.removeItem('token'); // optional
        this.userSource.next(null);
    }
}
