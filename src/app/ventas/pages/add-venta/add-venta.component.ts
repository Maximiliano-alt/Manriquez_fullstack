import { Component, OnInit } from '@angular/core';
import { VentasService,producto } from '../../services/ventas.service';
import { cliente } from 'src/app/clientes/service/cliente.service';

@Component({
  selector: 'app-add-venta',
  templateUrl: './add-venta.component.html',
  styleUrls: ['./add-venta.component.css']
})
export class AddVentaComponent implements OnInit {
  marcadorListaProducto = 0;
  rut!:string;
  cliente:cliente={
    nombre: '',
    direccion: '',
    telefono: '',
    correo: '',
    rut: '',
    totalDeCompra:0,
  historial:
  //historial de compras
  []
  };

  listaProductos:producto[]=[]

  buscado = 0;

  
  constructor(private service:VentasService) { }

  ngOnInit(): void {
    this.getProductos()
  }


  getProductos(){

    this.marcadorListaProducto = 0;
    this.service.getProductos().subscribe(
      res=>{
        res.forEach(element => {
          this.listaProductos.push(element)
          if(this.listaProductos.length == res.length){
            this.marcadorListaProducto = 1
          }
        });

      }
    )
  }


  searchCliente(data:string){
    this.dessetear()
    this.service.getCliente(data).subscribe(
      res=>{
        this.asignacionCliente(res.data)  
      }
    )
    this.buscado = 1;
  }

  asignacionCliente(data:cliente){
    this.cliente.nombre = data.nombre
    this.cliente.direccion = data.direccion
    this.cliente.telefono = data.telefono
    this.cliente.correo = data.correo
    this.cliente.rut = data.rut
    this.cliente.totalDeCompra = data.totalDeCompra
    this.cliente.historial = data.historial
    
  }

  dessetear(){
    this.cliente ={
      nombre: '',
      direccion: '',
      telefono: '',
      correo: '',
      rut: '',
      totalDeCompra:0,
    historial:
    //historial de compras
    []
    };
  }

}
