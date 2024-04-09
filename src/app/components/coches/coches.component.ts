import { Component, OnInit } from '@angular/core';
import Coche from '../../models/coche';
import { CocheService } from '../../services/coche/coche.service';
import { MODES } from '../../constants/modes';
import { validateString, validateAlphanumeric, validateNumber } from '../../utils/validations';
import { metodoPago } from '../../models/transaccion';
import Cliente from '../../models/cliente';
import { ClienteService } from '../../services/cliente/cliente.service';

@Component({
  selector: 'app-coches',
  templateUrl: './coches.component.html',
  styleUrl: './coches.component.css'
})
export class CochesComponent implements OnInit {

  state = MODES.create;
  MODES = MODES;

  isLoading = true;
  isMarcaValid = false;
  isModeloValid = false;
  isPrecioValid = false;
  isKilometrosValid = false;
  isTransmisionValid = false;
  isCurrentCocheValid = false;
  isClienteValid = false;
  isMetodoPagoValid = false;

  transmisiones = ['manual', 'automatica'];

  coches: Coche[] = [];
  currentCoche: Coche = new Coche({
    marca: '',
    modelo: '',
    precio: 0,
    kilometros: 0,
    vendido: false,
    transmision: '',
    dueñoActual: ''
  });

  clientes: Cliente[] = [];

  venta = {
    clienteId: '',
    metodoPago: ''
  }

  constructor(private cocheService: CocheService, private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.updateCoches();
    this.updateClientes();
  }

  async updateCoches(){
    this.isLoading = true;
    this.coches = await this.cocheService.getCoches();
    this.isLoading = false;
  }

  async updateClientes(){
    this.clientes = await this.clienteService.getClientes();
  }

  async createCoche(){
    if (!this.validateCurrentCoche()) {
      return;
    }

    const newCoche = new Coche({
      ...this.currentCoche,
      vendido: false,
      dueñoActual: ''
    });

    await this.cocheService.createCoche(newCoche);
    await this.updateCoches();
    this.resetCurrentCoche();
  }

  async updateCoche(){
    if (!this.validateCurrentCoche()) {
      return;
    }

    await this.cocheService.updateCoche(this.currentCoche);
    await this.updateCoches();
    this.resetCurrentCoche();
  }

  async deleteCoche(){
    await this.cocheService.deleteCoche(this.currentCoche.id);
    await this.updateCoches();
    this.resetCurrentCoche();
  }

  async setCurrentCoche(coche: Coche){
    this.currentCoche = coche;
    this.state = MODES.select;
    this.setValidation(true);
    this.validateCurrentCoche();
  }

  async resetCurrentCoche(){
    this.currentCoche = new Coche({
      marca: '',
      modelo: '',
      precio: 0,
      kilometros: 0,
      vendido: false,
      transmision: '',
      dueñoActual: ''
    });

    this.state = MODES.create;
    this.setValidation(false);
    this.validateCurrentCoche();
    await this.updateCoches();
  }

  setSellMode(){
    this.state = MODES.sell;
    this.validateVenta();
  }

  // async sellCoche(coche: Coche, clienteId: string, precio: number, metodoPago: string)
  async sellCoche(){
    const coche = this.currentCoche;
    const clienteId = this.venta.clienteId;
    const metodoPago: metodoPago = this.venta.metodoPago as metodoPago;

    await this.cocheService.sellCoche(coche.id, clienteId, coche.precio, metodoPago);
    this.resetCurrentCoche();
    await this.updateCoches();
  }

  // Validaciones
  validateTransmision() {
    this.isTransmisionValid = this.currentCoche.transmision !== null || this.currentCoche.transmision !== '';
    this.validateCurrentCoche();
  }

  validateMarca() {
    this.isMarcaValid = validateString(this.currentCoche.marca);
    this.validateCurrentCoche();
  }

  validateModelo() {
    this.isModeloValid = validateAlphanumeric(this.currentCoche.modelo);
    this.validateCurrentCoche();
  }

  validatePrecio() {
    if (this.currentCoche.precio === null) {
      this.isPrecioValid = false;
      return;
    }
    this.isPrecioValid = validateNumber(this.currentCoche.precio.toString());
    this.validateCurrentCoche();
  }

  validateKilometros() {
    if (this.currentCoche.kilometros === null) {
      this.isKilometrosValid = false;
      return;
    }

    this.isKilometrosValid = validateNumber(this.currentCoche.kilometros.toString());
    this.validateCurrentCoche();
  }


  validateCurrentCoche(): boolean {
    this.isCurrentCocheValid = this.isKilometrosValid &&
      this.isMarcaValid &&
      this.isModeloValid &&
      this.isPrecioValid &&
      this.isTransmisionValid;

    return this.isCurrentCocheValid;
  }

  validateCliente() {
    this.isClienteValid = this.venta.clienteId !== null || this.venta.clienteId !== '';
    this.validateVenta();
  }

  validateMetodoPago() {
    this.isMetodoPagoValid = this.venta.metodoPago !== null || this.venta.metodoPago !== '';
    this.validateVenta();
  }

  validateVenta() {
    return this.isClienteValid && this.isMetodoPagoValid;
  }

  setValidation(val: boolean) {
    this.isMarcaValid = val;
    this.isModeloValid = val;
    this.isPrecioValid = val;
    this.isKilometrosValid = val;
    this.isTransmisionValid = val;
  }
}
