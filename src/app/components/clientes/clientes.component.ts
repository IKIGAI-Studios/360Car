import { Component, OnInit } from '@angular/core';
import Cliente from '../../models/cliente';
import { ClienteService } from '../../services/cliente/cliente.service';
import { MODES } from '../../constants/modes';
import { validateString, validateEmail, validatePhone } from '../../utils/validations';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {
  isLoading = true;
  isNombreValid = false;
  isApellidosValid = false;
  isEmailValid = false;
  isTelefonoValid = false;
  isCurrentClienteValid = false;

  state = MODES.create;
  MODES = MODES;
  clientes: Cliente[] = [];
  currentCliente: Cliente = new Cliente({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: ''
  });

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.updateClientes();
  }

  async updateClientes(){
    this.isLoading = true;
    this.clientes = await this.clienteService.getClientes();
    this.isLoading = false;
  }

  async createCliente(){
    if (!this.validateCurrentCliente()) {
      return;
    }

    await this.clienteService.createCliente(this.currentCliente);
    this.resetCurrentCliente();
    await this.updateClientes();
  }

  async updateCliente(){
    if (!this.validateCurrentCliente()) {
      return;
    }

    await this.clienteService.updateCliente(this.currentCliente);
    this.resetCurrentCliente();
    await this.updateClientes();
  }

  async deleteCliente(){
    await this.clienteService.deleteCliente(this.currentCliente.id);
    await this.updateClientes();
    this.resetCurrentCliente();
  }

  setCurrentCliente(cliente: Cliente){
    this.currentCliente = cliente;
    this.state = MODES.select;
    this.setValidation(true);
    this.validateCurrentCliente();
  }

  async resetCurrentCliente(){
    this.currentCliente = new Cliente({
      nombre: '',
      apellidos: '',
      email: '',
      telefono: ''
    });
    this.state = MODES.create;
    this.setValidation(false);
    this.validateCurrentCliente();
    await this.updateClientes();
  }

  // Validaciones
  setValidation(isValid: boolean) {
    this.isNombreValid = isValid;
    this.isApellidosValid = isValid;
    this.isEmailValid = isValid;
    this.isTelefonoValid = isValid;
  }

  validateNombre() {
    this.isNombreValid = validateString(this.currentCliente.nombre);
    this.validateCurrentCliente();
  }

  validateApellidos() {
    this.isApellidosValid = validateString(this.currentCliente.apellidos);
    this.validateCurrentCliente();
  }

  validateEmail() {
    this.isEmailValid = validateEmail(this.currentCliente.email);
    this.validateCurrentCliente();
  }

  validateTelefono() {
    this.isTelefonoValid = validatePhone(this.currentCliente.telefono);
    this.validateCurrentCliente();
  }

  validateCurrentCliente(): boolean {
    this.isCurrentClienteValid = this.isNombreValid &&
      this.isApellidosValid &&
      this.isEmailValid &&
      this.isTelefonoValid;
    return this.isCurrentClienteValid;
  }
}
