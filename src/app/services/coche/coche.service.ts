import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import Coche from '../../models/coche';
import { Observable } from 'rxjs';
import Transaccion from '../../models/transaccion';

@Injectable({
  providedIn: 'root'
})
export class CocheService {

  constructor(private firestore: AngularFirestore) { }

  getCoches(): Coche[]{
    return this.parseData(this.firestore.collection('coches').snapshotChanges());
  }

  getCocheById(cocheId: string): Coche{
    return this.parseData(
      this.firestore.collection('coches', ref => ref.where('id', '==', cocheId)).snapshotChanges()
    )[0];
  }

  getCochesByMarca(marca: string): Coche[]{
    return this.parseData(
      this.firestore.collection('coches', ref => ref.where('marca', '==', marca)).snapshotChanges()
    );
  }

  getCochesByModelo(modelo: string): Coche[]{
    return this.parseData(
      this.firestore.collection('coches', ref => ref.where('modelo', '==', modelo)).snapshotChanges()
    );
  }

  getCochesByPrecio(precioFrom: number, precioTo: number): Coche[]{
    return this.parseData(
      this.firestore.collection('coches', ref => ref.where('precio', '>=', precioFrom).where('precio', '<=', precioTo)).snapshotChanges()
    );
  }

  getCochesByKilometros(kilometrosFrom: number, kilometrosTo: number): Coche[]{
    return this.parseData(
      this.firestore.collection('coches', ref => ref.where('kilometros', '>=', kilometrosFrom).where('kilometros', '<=', kilometrosTo)).snapshotChanges()
    );
  }

  getCochesByTransmision(transmision: string): Coche[]{
    return this.parseData(
      this.firestore.collection('coches', ref => ref.where('transmision', '==', transmision)).snapshotChanges()
    );
  }

  getCochesByVendido(vendido: boolean): Coche[]{
    return this.parseData(
      this.firestore.collection('coches', ref => ref.where('vendido', '==', vendido)).snapshotChanges()
    );
  }

  getCochesByFilter(filter: Filter): Coche[] {
    let coches: Coche[] = [];
    
    coches.concat(
      this.getCochesByMarca(filter.marca), 
      this.getCochesByModelo(filter.modelo),
      this.getCochesByPrecio(filter.precioFrom, filter.precioTo),
      this.getCochesByKilometros(filter.kilometrosFrom, filter.kilometrosTo),
      this.getCochesByTransmision(filter.transmision),
      this.getCochesByVendido(filter.vendido)
    );

    return coches;
  } 

  parseData(snapshot: Observable<DocumentChangeAction<unknown>[]>): Coche[] {
    let coches: Coche[] = [];

    snapshot.subscribe(data => {
      coches = data.map(doc => {
        return {
          ...doc.payload.doc.data() as Coche,
          id: doc.payload.doc.id
        }
      })
    });

    return coches;
  }

  addTransaccion(cocheId: string, transaccion: Transaccion){
    const coche = this.getCocheById(cocheId);
    coche.transacciones.push(transaccion.id)
    this.updateCoche(coche);
  }

  createCoche(coche: Coche){
    return this.firestore.collection('coches').add(coche);
  }

  updateCoche(coche: Coche){
    this.firestore.doc('coches/' + coche.id).update(coche);
  }

  deleteCoche(cocheId: string){
    this.firestore.doc('coches/' + cocheId).delete();
  }
}

interface Filter {
  marca: string,
  modelo: string,
  precioFrom: number,
  precioTo: number,
  kilometrosFrom: number,
  kilometrosTo: number,
  transmision: string,
  vendido: boolean
}