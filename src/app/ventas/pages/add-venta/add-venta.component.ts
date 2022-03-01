import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { VentasService,producto,cliente, productoComprado, venta } from '../../services/ventas.service';


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
    historial:[]
  };


  venta : venta = {
    id_Venta: 0, //valor automatico en hora minuto segundo y fecha
    cliente: {
        nombre: '',
        apellidos: '',
        direccion: '',
        telefono: '',
        correo: '',
        rut: '',
    }, //son objectos de Cliente

    estado: 'pendiente',
    productos:[
      {
        nombre: '',
        valor: 0,
        descripcion: '',
        cantidad:0,
      }
    ], //son objectos de productos
    fecha: 0, //valor automatico en hora minuto segundo y fecha
    servicios: '',
    porcentaje: 0,
    totalDeVenta:0,
    envio:'pendiente'} // aca se almacena la venta


  container=0;//aca funciona el container general!

  listaProductos:producto[]=[]
  listaProductosEnLista:productoComprado[]=[]
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
      historial:[]
    };
  }


  methodsAdd(producto:producto){
  
    var productoComprado:productoComprado={
      nombre: producto.nombre,
      valor: producto.valor,
      descripcion: producto.descripcion,
      cantidad: 1 ,//valor por default
    };

    var existencia = 0
    this.listaProductosEnLista.forEach((e)=>{

      if(e.nombre == productoComprado.nombre){
        existencia = 1
      }
      
    })
    if(existencia == 0){
      this.listaProductosEnLista.push(productoComprado)
      console.log(this.listaProductosEnLista)
    }
    
  }


  verProducto(valor:number){
    //mostramos la compra que lleva!
    this.container = valor;

  }

  
  addCantidad(producto:productoComprado){
    var index = this.listaProductosEnLista.indexOf(producto)
    this.listaProductosEnLista[index].cantidad = this.listaProductosEnLista[index].cantidad  + 1 ;
  }


  deleteCantidad(producto:productoComprado){

    var index = this.listaProductosEnLista.indexOf(producto)
    if(this.listaProductosEnLista[index].cantidad >  1){
      this.listaProductosEnLista[index].cantidad = this.listaProductosEnLista[index].cantidad - 1 ;
    }
    else{
      Swal.fire({
        title: '',
        text: 'Mejor eliminalo solo tienes una cantidad!',
        icon: 'warning',
      })
    }
  }

  eliminarOfLista(producto:productoComprado){

    var index = this.listaProductosEnLista.indexOf(producto);
    var aux = this.listaProductosEnLista[0]
    
    this.listaProductosEnLista[0] = this.listaProductosEnLista[index];
    this.listaProductosEnLista[index] = aux;
    

    this.listaProductosEnLista.splice(0,1);
    

  }

}
