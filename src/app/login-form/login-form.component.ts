import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  email: string;
  password:string;

  constructor(private authSErv: AuthService, private router: Router, private afAuth: AngularFireAuth) {}

   ngOnInit() {}

  login(){
    this.authSErv.login(this.email, this.password).then(resolve =>{
        this.router.navigate(['/chat']);
    });

  }

}
