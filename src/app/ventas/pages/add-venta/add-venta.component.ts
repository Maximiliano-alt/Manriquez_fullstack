import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { VentasService,producto,cliente, productoComprado, venta } from '../../services/ventas.service';
import { Router } from '@angular/router';
import { Proveedor, ProveedorService } from 'src/app/proveedores/services/proveedor.service';

@Component({
  selector: 'app-add-venta',
  templateUrl: './add-venta.component.html',
  styleUrls: ['./add-venta.component.css']
})


export class AddVentaComponent implements OnInit {
  marcadorListaProducto = 0;
  marcadorListaProveedor = 0;
  filtroProduct= '';
  filtroProveedor = '';
  rut!:string;
  icoColor = 'white';
  nombreProveedor!:string;
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
    proveedor:{
      nombre: '',
      rut: '',
      nombreContacto: '',
      direccion: '',
      telefono: '',
      atencion: '',
      correoAtencion: '',
      retira: '',
      numeroGuia: '',
      comentario: '',
    },
    estado: 'pendiente',
    productos:[

    ], //son objectos de productos
    fecha: 0, //valor automatico en hora minuto segundo y fecha
    servicios: '',
    porcentaje: 0,
    totalDeVenta:0,
    envio:'pendiente'} // aca se almacena la venta

    proveedor: Proveedor = {
      nombre: '',
      rut: '',
      nombreContacto: '',
      direccion: '',
      telefono: '',
      atencion: '',
      correoAtencion: '',
      retira: '',
      numeroGuia: '',
      comentario: '',
    }

  container=0;//aca funciona el container general!

  listaProductos:producto[]=[]
  listaProductosEnLista:productoComprado[]=[] //los productos que hay que agregar a la venta
  buscado = 0;

  listaProveedores:Proveedor[]=[]

  constructor(private service:VentasService,private serviceProveedor:ProveedorService, private router:Router) { }

  ngOnInit(): void {
    this.getProductos();
    this.getProveedores();
    console.log(this.listaProveedores);
  }

  changeColor(color: string){
    if(color == 'white'){
      this.icoColor = '#F25C05';
    }else{
      this.icoColor = 'white';
    }
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

  getProveedores(){
    this.marcadorListaProveedor = 0;
    this.serviceProveedor.getAllProveedores().subscribe(
      res=>{
        console.log(res)
        res.proveedores.forEach((element: Proveedor) => {
          this.listaProveedores.push(element)
          console.log(this.listaProveedores)
          if(this.listaProveedores.length == res.length){
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
    }

  }

  proveedorSelected(proveedor:Proveedor){
    this.venta.proveedor = proveedor;
    console.log(this.venta.proveedor);
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

  crearVenta(){

    if(this.cliente.nombre == ""){
      Swal.fire({
        title: '',
        text: 'Debes seleccionar un cliente!',
        icon: 'warning',
      })
    }

    if(this.listaProductosEnLista.length == 0){
      Swal.fire({
        title: '',
        text: 'Debes seleccionar al menos un producto!',
        icon: 'warning',
      })
    }
    if(this.venta.porcentaje == 0){
      Swal.fire({
        title: '',
        text: 'Debes ingresar porcentaje de utilidad!',
        icon: 'warning',
      })
    }
    if(this.venta.proveedor.nombre == ""){
      Swal.fire({
        title: '',
        text: 'Debes ingresar un proveedor',
        icon: 'warning',
      })
    }
    else if(this.venta.porcentaje > 0 && this.listaProductosEnLista.length != 0 && this.cliente.nombre != "" && this.venta.proveedor.nombre != ''){

      //guardamos al cliente en venta!

      this.venta.cliente.nombre = this.cliente.nombre
      this.venta.cliente.correo = this.cliente.correo
      this.venta.cliente.rut = this.cliente.rut
      this.venta.cliente.telefono = this.cliente.telefono
      this.venta.cliente.direccion = this.cliente.direccion
      this.venta.proveedor = this.proveedor;
      var suma = 0
      this.listaProductosEnLista.forEach((e)=>{
        suma = suma  + e.cantidad*e.valor;
      })
      this.venta.totalDeVenta = suma;
      this.listaProductosEnLista.forEach((e)=>{
        this.venta.productos.push(e);
      })

      this.service.addVenta(this.venta).subscribe(
        (res:any)=>{
          if(res.status == 200){
            Swal.fire({
              title: '',
              text: 'Ingreso correcto de la venta modifica esta misma en ventas',
              icon: 'success',
            })
            delay(2000);
            this.router.navigate(['/ventas/loadVentas']);
          }
          else{
            Swal.fire({
              title: '',
              text: 'Ingreso fallido de la venta intenta mas tarde',
              icon: 'error',
            })
          }
        }
      )

    }
  }
}
