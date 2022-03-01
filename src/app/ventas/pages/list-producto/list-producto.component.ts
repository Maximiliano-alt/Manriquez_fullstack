import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VentasService,producto, productoComprado } from '../../services/ventas.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-producto',
  templateUrl: './list-producto.component.html',
  styleUrls: ['./list-producto.component.css']
})
export class ListProductoComponent implements OnInit {
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
  
  constructor( private router:Router, private route: ActivatedRoute,private service: VentasService) {
    this.id = this.route.snapshot.paramMap.get('id')

  }



 


  ngOnInit(): void {
    this.resto = this.array.length%4
    // this.nf_for_next();
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
          this.getData()
        
        }
        else{
          Swal.fire({
            title: 'Error!',
          text: 'No se pudo eliminar el producto',
          icon: 'error',})
        }
        
      }
    )
  }

  getData(){
    this.service.getProductoForId(this.id).subscribe(
      res=>{
        console.log(res)
        res.forEach((e:productoComprado)=>{
          this.array.push(e)
          if(this.array.length == res.length){
            this.nf_for_next()
          }
        })
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

}
