import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import Transaccion from '../../models/transaccion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  constructor(private firestore: AngularFirestore) { }

  async getTransacciones(){
    return await this.parseData(this.firestore.collection('transacciones').snapshotChanges());
  }

  async getTransaccionById(transaccionId: string){
    const transacciones = await this.parseData(
      this.firestore.collection('transacciones', ref => ref.where('id', '==', transaccionId)).snapshotChanges()
    );
    return transacciones[0];
  }

  parseData(snapshot: Observable<DocumentChangeAction<unknown>[]>): Promise<Transaccion[]> {
    let transacciones: Transaccion[] = [];

    return new Promise((resolve) => {
      snapshot.subscribe(data => {
        transacciones = data.map(doc => {
          return {
            ...doc.payload.doc.data() as Transaccion,
            id: doc.payload.doc.id
          }
        });
        resolve(transacciones);
      });
    });
  }

 async createTransaccion(transaccion: Transaccion){
    return await this.firestore.collection('transacciones').add(Object.assign({}, transaccion));
  }

  async updateTransaccion(transaccion: Transaccion){
    await this.firestore.doc('transacciones/' + transaccion.id).update(transaccion);
  }

  async deleteTransaccion(transaccionId: string){
    await this.firestore.doc('transacciones/' + transaccionId).delete();
  }
}