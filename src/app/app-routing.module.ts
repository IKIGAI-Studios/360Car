import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CochesComponent } from './components/coches/coches.component';
import { TransaccionesComponent } from './components/transacciones/transacciones.component';
import { ClientesComponent } from './components/clientes/clientes.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'coches',
    component: CochesComponent,
  },
  {
    path: 'transacciones',
    component: TransaccionesComponent,
  },
  {
    path: 'clientes',
    component: ClientesComponent,
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
