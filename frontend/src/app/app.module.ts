import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CompanyRegisterComponent } from './components/company-register/company-register.component';
import { FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { DashboardUserComponent } from './components/dashboard-user/dashboard-user.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { DesafiosComponent } from './components/desafios/desafios.component';
import { DashboardEmpresaComponent } from './components/dashboard-empresa/dashboard-empresa.component';
import { PerfilesComponent } from './components/perfiles/perfiles.component';
import { DpythonComponent } from './components/dpython/dpython.component';
import { CrearDesafioComponent } from './components/crear-desafio/crear-desafio.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { InicioDesafioComponent } from './components/inicio-desafio/inicio-desafio.component';
import { JugarDesafioComponent } from './components/jugar-desafio/jugar-desafio.component';
import { DesafioCardComponent } from './components/desafio-card/desafio-card.component';
import { QuestionComponent } from './components/question/question.component';
import { SolicitudEmpresaComponent } from './components/solicitud-empresa/solicitud-empresa.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PublicProfileUserComponent } from './components/public-profile-user/public-profile-user.component';
import { PublicProfileCompanyComponent } from './components/public-profile-company/public-profile-company.component';
import { VerDesafioUserComponent } from './components/ver-desafio-user/ver-desafio-user.component';
import { EditarDesafioComponent } from './components/editar-desafio/editar-desafio.component';
import { ResultadoDesafioComponent } from './components/resultado-desafio/resultado-desafio.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    RegisterComponent,
    HeaderComponent,
    HomeComponent,
    NavbarComponent,
    CompanyRegisterComponent,
    DashboardUserComponent,
    ContactoComponent,
    EmpresasComponent,
    DesafiosComponent,
    DashboardEmpresaComponent,
    PerfilesComponent,
    DpythonComponent,
    CrearDesafioComponent,
    MiPerfilComponent,
    InicioDesafioComponent,
    JugarDesafioComponent,
    DesafioCardComponent,
    QuestionComponent,
    SolicitudEmpresaComponent,
    LoaderComponent,
    PublicProfileUserComponent,
    PublicProfileCompanyComponent,
    VerDesafioUserComponent,
    EditarDesafioComponent,
    ResultadoDesafioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
	  provide: HTTP_INTERCEPTORS,
	  useClass: TokenInterceptorService,
	  multi: true,
	},],
  bootstrap: [AppComponent]
})
export class AppModule { }
