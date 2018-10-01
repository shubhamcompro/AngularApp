import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {ActivatedRoute} from '@angular/router';
import {UserService} from './user.service';
import {AppUser} from './models/app-user';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute) {
    this.user$ = this.afAuth.authState;
  }

  login() {
    const returnUrl: string = this.route.snapshot.queryParamMap.get('redirect') || '/';
    localStorage.setItem('redirect', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .switchMap((user) => {
        if (!user) {
          return Observable.of(null);
        }
        return this.userService.get(user.uid);
      });
  }
}
