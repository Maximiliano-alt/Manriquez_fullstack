import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ClienteService,cliente } from '../../service/cliente.service';


@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.css']
})
export class AddClienteComponent implements OnInit {

  name: FormControl;
  rut: FormControl;
  phone:FormControl;
  email:FormControl;
  direction:FormControl;

  clienteDefault:cliente={
    nombre: '',
    direccion: '',
    telefono: '',
    correo: '',
    rut: '',
    totalDeCompra:0,
    historial:[],
  }


  constructor(private router:Router,private service: ClienteService) {

    this.name = new FormControl('',[
      Validators.required,
    ]);
    this.name.valueChanges.subscribe(
      value =>{
        this.clienteDefault.nombre = value
      }
    );

    this.rut = new FormControl('',[
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(10),
      Validators.pattern(/[0-9].-[0-9].*$/)
    ]);
    this.rut.valueChanges.subscribe(
      value =>{
        this.clienteDefault.rut = value
      }
    );

    this.phone = new FormControl('',[
      Validators.required,
      Validators.pattern(/[0-9].*$/)
    ]);
    this.phone.valueChanges.subscribe(
      value =>{
        this.clienteDefault.telefono = value
      }
    );


    this.email = new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]);
    this.email.valueChanges.subscribe(
      value =>{
        this.clienteDefault.correo = value
      }
    );

    this.direction = new FormControl('',[
      Validators.required,
    ]);
    this.direction.valueChanges.subscribe(
      value =>{
        this.clienteDefault.direccion = value
      }
    );
   }

  ngOnInit(): void {
  }

  add_cliente(){
    if(this.name.valid && this.rut.valid && this.phone.valid
      && this.email.valid && this.direction.valid){
        this.service.add_cliente(this.clienteDefault).subscribe(
          (res:any)=>{
            if(res.status == 200){
              Swal.fire({
                title: '',
                text: 'Ingreso correcto',
                icon: 'success',
              })
              this.router.navigate(['/clientes'])
            }
            else if(res.status == 500){
              Swal.fire({
                title: '',
                text: 'Hubo problemas al ingresar el cliente',
                icon: 'error',
              })
              this.router.navigate(['/clientes'])
            }
          }
        )
      }

  }

  renew(){

    this.router.navigate(['/clientes'])
  }

}
