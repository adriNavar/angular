import { LoginGuardian } from './login/login-guardian.service';
import { LoginComponent } from './login/login.component';
import { PersonasComponent } from './personas/personas.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { FormularioComponent } from './personas/formulario/formulario.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {path:'', component:PersonasComponent,canActivate:[LoginGuardian]},
  {path:'personas',component:PersonasComponent,canActivate:[LoginGuardian],children:[
    {path:'agregar',component:FormularioComponent},
    {path:':id',component:FormularioComponent},
    ]},//Children idenfica que agregar y :id son hijas de personas, simplifica el poner personas/agregar
  {path:'login',component:LoginComponent} ,
  {path:'**',component:ErrorComponent} ,
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
    )
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
