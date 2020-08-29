

import { Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ChatroomComponent } from './chatroom/chatroom.component';

export const appRoutes: Routes = [
    {path: 'signup',  component: SignupFormComponent },
    {path: 'login',   component: LoginFormComponent },
    {path: 'chat', canActivate: [AuthGuardService], component: ChatroomComponent },
    {path: '', redirectTo: '/login', pathMatch:'full' },
];