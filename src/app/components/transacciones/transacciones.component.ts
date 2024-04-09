import { Component, OnInit } from '@angular/core';
import Transaccion from '../../models/transaccion';
import { TransaccionService } from '../../services/transaccion/transaccion.service';
import { MODES } from '../../constants/modes';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrl: './transacciones.component.css'
})
export class TransaccionesComponent implements OnInit {

  state = MODES.create;
  MODES = MODES;
  
  isLoading = true;
  isMetodoPagoValid = false;
  isCurrentTransaccionValid = false;

  metodosPago = ['efectivo', 'credito', 'debito'];

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
    if (!this.validateCurrentTransaccion()) {
      return;
    }

    await this.transaccionService.updateTransaccion(this.currentTransaccion);
    this.resetCurrentTransaccion();
    await this.updateTransacciones();
  }

  setCurrentTransaccion(transaccion: Transaccion){
    this.currentTransaccion = transaccion;
    this.state = MODES.select;
    this.setValidation(true);
    this.validateCurrentTransaccion();
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

  async resetCurrentTransaccion(){
    this.currentTransaccion = new Transaccion({
      fecha: new Date().toLocaleString(),
      precio: 0,
      metodoPago: '',
      coche: '',
      cliente: '',
      tipo: ''
    });

    this.state = MODES.create;
    this.setValidation(false);
    this.validateCurrentTransaccion();
    await this.updateTransacciones();
  }

  // Validaciones
  validateMetodoPago(){
    this.isMetodoPagoValid = this.currentTransaccion.metodoPago !== '' || this.currentTransaccion.metodoPago === null;
    this.validateCurrentTransaccion();
  }

  validateCurrentTransaccion(){
    this.isCurrentTransaccionValid = this.isMetodoPagoValid;
    return this.isCurrentTransaccionValid;
  }

  setValidation(value: boolean){
    this.isMetodoPagoValid = value;
  }
}
