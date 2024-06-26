import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import Coche from '../../models/coche';
import { Observable } from 'rxjs';
import Transaccion from '../../models/transaccion';
import { TransaccionService } from '../transaccion/transaccion.service';
import Cliente from '../../models/cliente';
import { ClienteService } from '../cliente/cliente.service';
import { metodoPago } from '../../models/transaccion';
import { transaccionTipo } from '../../models/transaccion';

@Injectable({
  providedIn: 'root'
})
export class CocheService {

  constructor(private firestore: AngularFirestore, private transaccionService: TransaccionService, private clienteService: ClienteService) { }

  async getCoches(): Promise<Coche[]> {
    return await this.parseData(this.firestore.collection('coches').snapshotChanges());
  }

  async getCocheById(cocheId: string): Promise<Coche>{
    return new Promise((resolve) => {
      this.firestore.doc('coches/' + cocheId).valueChanges().subscribe(data => {
        resolve({
          ...data as Coche,
          id: cocheId
        });
      });
    })
  }

  // getCochesByMarca(marca: string): Coche[]{
  //   return this.parseData(
  //     this.firestore.collection('coches', ref => ref.where('marca', '==', marca)).snapshotChanges()
  //   );
  // }

  // getCochesByModelo(modelo: string): Coche[]{
  //   return this.parseData(
  //     this.firestore.collection('coches', ref => ref.where('modelo', '==', modelo)).snapshotChanges()
  //   );
  // }

  // getCochesByPrecio(precioFrom: number, precioTo: number): Coche[]{
  //   return this.parseData(
  //     this.firestore.collection('coches', ref => ref.where('precio', '>=', precioFrom).where('precio', '<=', precioTo)).snapshotChanges()
  //   );
  // }

  // getCochesByKilometros(kilometrosFrom: number, kilometrosTo: number): Coche[]{
  //   return this.parseData(
  //     this.firestore.collection('coches', ref => ref.where('kilometros', '>=', kilometrosFrom).where('kilometros', '<=', kilometrosTo)).snapshotChanges()
  //   );
  // }

  // getCochesByTransmision(transmision: string): Coche[]{
  //   return this.parseData(
  //     this.firestore.collection('coches', ref => ref.where('transmision', '==', transmision)).snapshotChanges()
  //   );
  // }

  // getCochesByVendido(vendido: boolean): Coche[]{
  //   return this.parseData(
  //     this.firestore.collection('coches', ref => ref.where('vendido', '==', vendido)).snapshotChanges()
  //   );
  // }

  // getCochesByFilter(filter: Filter): Coche[] {
  //   let coches: Coche[] = [];
    
  //   coches.concat(
  //     this.getCochesByMarca(filter.marca), 
  //     this.getCochesByModelo(filter.modelo),
  //     this.getCochesByPrecio(filter.precioFrom, filter.precioTo),
  //     this.getCochesByKilometros(filter.kilometrosFrom, filter.kilometrosTo),
  //     this.getCochesByTransmision(filter.transmision),
  //     this.getCochesByVendido(filter.vendido)
  //   );

  //   return coches;
  // } 

  parseData(snapshot: Observable<DocumentChangeAction<unknown>[]>): Promise<Coche[]> {
    let coches: Coche[] = [];

    return new Promise((resolve) => {
      snapshot.subscribe(data => {
        coches = data.map(doc => {
          return {
            ...doc.payload.doc.data() as Coche,
            id: doc.payload.doc.id
          }
        });
        resolve(coches);
      });
    });
  }

  async addTransaccion(cocheId: string, transaccionId: string){
    const coche = await this.getCocheById(cocheId);
    coche.transacciones.push(transaccionId);
    await this.updateCoche(coche);
  }

  async sellCoche(cocheId: string, clienteId: string, precio: number, metodoPago: metodoPago){
    const coche = await this.getCocheById(cocheId);
    const cliente = await this.clienteService.getClienteById(clienteId);

    const transaccionRef = await this.transaccionService.createTransaccion(new Transaccion({
      fecha: new Date().toLocaleString(),
      precio: coche.precio,
      metodoPago,
      coche: cocheId,
      cliente: clienteId,
      tipo: 'venta' as transaccionTipo,
      cocheMarca: coche.marca,
      cocheModelo: coche.modelo,
      clienteNombre: cliente.nombre,
      clienteApellidos: cliente.apellidos
    }));
    
    coche.vendido = true;
    const { id: transaccionId } =  await transaccionRef.get();
    await this.addTransaccion(cocheId, transaccionId);
    await this.updateCoche(coche);
  }

  async createCoche(coche: Coche){
    return await this.firestore.collection('coches').add(Object.assign({}, coche));
  }

  async updateCoche(coche: Coche){
    await this.firestore.doc('coches/' + coche.id).update(coche);
  }

  async deleteCoche(cocheId: string){
    console.log(cocheId);
    await this.firestore.doc('coches/' + cocheId).delete();
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