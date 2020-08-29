import { Component, OnInit, OnChanges } from '@angular/core';

import { ChatService } from '../services/chat.service';
import { Observable} from 'rxjs';
import { ChatMessage } from '../models/chat-message.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})


export class FeedComponent implements OnInit, OnChanges{

  feed: Observable<ChatMessage[]>; 
 
  constructor( private chatSErv: ChatService) { }

  ngOnInit(): void {
     this.feed = this.chatSErv.getMessages();
  }

  ngOnChanges(){
    this.feed = this.chatSErv.getMessages();
  }

}
