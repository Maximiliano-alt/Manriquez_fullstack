import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VentasService } from 'src/app/ventas/services/ventas.service';
import { ClienteService } from '../../service/cliente.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-venta-unica',
  templateUrl: './venta-unica.component.html',
  styleUrls: ['./venta-unica.component.css']
})
export class VentaUnicaComponent implements OnInit {
  estado="pagado"; //pendiente o pagado
  id:any="";
  constructor(private serviceCliente: ClienteService, private router:Router, private route: ActivatedRoute,private service: VentasService) {
    this.id = this.route.snapshot.paramMap.get('id')
  }

  cliente!:any;
  rut!:string
  ventaProductos:any
  dataIndicador  = 0
  state:boolean = false;
  stateCotizacion = false;

  ngOnInit(): void {
    this.rut = localStorage.getItem('dataToken') || ""
    this.getClienteAndVenta()
    this.updateVenta(this.id)
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

  
  cotizacion():number{
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

  activateCommentary(){
    if(this.state == false){
      this.state = true;
    }
    else{
      this.state = false;
    }
  }

}
