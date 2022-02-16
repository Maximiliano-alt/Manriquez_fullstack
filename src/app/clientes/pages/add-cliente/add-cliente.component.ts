import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService,cliente } from '../../service/cliente.service';
@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.css']
})
export class AddClienteComponent implements OnInit {


  clienteDefault:cliente={
    nombre: '',
    direccion: '',
    telefono: '',
    correo: '',
    rut: '',
    totalDeCompra:0,
    historial:[],
  }


  constructor(private router:Router,private service: ClienteService) { }

  ngOnInit(): void {
  }

  add_cliente(data:cliente){
    
    this.service.add_cliente(data).subscribe(
      res=>{
        console.log(res);
      }
    )
  }

  renew(){
  
    this.router.navigate(['/clientes'])
  }

}
