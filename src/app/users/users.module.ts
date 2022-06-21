import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserTileComponent } from './user-tile/user-tile.component';
import { UsersComponent } from './user-list/users.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ScrollingModule } from '@angular/cdk/scrolling';


const MATERIAL_MODULES = [
  MatButtonModule,
  MatIconModule,
  // MatCardModule,
  MatListModule,
  ScrollingModule
]
@NgModule({
  declarations: [
    UsersComponent,
    UserDetailComponent,
    UserTileComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ...MATERIAL_MODULES

  ]
})
export class UsersModule { }
