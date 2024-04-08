export default class Coche {
    id: string = '';
    marca: string = '';
    modelo: string = '';
    precio: number = 0;
    kilometros: number = 0;
    vendido: boolean = false;
    transmision: string = '';
    transacciones: string[] = [];
    dueñoActual: string = '';

    constructor(coche: { marca: string, modelo: string, precio: number, kilometros: number, vendido: boolean, transmision: string, dueñoActual: string }){
        this.marca = coche.marca;
        this.modelo = coche.modelo;
        this.precio = coche.precio;
        this.kilometros = coche.kilometros;
        this.vendido = coche.vendido;
        this.transmision = coche.transmision;
        this.dueñoActual = coche.dueñoActual;
    }
}