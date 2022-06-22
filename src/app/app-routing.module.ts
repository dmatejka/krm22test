import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { LoginComponent } from './core/components/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent, title: 'KRM22 Login' },
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: '404', component: PageNotFoundComponent },
  { path: 'resendpassword', redirectTo: '404' },
  { path: 'register',  redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
