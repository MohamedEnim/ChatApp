import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  user: Observable<firebase.User>;
  userEmail: string;
  subSubscription: Subscription;
  isAuthenticated: boolean = true;
  
  constructor(private authSErv: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.authSErv.authUser();
    this.subSubscription = this.user.subscribe(user =>{
      if(user){
        this.userEmail = user.email;
      }
    });
  }

  logout(){
    this.authSErv.logout();
  }

  ngOnDestroy(){
    this.subSubscription.unsubscribe();
  }

}
