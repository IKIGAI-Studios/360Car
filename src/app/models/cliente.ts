export default class Cliente {
    id: string = '';
    nombre: string = '';
    apellidos: string = '';
    email: string = '';
    telefono: string = '';
    coches: string[] = [];
    transacciones: string[] = [];

    constructor(cliente: { nombre: string, apellidos: string, email: string, telefono: string }){
        this.nombre = cliente.nombre;
        this.apellidos = cliente.apellidos;
        this.email = cliente.email;
        this.telefono = cliente.telefono;
    }
}