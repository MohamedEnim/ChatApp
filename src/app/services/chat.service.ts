import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { AngularFireAuth } from 'angularfire2/auth'
import { map } from 'rxjs/operators';
import { ChatMessage } from '../models/chat-message.model'
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  user: firebase.User;
  dbMessages: AngularFireList<any>;
  userName: string;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { 
    this.dbMessages = this.db.list('/messages');
    this.afAuth.authState.subscribe(auth => {
      if(auth !== undefined && auth !== null){
          this.user = auth;
          this.getDisplayName().subscribe(user => {
              this.userName = user.displayName; 
          });
      }
    });
  }

  getDisplayName() {
    const path = `/users/${this.user.uid}`
    return this.db.object<{ email: string,
      displayName: string,
      status: string}>(path).valueChanges();
  }

  getDisplayNameUsers(): Observable<any[]> {
    const path = '/users';
    return this.db.list<AngularFireList<any>>(path).snapshotChanges().pipe( map(items => {
      return items.map(a => {
      const data = a.payload.val();
      const key = a.payload.key;
      return {key, ...data};
      });
   }));
  }
  
  sendMessage(msg: string){
     const timestamp = this.getTimeStamp();
     const email: string = this.user.email;
     let chatMsg: ChatMessage = {};
      chatMsg.email = email;
      chatMsg.userName = this.userName;
      chatMsg.message = msg;
      chatMsg.timeSent = timestamp;
      this.dbMessages.push(chatMsg);
   }
 
   getTimeStamp(){
     const now = new Date();
     const date = now.getUTCFullYear() + '/' + (now.getUTCMonth() + 1) + '/' + now.getUTCDate();
     const time = now.getUTCHours() + ':' + now.getUTCMinutes() + ':' + now.getUTCSeconds();
     return (date + ' ' + time);
   }
 
    getMessages():Observable<any[]>
    {
       return this.dbMessages.snapshotChanges().pipe( map(items => {
        return items.map(a => {
        const data = a.payload.val();
        const key = a.payload.key;
        return {key, ...data};
        });
     }));
  }


}
