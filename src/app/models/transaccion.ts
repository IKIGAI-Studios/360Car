export default class Transaccion {
    id: string = '';
    fecha: string = '';
    precio: number = 0;
    metodoPago: metodoPago = '';
    coche: string = '';
    cocheMarca: string = '';
    cocheModelo: string = '';
    cliente: string = '';
    clienteNombre: string = '';
    clienteApellidos: string = '';
    tipo: transaccionTipo = '';

    constructor(transaccion: { fecha: string, precio: number, metodoPago: metodoPago, coche: string, cliente : string, tipo: transaccionTipo, cocheMarca?: string, cocheModelo?: string, clienteNombre?: string, clienteApellidos?: string }){
        this.fecha = transaccion.fecha;
        this.precio = transaccion.precio;
        this.metodoPago = transaccion.metodoPago;
        this.coche = transaccion.coche;
        this.cliente = transaccion.cliente;
        this.tipo = transaccion.tipo;
        this.cocheMarca = transaccion.cocheMarca ?? '';
        this.cocheModelo = transaccion.cocheModelo ?? '';
        this.clienteNombre = transaccion.clienteNombre ?? '';
        this.clienteApellidos = transaccion.clienteApellidos ?? '';
    }
}

export type metodoPago = 'efectivo' | 'credito' | 'debito' | '';
export type transaccionTipo = 'venta' | 'compra' | '';