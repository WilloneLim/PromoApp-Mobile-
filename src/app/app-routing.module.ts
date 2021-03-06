import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  //NOT NEEDED { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },

  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthService] },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'edit-profile', loadChildren: './edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'transactions', loadChildren: './transactions/transactions.module#TransactionsPageModule' },
  { path: 'details/:id', loadChildren: './details/details.module#DetailsPageModule' },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
