import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../services/ventas.service';
import { Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

import { ClienteService } from 'src/app/clientes/service/cliente.service';
import { PdfService } from '../../services/pdf.service';
import { ReturnStatement } from '@angular/compiler';
import { FormControl, Validators } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-venta-unica',
  templateUrl: './venta-unica.component.html',
  styleUrls: ['./venta-unica.component.css']
})
export class VentaUnicaComponent implements OnInit {
  estado=""; //pendiente o pagado
  id:any="";
  comentario:FormControl;
  comentarioVenta:string =''
  constructor( private router:Router, private serviceCliente:ClienteService,private route: ActivatedRoute,private service: VentasService,private servicePdf:PdfService) {
    this.id = this.route.snapshot.paramMap.get('id')
    this.rut = this.route.snapshot.paramMap.get('rut')
    localStorage.setItem('dataToken',this.rut);

    this.comentario = new FormControl('',[Validators.required,]);
    this.comentario.valueChanges.subscribe(
      value =>{
        this.comentarioVenta = value
      }
    );
  }

  ingresoModificacion = 0;
  cliente!:any;
  rut!:any
  ventaProductos:any
  dataIndicador  = 0
  state:boolean = false;
  ngOnInit(): void {

    this.getClienteAndVenta()
  }


  getClienteAndVenta(){


    this.service.getVentaAndCliente(this.id,this.rut).subscribe(
      (res:any)=>{
        if(res.status == 404){
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
    
    this.verify_amount(this.id).then((data:any)=>{
      if(data.status == 200){
        this.serviceCliente.modificarEstadoVenta(estado,rut,idVenta).subscribe(
          (res:any)=>{
           
            if(res.status == 200){
              this.ingresoModificacion = 1;
              if(this.ingresoModificacion == 1){
                this.actualizarProducto(this.estado,this.id)
              }
              Swal.fire({
                title: '',
                text: 'Modificacion correcta!',
                icon: 'success',
              })
              
              setTimeout(()=>{
                window.location.reload()
              },3000)
            }
          }
        )
      }
      else if(data.status == 500){
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Stock no suficiente para esta compra!',
          showConfirmButton: false,
          timer: 2000
        })
      }
      
    })
    
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
    this.servicePdf.downloadPdf(type,this.id,this.rut,this.comentarioVenta);
  }

  activateCommentary(){
    if(this.state == false){
      this.state = true;
    }
    else{
      this.state = false;
    }
  }


  actualizarProducto(estado:any,id:any){
    if(estado=='pagado'){
      this.serviceCliente.actualizarProducto_delete(id).subscribe(
        res=>{
          console.log(res)  
        }
      )
    }
    else if(estado=='pendiente'){
      this.serviceCliente.actualizarProducto_add(id).subscribe(
        res=>{
          console.log(res)
        }
      )
    }

  }

  verify_amount(id:any){
    
    return new Promise((resolve,reject)=>{
      this.service.verify_amount(id).subscribe(
        (res:any)=>{
          resolve(res)
        }
      )
    })
  }

}
