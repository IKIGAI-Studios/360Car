import { Component, OnInit } from '@angular/core';
import Cliente from '../../models/cliente';
import { ClienteService } from '../../services/cliente/cliente.service';
import { MODES } from '../../constants/modes';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {
  isLoading = true;
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
    await this.clienteService.createCliente(this.currentCliente);
    this.resetCurrentCliente();
    await this.updateClientes();
  }

  async updateCliente(){
    await this.clienteService.updateCliente(this.currentCliente);
    this.resetCurrentCliente();
    await this.updateClientes();
  }

  async deleteCliente(){
    await this.clienteService.deleteCliente(this.currentCliente.id);
    await this.updateClientes();
  }

  setCurrentCliente(cliente: Cliente){
    this.currentCliente = cliente;
    this.state = MODES.select;
  }

  resetCurrentCliente(){
    this.currentCliente = new Cliente({
      nombre: '',
      apellidos: '',
      email: '',
      telefono: ''
    });
    this.state = MODES.create;
  }
}
