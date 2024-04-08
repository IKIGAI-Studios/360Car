import { Component, OnInit } from '@angular/core';
import Coche from '../../models/coche';
import { CocheService } from '../../services/coche/coche.service';
import { MODES } from '../../constants/modes';

@Component({
  selector: 'app-coches',
  templateUrl: './coches.component.html',
  styleUrl: './coches.component.css'
})
export class CochesComponent implements OnInit {

  state = MODES.create;
  MODES = MODES;

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
    await this.updateCoches();
    this.resetCurrentCoche();
  }

  async updateCoche(){
    await this.cocheService.updateCoche(this.currentCoche);
    await this.updateCoches();
    this.resetCurrentCoche();
  }

  async deleteCoche(){
    await this.cocheService.deleteCoche(this.currentCoche.id);
    await this.updateCoches();
    this.resetCurrentCoche();
  }

  setCurrentCoche(coche: Coche){
    this.currentCoche = coche;
    this.state = MODES.select;
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

    this.state = MODES.create;
  }

  // async sellCoche(coche: Coche, clienteId: string, precio: number, metodoPago: string)
  async sellCoche(){
    const coche = this.currentCoche;
    const clienteId = '123123'
    const metodoPago = 'efectivo'

    await this.cocheService.sellCoche(coche.id, clienteId, coche.precio, metodoPago);
    this.resetCurrentCoche();
    await this.updateCoches();
  }
}
