import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UsersComponent } from './user-list/users.component';

const routes: Routes = [
  { path: '', component: UsersComponent, title: 'KRM22 Users', canActivate: [AuthGuard] },
  { path: ':id', component: UserDetailComponent, title: 'KRM22 User', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
