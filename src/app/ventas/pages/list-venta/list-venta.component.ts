import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { VentasService,venta } from '../../services/ventas.service';
@Component({
  selector: 'app-list-venta',
  templateUrl: './list-venta.component.html',
  styleUrls: ['./list-venta.component.css']
})
export class ListVentaComponent implements OnInit {
  estado="pagado";
  indice_espera = 4;
  inicio_slice = 0;
  index_aux = 0;
  resto=0;
  final = 0;
  array:venta[]=[]

  inicio:any=0;


  segmento:any=[]
  constructor(private servicio: VentasService) { }

  ngOnInit(): void {
    this.resto = this.array.length%4
    this.getVentas()
  }


  getVentas(){
    this.servicio.getVenta().subscribe(
      res=>{
        
        res.forEach((e)=>{
          this.array.push(e)
         
          if(this.array.length == res.length){
            this.nf_for_next()
            
          }
        })
      }
    )
  }


  nf_for_next():any{
    var aux = this.segmento;
    this.segmento = [];


    if(this.inicio_slice == (this.array.length - this.resto) && this.resto != 0){

      for (let index = (this.array.length-this.resto); index < this.array.length; index++) {
        this.segmento.push(this.array.find(element=>element==this.array[index])) 
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
          this.segmento.push(this.array.find(element=>element==this.array[index])) 
          
        }
        //aniadimos 4 unidades par poder recorrer el ng-for con 4 ventas
        this.indice_espera = this.indice_espera + 4;
        this.inicio_slice = this.inicio_slice + 4;  
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
        this.segmento.push(this.array.find(element=>element==this.array[index])) 
        
      }
      return 1;
    }
    
   
  }


}
