import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private url = environment.url;

  constructor(private http: HttpClient) { }

  getAllClientes() {
    const url = `${this.url}/clientes`;

    return this.http.get(url, {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/json'
      )
    });
  }
}
