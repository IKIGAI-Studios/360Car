import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Transaccion from '../../models/transaccion';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  constructor(private firestore: AngularFirestore) { }

  getTransacciones(){
    let transacciones: Transaccion[] = [];

    this.firestore.collection('transacciones').snapshotChanges().subscribe(data => {
      transacciones = data.map(doc => {
        return {
          ...doc.payload.doc.data() as Transaccion,
          id: doc.payload.doc.id
        }
      })
    });

    return transacciones;
  }

  createTransaccion(transaccion: Transaccion){
    return this.firestore.collection('transacciones').add(transaccion);
  }

  updateTransaccion(transaccion: Transaccion){
    this.firestore.doc('transacciones/' + transaccion.id).update(transaccion);
  }

  deleteTransaccion(transaccionId: string){
    this.firestore.doc('transacciones/' + transaccionId).delete();
  }
}
