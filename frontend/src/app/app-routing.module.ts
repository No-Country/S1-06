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
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { InicioDesafioComponent } from './components/inicio-desafio/inicio-desafio.component';
import { JugarDesafioComponent } from './components/jugar-desafio/jugar-desafio.component';
import { SolicitudEmpresaComponent } from './components/solicitud-empresa/solicitud-empresa.component';
import { PublicProfileUserComponent } from './components/public-profile-user/public-profile-user.component';
import { PublicProfileCompanyComponent } from './components/public-profile-company/public-profile-company.component';
import { VerDesafioUserComponent } from './components/ver-desafio-user/ver-desafio-user.component'
import { EditarDesafioComponent } from './components/editar-desafio/editar-desafio.component'
import { ResultadoDesafioComponent } from './components/resultado-desafio/resultado-desafio.component';

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
  {path: 'crear-desafio', component: CrearDesafioComponent},
  {path: 'mi-perfil', component: MiPerfilComponent},
  {path: 'inicio-desafio/:challenge_id', component: InicioDesafioComponent},
  {path: 'jugar-desafio/:challenge_id', component: JugarDesafioComponent},
  {path: 'solicitudes-de-empresas', component: SolicitudEmpresaComponent },
  { path: 'perfil/user/:user_id', component: PublicProfileUserComponent },
  { path: 'perfil/company/:company_id', component: PublicProfileCompanyComponent },
  { path: 'desafio/:challenge_id/user/:user_id', component: VerDesafioUserComponent },
  { path: 'desafio/:challenge_id/editar', component: EditarDesafioComponent },

  {path: 'solicitudes-de-empresas', component: SolicitudEmpresaComponent},
  {path: 'resultado-desafío', component: ResultadoDesafioComponent},
  {path: 'perfiles', component: PerfilesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
