import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Cliente from '../../models/cliente';
import Coche from '../../models/coche';
import Transaccion from '../../models/transaccion';
import { CocheService } from '../coche/coche.service';
import { TransaccionService } from '../transaccion/transaccion.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private firestore:AngularFirestore) { }

  getClientes(){
    let clientes: Cliente[] = [];

    this.firestore.collection('clientes').snapshotChanges().subscribe(data => {
      clientes = data.map(doc => {
        return {
          ...doc.payload.doc.data() as Cliente,
          id: doc.payload.doc.id
        }
      })
    });

    return clientes;
  }

  createCliente(cliente: Cliente){
    return this.firestore.collection('clientes').add(cliente);
  }

  updateCliente(cliente: Cliente){
    this.firestore.doc('clientes/' + cliente.id).update(cliente);
  }

  deleteCliente(clienteId: string){
    this.firestore.doc('clientes/' + clienteId).delete();
  }
  
  addCoche(clienteId: string, cocheId: string){
    CocheService

    
  }
}
