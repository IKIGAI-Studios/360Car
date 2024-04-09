import { Component, OnInit } from '@angular/core';
import Transaccion from '../../models/transaccion';
import { TransaccionService } from '../../services/transaccion/transaccion.service';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrl: './transacciones.component.css'
})
export class TransaccionesComponent implements OnInit {

  isLoading = true;

  transacciones: Transaccion[] = [];
  currentTransaccion: Transaccion = new Transaccion({
    fecha: new Date().toLocaleString(),
    precio: 0,
    metodoPago: '',
    coche: '',
    cliente: '',
    tipo: ''
  });

  constructor(private transaccionService: TransaccionService) { }

  ngOnInit(): void {
    this.updateTransacciones();
  }

  async updateTransacciones(){
    this.isLoading = true;
    this.transacciones = await this.transaccionService.getTransacciones();
    this.isLoading = false;
  }

  async updateTransaccion(){
    await this.transaccionService.updateTransaccion(this.currentTransaccion);
    this.resetCurrentTransaccion();
    await this.updateTransacciones();
  }

  setCurrentTransaccion(transaccion: Transaccion){
    this.currentTransaccion = transaccion;
  }
  
  // * NO SE REQUIEREN ESTAS FUNCIONES
  // async createTransaccion(){
  //   await this.transaccionService.createTransaccion(this.currentTransaccion);
  //   this.resetCurrentTransaccion();
  //   await this.updateTransacciones();
  // }

  // async deleteTransaccion(transaccionId: string){
  //   await this.transaccionService
  //     .deleteTransaccion(transaccionId);
  //   await this.updateTransacciones();
  // }

  resetCurrentTransaccion(){
    this.currentTransaccion = new Transaccion({
      fecha: new Date().toLocaleString(),
      precio: 0,
      metodoPago: '',
      coche: '',
      cliente: '',
      tipo: ''
    });
  }
}
