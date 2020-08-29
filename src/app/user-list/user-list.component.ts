import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app'
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any[];

  constructor(private chatSErv: ChatService) { }

  ngOnInit(): void {
    this.chatSErv.getDisplayNameUsers().subscribe(users =>{
      this.users = users; 
    });
  }

}
