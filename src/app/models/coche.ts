export default class Coche {
    id: string = '';
    marca: string = '';
    modelo: string = '';
    precio: number = 0;
    kilometros: number = 0;
    vendido: boolean = false;
    transmision: string = '';
    transacciones: string[] = [];
    dueñoAnterior: string = '';
    dueñoActual: string = '';
}