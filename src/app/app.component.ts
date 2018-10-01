import {Component} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {UserService} from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Flipkart';

  constructor(private userService: UserService, private auth: AuthService, private router: Router) {
    auth.user$.subscribe((user) => {
      if (user) {
        userService.save(user);
        const redirectURL = localStorage.getItem('redirect');
        localStorage.removeItem('redirect');
        router.navigateByUrl(redirectURL);
      }
    });
  }
}
