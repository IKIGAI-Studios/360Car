import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import Cliente from '../../models/cliente';
import Coche from '../../models/coche';
import Transaccion from '../../models/transaccion';
import { CocheService } from '../coche/coche.service';
import { TransaccionService } from '../transaccion/transaccion.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private firestore:AngularFirestore) { }

  async getClientes(): Promise<Cliente[]>{
    return await this.parseData(this.firestore.collection('clientes').snapshotChanges());
  }

  async getClienteById(clienteId: string): Promise<Cliente>{
    return new Promise((resolve) => {
      this.firestore.doc('clientes/' + clienteId).valueChanges().subscribe(data => {
        resolve({
          ...data as Cliente,
          id: clienteId
        });
      });
    });
  }

  parseData(snapshot: Observable<DocumentChangeAction<unknown>[]>): Promise<Cliente[]> {
    let clientes: Cliente[] = [];

    return new Promise((resolve) => {
      snapshot.subscribe(data => {
        clientes = data.map(doc => {
          return {
            ...doc.payload.doc.data() as Cliente,
            id: doc.payload.doc.id
          }
        });
        resolve(clientes);
      });
    });
  }

  async createCliente(cliente: Cliente){
    return await this.firestore.collection('clientes').add(Object.assign({}, cliente));
  }

  async updateCliente(cliente: Cliente){
    await this.firestore.doc('clientes/' + cliente.id).update(cliente);
  }

  async deleteCliente(clienteId: string){
    await this.firestore.doc('clientes/' + clienteId).delete();
  }
  
  async addCoche(clienteId: string, cocheId: string){
    let cliente = await this.getClienteById(clienteId);
    cliente.coches.push(cocheId);
    await this.updateCliente(cliente);
  }

  async removeCoche(clienteId: string, cocheId: string){
    let cliente = await this.getClienteById(clienteId);
    cliente.coches = cliente.coches.filter(coche => coche !== cocheId);
    await this.updateCliente(cliente);
  }

  async addTransaccion(clienteId: string, transaccionId: string){
    let cliente = await this.getClienteById(clienteId);
    cliente.transacciones.push(transaccionId);
    await this.updateCliente(cliente);
  }
}
