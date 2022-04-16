import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CompanyRegisterComponent } from './components/company-register/company-register.component';
import { DashboardUserComponent } from './components/dashboard-user/dashboard-user.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { DesafiosComponent } from './components/desafios/desafios.component';
import { DashboardEmpresaComponent } from './components/dashboard-empresa/dashboard-empresa.component';
import { PerfilesComponent } from './components/perfiles/perfiles.component';
import { DpythonComponent } from './components/dpython/dpython.component';
import { CrearDesafioComponent } from './components/crear-desafio/crear-desafio.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registrarse', component: RegisterComponent},
  {path: 'registrarse-empresa', component: CompanyRegisterComponent},
  {path: 'inicio-usuario', component: DashboardUserComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'empresas', component: EmpresasComponent},
  {path: 'desafíos', component: DesafiosComponent},
  {path: 'inicio-empresa', component: DashboardEmpresaComponent},
  {path: 'perfiles', component: PerfilesComponent},
  {path: 'desafíos-python', component: DpythonComponent},
  {path: 'crear-desafío', component: CrearDesafioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
