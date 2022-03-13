import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { VentasService,producto,cliente, productoComprado, venta,servicio } from '../../services/ventas.service';
import { Router } from '@angular/router';
import { Proveedor, ProveedorService } from 'src/app/proveedores/services/proveedor.service';
import { ClienteService } from 'src/app/clientes/service/cliente.service';

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
    comuna: '',
    ciudad: '',
    telefono: '',
    correo: '',
    rut: '',
    totalDeCompra:0,
    historial:[]
  };

  newServicio:servicio={
    nombre:"",
    valor:0,
  }

  servicios : any[] = [];

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
    },
    estado: 'pendiente',
    productos:[

    ],
    servicios:[], //son objectos de productos
    fecha: 0, //valor automatico en hora minuto segundo y fecha
    porcentaje: 0,
    totalDeVenta:0,
    envio:'pendiente',
    comentario:''
  } // aca se almacena la venta

    proveedor: Proveedor = {
      nombre: '',
      rut: '',
      nombreContacto: '',
      direccion: '',
      telefono: '',
      atencion: '',
      correoAtencion: '',
      retira: '',
    }

  container=0;//aca funciona el container general!

  listaProductos:producto[]=[]
  listaProductosEnLista:productoComprado[]=[] //los productos que hay que agregar a la venta
  buscado = 0;

  listaProveedores:Proveedor[]=[]

  constructor(private service:VentasService,private serviceProveedor:ProveedorService,private serviceCliente:ClienteService , private router:Router) { }

  ngOnInit(): void {
    this.getProductos();
    this.getProveedores();
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
        res.proveedores.forEach((element: Proveedor) => {
          this.listaProveedores.push(element)
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
      comuna: '',
      ciudad: '',
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
    else if(this.venta.porcentaje > 0 && this.listaProductosEnLista.length != 0 && this.cliente.nombre != "" && this.venta.proveedor.nombre != ""){

      //guardamos al cliente en venta!

      this.venta.cliente.nombre = this.cliente.nombre
      this.venta.cliente.correo = this.cliente.correo
      this.venta.cliente.rut = this.cliente.rut
      this.venta.cliente.telefono = this.cliente.telefono
      this.venta.cliente.direccion = this.cliente.direccion
      
      var suma = 0
      this.listaProductosEnLista.forEach((e)=>{
        suma = suma  + e.cantidad*e.valor;
      })
      console.log("SUMA,",suma)
      this.venta.servicios.forEach((servicio)=>{
        suma = suma + servicio.valor;
      })
      console.log("Servicio,",suma)
      this.venta.totalDeVenta = Math.trunc(suma + (suma * 0.19));
      console.log("Total,",this.venta.totalDeVenta)
      this.listaProductosEnLista.forEach((e)=>{
        this.venta.productos.push(e);
      })

      this.service.addVenta(this.venta).subscribe(
        (res:any)=>{
          if(res.status == 200){
            Swal.fire({
              title: '',
              text: 'Ingreso correcto de la venta',
              icon: 'success',
            })
            this.newSuma(this.rut);

            delay(1000);
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

  newSuma(rut:string){
    this.serviceCliente.calcularTotalVenta(rut).subscribe(
      res=>{
        console.log(res)
      }
    )
  }


  updateVenta(id:string){
    this.serviceCliente.updateVenta(id).subscribe(
      res=>{
        console.log(res)
      }
    )
  }


  addServicio(nombre:string,valor:number):any{
  

    if(nombre == "" || valor == 0){
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Revisa los datos del servicio',
        showConfirmButton: false,
        timer: 2000
      });
      return 0
    }
    else{
      
      this.venta.servicios.push({nombre,valor});
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Ingreso correcto!',
        showConfirmButton: false,
        timer: 2000
      });
    
     
    }
    
    return 1;
  
  }


}
