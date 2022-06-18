import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'krm-user-tile',
  templateUrl: './user-tile.component.html',
  styleUrls: ['./user-tile.component.scss']
})
export class UserTileComponent implements OnInit {
  @Input() user!: User;

  constructor() { }

  ngOnInit(): void {
  }

}
