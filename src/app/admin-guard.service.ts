import {AngularFireAuth} from 'angularfire2/auth';
import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from './auth.service';
import {UserService} from './user.service';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import {AppUser} from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService) {
  }

  canActivate(): Observable<boolean> {
    return this.auth
      .appUser$
      .map((appUser: AppUser) => {
        return appUser.isAdmin;
      });
  }
}
