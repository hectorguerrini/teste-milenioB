import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../models/cliente';
import { EditClienteService } from './edit-cliente.service';
import { Cidade } from '../models/cidade';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.scss']
})
export class EditClienteComponent implements OnInit {
  submitted = false;
  ClienteForm: FormGroup = this.fb.group({
    nome: ['', Validators.required],
    email: ['', Validators.required],
    endereco: [''],
    numero: [''],
    complemento: [''],
    bairro: [''],
    id_cidade: [''],
    cep: [''],
  });
  cidades: Array<Cidade>;
  constructor(
    private fb: FormBuilder, private EClienteService: EditClienteService,
    public dialogRef: MatDialogRef<EditClienteComponent>, @Inject(MAT_DIALOG_DATA) public cliente: Cliente) {
      if (cliente) {
        this.ClienteForm.setValue({
          nome: cliente.nome,
          email:  cliente.email,
          endereco: cliente.endereco,
          numero: cliente.numero,
          complemento: cliente.complemento,
          bairro: cliente.bairro,
          id_cidade: cliente.id_cidade,
          cep: cliente.cep,
        });
      } else {
        this.cliente = <Cliente>{};
      }
      this.getComboCidades();
  }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
  onSubmitDel(): void {
    this.EClienteService.deleteCliente(this.cliente)
    .subscribe((data: Cliente) => {
      if (data.id_cliente) {
        this.dialogRef.close(true);
      } else {
        console.log(data);
      }
    });
  }
  onSubmitSave(): void {
    this.submitted = true;
    if (this.ClienteForm.invalid) {
      return;
    }


    this.cliente.nome = this.ClienteForm.value.nome;
    this.cliente.email = this.ClienteForm.value.email;
    this.cliente.endereco = this.ClienteForm.value.endereco;
    this.cliente.numero = this.ClienteForm.value.numero;
    this.cliente.complemento = this.ClienteForm.value.complemento;
    this.cliente.bairro = this.ClienteForm.value.bairro;
    this.cliente.id_cidade = this.ClienteForm.value.id_cidade ? this.ClienteForm.value.id_cidade.id_cidade : null;
    this.cliente.cep = this.ClienteForm.value.cep;

    if(this.cliente.id_cliente) {
      this.EClienteService.updateCliente(this.cliente)
      .subscribe((data: Cliente) => {

        this.dialogRef.close(true);

      });
    } else {
      this.EClienteService.criarCliente(this.cliente)
      .subscribe((data: Cliente) => {
        if (data.id_cliente) {
          this.dialogRef.close(true);
        } else {
          console.log(data);
        }
      });
    }

  }
  get form() { return this.ClienteForm.controls; }

  getComboCidades(): void {
    this.EClienteService.getAllCidades()
      .subscribe((data: Array<Cidade>) => {
        this.cidades = data;
        console.log(this.ClienteForm.value.id_cidade);
        if (this.cliente) {
          this.ClienteForm.value.id_cidade = this.cidades.find((el: Cidade) => {
            return el.id_cidade === this.cliente.id_cidade;
          });
        }
      });
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.cidades.filter(v => v.cidade.toLowerCase().indexOf(term.toLowerCase()) > -1)
          .slice(0, 5)
      )
    )

  formatter = (x: { cidade: string }) => x.cidade;
}
