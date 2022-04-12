import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CompanyRegisterComponent } from './components/company-register/company-register.component';
import { DashboardUserComponent } from './components/dashboard-user/dashboard-user.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'iniciar-sesión', component: LoginComponent},
  {path: 'registrarse', component: RegisterComponent},
  {path: 'registrarse-empresa', component: CompanyRegisterComponent},
  {path: 'inicio-usuario', component: DashboardUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
