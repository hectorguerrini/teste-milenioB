import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class EditClienteService {
  private url = environment.url;
  constructor(private http: HttpClient) { }

  getAllCidades() {
    const url = `${this.url}/cidades`;

    return this.http.get(url, {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/json'
      )
    });
  }

  criarCliente(cliente: Cliente) {
    const url = `${this.url}/clientes`;

    return this.http.post(url, cliente, {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/json'
      )
    });
  }
  updateCliente(cliente: Cliente) {
    const url = `${this.url}/clientes/${cliente.id_cliente}`;

    return this.http.put(url, cliente, {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/json'
      )
    });
  }
  deleteCliente(cliente: Cliente) {
    const url = `${this.url}/clientes/${cliente.id_cliente}`;

    return this.http.delete(url, {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/json'
      )
    });
  }
}
