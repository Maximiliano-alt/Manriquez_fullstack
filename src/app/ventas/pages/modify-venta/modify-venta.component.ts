import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/clientes/service/cliente.service';
import { GraphicsService } from 'src/app/graphics/services/graphics.service';
import { VentasService,cliente, venta } from '../../services/ventas.service';

@Component({
  selector: 'app-modify-venta',
  templateUrl: './modify-venta.component.html',
  styleUrls: ['./modify-venta.component.css']
})
export class ModifyVentaComponent implements OnInit {
  id:any;
  rut:string;
  marcadorListaProducto:number = 1;
  buscado = 0;
  cliente:cliente={
    nombre: '',
    direccion: '',
    comuna: '',
    ciudad: '',
    telefono: '',
    correo: '',
    rut: '',
    totalDeCompra:0,
    historial:[]
  };
  ventaModify!: venta;
  constructor(private serviceFinanza:GraphicsService, private router:Router, private route: ActivatedRoute,private service: VentasService, private serviceCliente:ClienteService) {
    this.id = this.route.snapshot.paramMap.get('id')
    this.rut = localStorage.getItem('dataToken') || "";
   }

  ngOnInit(): void {
    console.log(this.rut)
    this.searchCliente(this.rut)
  }
  dessetear(){
    this.cliente ={
      nombre: '',
      direccion: '',
      comuna: '',
      ciudad: '',
      telefono: '',
      correo: '',
      rut: '',
      totalDeCompra:0,
      historial:[]
    };
  }
  updateVenta(){

    this.service.updateVenta(this.ventaModify).subscribe(
      res=>{
        console.log(res)
        this.router.navigate(['/ventas'])
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
    this.cliente.comuna = data.comuna
    this.cliente.ciudad = data.ciudad
    this.cliente.telefono = data.telefono
    this.cliente.correo = data.correo
    this.cliente.rut = data.rut
    this.cliente.totalDeCompra = data.totalDeCompra
    this.cliente.historial = data.historial

  }
}
