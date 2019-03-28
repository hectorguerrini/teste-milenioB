import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';
import { Cliente } from '../models/cliente';
import { MatDialog } from '@angular/material/dialog';
import { EditClienteComponent } from '../edit-cliente/edit-cliente.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  lista: Array<Cliente>;

  constructor(private clienteService: ClientesService, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.getAllClientes();
  }

  getAllClientes(): void {
    this.clienteService.getAllClientes()
    .subscribe((data: Array<Cliente>) => {
      this.lista = data;
    });
  }

  editCliente(item: Cliente): void {
    const dialogRef = this.dialog.open(EditClienteComponent, {
      width: '800px', height: '450px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getAllClientes();
      }
    });
  }

  criarCliente(): void {
    const dialogRef = this.dialog.open(EditClienteComponent, {width: '800px', height: '450px'});
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getAllClientes();
      }
    });
  }

}
