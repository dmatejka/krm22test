import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserTileComponent } from './user-tile/user-tile.component';
import { UserListComponent } from './user-list/user-list.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ImagePreloadDirective } from '../core/directives/img-default.directive';
import { MatProgressBarModule } from '@angular/material/progress-bar';


const MATERIAL_MODULES = [
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatListModule,
  MatProgressBarModule,
  ScrollingModule
]
@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent,
    UserTileComponent,
    ImagePreloadDirective
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ...MATERIAL_MODULES

  ]
})
export class UsersModule { }
