import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserTileComponent } from './user-tile/user-tile.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    UsersComponent,
    UserDetailComponent,
    UserTileComponent,
  ],
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
