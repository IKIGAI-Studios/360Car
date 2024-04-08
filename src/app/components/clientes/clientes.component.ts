import { Component, OnInit } from '@angular/core';
import Cliente from '../../models/cliente';
import { ClienteService } from '../../services/cliente/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {
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
    this.clientes = await this.clienteService.getClientes();
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

  async deleteCliente(clienteId: string){
    await this.clienteService.deleteCliente(clienteId);
    await this.updateClientes();
  }

  setCurrentCliente(cliente: Cliente){
    this.currentCliente = cliente;
  }

  resetCurrentCliente(){
    this.currentCliente = new Cliente({
      nombre: '',
      apellidos: '',
      email: '',
      telefono: ''
    });
  }
}
