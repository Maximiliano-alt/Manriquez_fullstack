import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../services/ventas.service';
import { Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

import { ClienteService } from 'src/app/clientes/service/cliente.service';
import { PdfService } from '../../services/pdf.service';
@Component({
  selector: 'app-venta-unica',
  templateUrl: './venta-unica.component.html',
  styleUrls: ['./venta-unica.component.css']
})
export class VentaUnicaComponent implements OnInit {
  estado=""; //pendiente o pagado
  id:any="";
  constructor( private router:Router, private serviceCliente:ClienteService,private route: ActivatedRoute,private service: VentasService,private servicePdf:PdfService) {
    this.id = this.route.snapshot.paramMap.get('id')
    this.rut = this.route.snapshot.paramMap.get('rut')
    localStorage.setItem('dataToken',this.rut);
  }

  cliente!:any;
  rut!:any
  ventaProductos:any
  dataIndicador  = 0

  ngOnInit(): void {

    this.getClienteAndVenta()
  }


  getClienteAndVenta(){


    this.service.getVentaAndCliente(this.id,this.rut).subscribe(
      (res:any)=>{
        if(res.status==404){
          Swal.fire({
            title: 'Error :(',
            text: 'Usuario no encontrado',
            icon: 'error',
          })
          this.router.navigate(['/clientes/clientes'])
        }
        else{

          this.cliente = res.data
          this.ventaProductos = res.dataVenta
          this.dataIndicador = 1
          this.estado = this.ventaProductos.estado
        }
      }
    )

  }


  ver_producto():number{

    return 0;
  }

  cotizacion():number{
    console.log("crear cotizacion again");
    return 0;
  }
  modificarEstado(estado:string,rut:string,idVenta:string):number{
    this.serviceCliente.modificarEstadoVenta(estado,rut,idVenta).subscribe(
      (res:any)=>{
        if(res.status == 200){
          Swal.fire({
            title: '',
            text: 'Modificacion correcta!',
            icon: 'success',
          })
          delay(2000)
          window.location.reload()
        }
      }
    )
    return 0;
  }
  delete(idventa:string,rut:string):number{
    this.serviceCliente.deleteVenta(rut,idventa).subscribe(
      (res:any)=>{
        if(res.status==200){
          Swal.fire({
            title: '',
            text: 'Venta Eliminada!',
            icon: 'success',
          })
          this.newSuma(this.rut)
          this.router.navigate(['/clientes'])
        }
        else{
          Swal.fire({
            title: '',
            text: 'Ocurrio un error al eliminar la venta :(',
            icon: 'error',
          })
          this.router.navigate(['/clientes'])
        }
      }
    )
    return 0;
  }

  newSuma(rut:string){
    this.serviceCliente.calcularTotalVenta(rut).subscribe(
      res=>{

      }
    )
  }

  updateVenta(id:string){
    this.serviceCliente.updateVenta(id).subscribe(
      res=>{

      }
    )
  }


  createBuyOrder(type:string){
    console.log('ola');
    this.servicePdf.downloadPdf(type);
  }

}
