import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment.development';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { CochesComponent } from './components/coches/coches.component';
import { TransaccionesComponent } from './components/transacciones/transacciones.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { LoaderComponent } from './components/utils/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CochesComponent,
    TransaccionesComponent,
    ClientesComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
