export default class Transaccion {
    id: string = '';
    fecha: string = '';
    precio: number = 0;
    metodoPago: metodoPago = '';
    coche: string = '';
    cliente: string = '';
    tipo: transaccionTipo = '';

    constructor(transaccion: { fecha: string, precio: number, metodoPago: metodoPago, coche: string, cliente: string, tipo: transaccionTipo }){
        this.fecha = transaccion.fecha;
        this.precio = transaccion.precio;
        this.metodoPago = transaccion.metodoPago;
        this.coche = transaccion.coche;
        this.cliente = transaccion.cliente;
        this.tipo = transaccion.tipo;
    }
}

export type metodoPago = 'efectivo' | 'credito' | 'debito' | '';
type transaccionTipo = 'venta' | 'compra' | '';