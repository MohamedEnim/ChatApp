import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  @Input() user: {
    email: string,
    displayName: string,
    status: string
  };

  constructor() { }

  ngOnInit(): void {
  }

}
