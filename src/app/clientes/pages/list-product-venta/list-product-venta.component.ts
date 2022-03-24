import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { productoComprado, VentasService } from 'src/app/ventas/services/ventas.service';
import { ClienteService } from '../../service/cliente.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-product-venta',
  templateUrl: './list-product-venta.component.html',
  styleUrls: ['./list-product-venta.component.css']
})
export class ListProductVentaComponent implements OnInit {

  id:any
  estado="pagado";
  indice_espera = 4;
  inicio_slice = 0;
  index_aux = 0;
  resto=0;
  final = 0;
  // array = [1,2,3,4,5,6,7,8,9,10,12,13]
  
  array:productoComprado[]=[]

  inicio:any=0;


  segmento:any=[]
  rut!:any

  constructor(private router:Router, private route: ActivatedRoute,private service: VentasService,private serviceCliente:ClienteService) {
    this.id = this.route.snapshot.paramMap.get('id')
    this.rut = this.route.snapshot.paramMap.get('rut')
    
   }

  ngOnInit(): void {
    this.resto = this.array.length%4
    // this.nf_for_next();
    
    this.updateVenta(this.id)
    this.getData()

  }

 modify(array:productoComprado[],producto:productoComprado,idVenta:string,operacion:string){
    
    // operacion s r d
    
    this.service.deleteProduct(array,producto,idVenta,operacion).subscribe(
      (res:any)=>{
        if(res.status==200){
          this.array = []
          this.indice_espera = 4;
          this.inicio_slice = 0;
          this.actualizarCliente(this.id,this.rut,this.array,producto,operacion)
          this.getData()
          this.newSuma(this.rut)
          this.updateVenta(this.id)
        
        }
        else{
          Swal.fire({
            title: 'Error!',
          text: 'No se pudo editar el producto',
          icon: 'error',})
        }
        
      }
    )
  }


  getData(){
    this.service.getVentaAndCliente(this.id,this.rut).subscribe(
      (res:any)=>{
        if(res.status!=404){
          res.dataVenta.productos.forEach((element:productoComprado) => {
            this.array.push(element)
            if(this.array.length == res.dataVenta.productos.length){
              this.nf_for_next();
              
            }
          });
        }
        else{
          Swal.fire({
            title: 'Error!',
            text: 'Datos de entrada incorrectos!',
            icon: 'error',
       
          })
        }
      }
    )
  }
  



  nf_for_next():number{
    var aux = this.segmento;
    this.segmento = [];


    if(this.inicio_slice == (this.array.length - this.resto) && this.resto != 0){

      for (let index = (this.array.length-this.resto); index < this.array.length; index++) {
        if(this.array[index]!=undefined){
          this.segmento.push(this.array.find((element:any)=>element==this.array[index])!) 
        }

      }

      return 0;
    }
    else{

      // recorremos del principio hasta llegar al resto

      if(this.resto == 0 && this.indice_espera == this.array.length+4){

        this.segmento = aux;
        return 0;
      }
      else{
       
        for (let index = this.inicio_slice; index < this.indice_espera; index++) {
          if(this.array[index]!=undefined){
            this.segmento.push(this.array.find((element:any)=>element==this.array[index])!) 
          }
  
        }
        //aniadimos 6 unidades par poder recorrer el ng-for con 6 ventas
       if(this.indice_espera<this.array.length){
        this.indice_espera = this.indice_espera + 4;
        this.inicio_slice = this.inicio_slice + 4;
       }

        return 1;
      }

    }


  }
  nf_for_preview():any{
    var aux = this.segmento;
    this.segmento = [];
    
    
    if(this.indice_espera -4 <=0){
      this.segmento = aux;
      return 0;
    }
    else{
      this.inicio_slice = this.inicio_slice - 4;
      this.indice_espera = this.indice_espera -4;
      for (let index = this.inicio_slice; index < this.indice_espera; index++) {
        this.array.find((element:any)=>{
          if(element==this.array[index]){
            this.segmento.push(element)
          }
        })
        
      }
      return 1;
    }
    
   
  }




  actualizarCliente(idVenta:string,rut:string,array:any,producto:any,indicador:string){
    this.serviceCliente.actualizarVenta(idVenta,rut,this.array,producto,indicador)
    .subscribe(
      (res:any)=>{
        if(res.status == 500){
          Swal.fire({
            title: '',
            text: 'No se pudo modificar el producto :(',
            icon: 'error',
          })
        }
        this.newSuma(this.rut)
      }
      
    )


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

}
