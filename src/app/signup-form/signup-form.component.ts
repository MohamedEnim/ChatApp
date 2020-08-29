import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  email: string;
  password: string;
  displayName: string;
  errorMsg: string;

  constructor(private router: Router, private authSErv: AuthService, private afAuth: AngularFireAuth) {}

  ngOnInit(): void {}

  signUp(){
      const email = this.email;
      const password = this.password;
      const displayName = this.displayName;
      this.authSErv.signUp(email, password, displayName)
      .then(resolve => this.router.navigate(['/chat']))
      .catch( err => this.errorMsg = err.message);
  }

}
