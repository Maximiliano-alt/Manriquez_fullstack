import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../services/ventas.service';
import { Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { delay, ignoreElements } from 'rxjs/operators';

import { ClienteService } from 'src/app/clientes/service/cliente.service';
import { PdfService } from '../../services/pdf.service';
import { HtmlParser, ReturnStatement } from '@angular/compiler';
import { FormControl, Validators } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
import { GraphicsService } from 'src/app/graphics/services/graphics.service';
@Component({
  selector: 'app-venta-unica',
  templateUrl: './venta-unica.component.html',
  styleUrls: ['./venta-unica.component.css']
})
export class VentaUnicaComponent implements OnInit {
  estado=""; //cotizado o pagado
  id:any="";
  comentario:FormControl;
  descuento:FormControl;
  comentarioVenta:string =''
  descuentoVenta:number = 0
  observacion = " "
  constructor( private serviceFinanzas: GraphicsService,private router:Router, private serviceCliente:ClienteService,private route: ActivatedRoute,private service: VentasService,private servicePdf:PdfService) {
    this.id = this.route.snapshot.paramMap.get('id')
    this.rut = this.route.snapshot.paramMap.get('rut')
    localStorage.setItem('dataToken',this.rut);

    this.comentario = new FormControl('',[Validators.required,]);
    this.comentario.valueChanges.subscribe(
      value =>{
      }
    );

    this.descuento = new FormControl('',[
      Validators.pattern(/^[0-9]*$/)
    ]);
    this.descuento.valueChanges.subscribe(
      value =>{
        this.descuentoVenta = value
      }
    );
  }

  ingresoModificacion = 0;
  cliente!:any;
  rut!:any
  ventaProductos:any
  dataIndicador  = 0
  state:boolean = false;
  stateCotizacion = false;
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

          this.cliente = res.dataVenta.cliente
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

  cotizacion():any{
    //descuento
    Swal.fire({
      title: 'Ingrese % de descuento',
      input: 'number',
      showCancelButton: true,
      confirmButtonText: "Confirmar",
    }).then((resultado:any) => {
      this.cotizacion = resultado.value
      this.getObservacion()
    }).catch(err =>{
      console.log(err)
    });


  }
  getObservacion(){
     //observacion
     Swal.fire({
      title: 'Ingrese observacion',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: "Confirmar",
    }).then((resultado:any) => {
      this.observacion = resultado.value
      this.createBuyOrder('cotizacion')
      setTimeout(()=>{
       // window.location.reload()
      },2000)
    }).catch(err =>{
      console.log(err)
    })
  }
  ordenDeCompra():any{
    Swal.fire({
      title: 'Ingrese comentario para la orden',
      input: 'textarea',
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      customClass: {
        validationMessage: 'my-validation-message'
      },
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage(
            ' El comentario es requerido'
          )
        }
      }
    }).then((resultado:any) => {
      this.comentarioVenta = resultado.value
      this.createBuyOrder('orden')
      setTimeout(()=>{
        window.location.reload()
      },1000)
    }).catch(err =>{
      console.log(err)
    }
    )
  }
  guiaVenta():any{
    //descuento
    Swal.fire({
      title: 'Ingrese % de descuento',
      input: 'number',
      showCancelButton: true,
      confirmButtonText: "Confirmar",
    }).then((resultado:any) => {
      this.guiaVenta = resultado.value
      this.getObservacionGuia()
    }).catch(err =>{
      console.log(err)
    });


  }
  getObservacionGuia(){
     //observacion
     Swal.fire({
      title: 'Ingrese observacion',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: "Confirmar",
    }).then((resultado:any) => {
      this.observacion = resultado.value
      this.createBuyOrder('guia')
      setTimeout(()=>{
       // window.location.reload()
      },2000)
    }).catch(err =>{
      console.log(err)
    })
  }
  modificarEstado(estado:string,rut:string,idVenta:string):any{

    this.verify_amount(this.id).then((data:any)=>{

      if(data.status == 200){
        // si el stock es el correcto para realizar la venta esto funciona
        Swal.fire({
          title: 'Modificar Estado',
          input: 'radio',
          inputOptions: {
            'cotizado':'Cotizado',
            'abonado':'Abonado',
            'pagado':'Pagado'
          },
          showCancelButton: true,
          confirmButtonText: "Confirmar",

        }).then(resultado =>{
          if(resultado.value != undefined){
            if(resultado.value == 'abonado'){ //aca realizamos la logica de abonado
              Swal.fire({
                title: 'Ingresar Cantidar a abonar',
                input:"number",
                showCancelButton: true,
              }).then(abono=>{
                //agergar el abono a la venta
                this.addAbono(abono.value,this.id)
                .then((value)=>{


                    this.serviceCliente.modificarEstadoVenta(resultado.value,rut,idVenta).subscribe(
                      (res:any)=>{

                        if(res.status == 200){
                          // modificacion correcta
                          this.ingresoModificacion = 1;
                          if(this.ingresoModificacion == 1){

                            this.actualizarProducto(resultado.value,this.id).then(
                              (val)=>{

                            })
                          }
                          const x = new Promise((resolve,reject)=>{
                            resolve(this.addToFinanzas(idVenta,resultado.value))
                          })
                          .then(()=>{
                            window.location.reload()
                          })

                        }
                      }
                    )


                })
              })
            }
            if(resultado.value!='abonado'){
              this.serviceCliente.modificarEstadoVenta(resultado.value,rut,idVenta).subscribe(
                (res:any)=>{

                  if(res.status == 200){
                    // modificacion correcta
                    this.ingresoModificacion = 1;
                    if(this.ingresoModificacion == 1){

                      this.actualizarProducto(resultado.value,this.id).then(
                        (val)=>{

                      })
                    }
                    this.addToFinanzas(idVenta,resultado.value)
                    setTimeout(()=>{
                      window.location.reload()
                    },3000)
                  }
                }
              )
            }

          }

        })


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

  }

  delete(idventa:string,rut:string):any{
    this.serviceFinanzas.removeVenta(idventa)
    this.serviceCliente.deleteVenta(rut,idventa).subscribe(
      (res:any)=>{
        if(res.status==200){
          Swal.fire({
            title: '',
            text: 'Venta Eliminada!',
            icon: 'success',
          })
          this.newSuma(this.rut)
          this.router.navigate(['/ventas'])
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

  }

  newSuma(rut:string){
    return new Promise((resolve,reject)=>{
      this.serviceCliente.calcularTotalVenta(rut).subscribe(
        res=>{
          resolve(res)
        }
      )

    })

  }

  updateVenta(id:string){
    return new Promise((resolve,reject)=>{
      this.serviceCliente.updateVenta(id).subscribe(
        res=>{
          resolve(res)
        }
      )
    })
  }


  createBuyOrder(type:string){
    this.servicePdf.downloadPdf(type,this.id,this.rut,this.comentarioVenta,this.descuentoVenta,this.ventaProductos,this.observacion);
  }

  activateCommentary(){
    if(this.state == false){
      this.state = true;
    }
    else{
      this.state = false;
    }
  }

  activateDesc(){
    if(this.stateCotizacion == false){
      this.stateCotizacion = true;
    }
    else{
      this.stateCotizacion = false;
    }
  }






  // addFinanza al gestor de finanzas

  addToFinanzas(idVenta:any,estado:string){

    return new Promise((resolve,reject)=>{
      if(estado === 'pagado' && this.ventaProductos.estado != 'abonado' && this.ventaProductos.estado != 'pagado'){
        // cambiamos de estado a enviado
        this.serviceFinanzas.addVenta(idVenta).subscribe(
          (res:any)=>{

            resolve(res)
          }
        )
      }
      else if(estado === 'abonado' && this.ventaProductos.estado != 'pagado' && this.ventaProductos.estado != 'abonado'){
        // cambiamos de estado a enviado
        this.serviceFinanzas.addVenta(idVenta).subscribe(
          (res:any)=>{

            resolve(res)
          }
        )
      }
      else if(estado === 'cotizado' && this.ventaProductos.estado != 'cotizado'){
        // cambiamos de estado a cotizado
        this.serviceFinanzas.removeVenta(idVenta).subscribe(
          (res:any)=>{

            resolve(res)

          }
        )
      }
    })
  }












  actualizarProducto(estado:any,id:any){
    return new Promise((resolve,reject)=>{
      if(estado=='pagado' && this.ventaProductos.estado == 'abonado'){
        // yo no puedo modificar el stock
        resolve(1)
      }
      else if((this.ventaProductos.estado  == 'cotizado' && estado == 'pagado') || (this.ventaProductos.estado  == 'cotizado' && estado == 'abonado')){
        // el estado anterior era cotizado y el nuevo estado es pagado o abonado

        this.serviceCliente.actualizarProducto_add(id).subscribe(
          res=>{
            resolve(res)
          }
        )

      }
      else if((this.ventaProductos.estado  == 'pagado' && estado  == 'cotizado') || (this.ventaProductos.estado  == 'abonado' && estado  == 'cotizado') ){
        this.serviceCliente.actualizarProducto_delete(id).subscribe(
          res=>{

            resolve(res)
          }
        )
      }
      resolve(1)
    })
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


  //ABONO
  addAbono(valorAbono:number,idVenta:any){
    return new Promise((resolve,reject)=>{
      this.service.addAbono(valorAbono,idVenta).subscribe(
        (res:any)=>{

          if(res.status == 200){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: res.mensaje,
              showConfirmButton: false,
              timer: 2000
            })
            resolve(1)
          }
          else if(res.status == 500){
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: res.mensaje,
              showConfirmButton: false,
              timer: 2000
            })
            resolve(0)
          }
        }
      )
    })
  }








}
