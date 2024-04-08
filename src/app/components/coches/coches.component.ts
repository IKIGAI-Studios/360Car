import { Component, OnInit } from '@angular/core';
import Coche from '../../models/coche';
import { CocheService } from '../../services/coche/coche.service';

@Component({
  selector: 'app-coches',
  templateUrl: './coches.component.html',
  styleUrl: './coches.component.css'
})
export class CochesComponent implements OnInit {

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

  constructor(private cocheService: CocheService) { }

  ngOnInit(): void {
    this.updateCoches();
  }

  async updateCoches(){
    this.coches = await this.cocheService.getCoches();
    console.log(this.coches);
  }

  async createCoche(){
    const newCoche = new Coche({
      marca: this.currentCoche.marca,
      modelo: this.currentCoche.modelo,
      precio: this.currentCoche.precio,
      kilometros: this.currentCoche.kilometros,
      vendido: false,
      transmision: this.currentCoche.transmision,
      dueñoActual: ''
    });

    await this.cocheService.createCoche(newCoche);
    this.resetCurrentCoche();
    await this.updateCoches();
  }

  async updateCoche(){
    await this.cocheService.updateCoche(this.currentCoche);
    this.resetCurrentCoche();
    await this.updateCoches();
  }

  async deleteCoche(cocheId: string){
    await this.cocheService.deleteCoche(cocheId);
    await this.updateCoches();
  }

  setCurrentCoche(coche: Coche){
    this.currentCoche = coche;
  }

  resetCurrentCoche(){
    this.currentCoche = new Coche({
      marca: '',
      modelo: '',
      precio: 0,
      kilometros: 0,
      vendido: false,
      transmision: '',
      dueñoActual: ''
    });
  }

  // async sellCoche(coche: Coche, clienteId: string, precio: number, metodoPago: string)
  async sellCoche(coche: Coche){
    const clienteId = '123123'
    const metodoPago = 'efectivo'

    await this.cocheService.sellCoche(coche.id, clienteId, coche.precio, metodoPago);
    this.resetCurrentCoche();
    await this.updateCoches();
  }
}
