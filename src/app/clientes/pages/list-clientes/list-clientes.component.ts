import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-clientes',
  templateUrl: './list-clientes.component.html',
  styleUrls: ['./list-clientes.component.css']
})
export class ListClientesComponent implements OnInit {
  id:any
  estado="pagado";
  indice_espera = 6;
  inicio_slice = 0;
  index_aux = 0;
  resto=0;
  final = 0;
  array=[
    1,2,3,4,5,6,7,8,9,10,11,12,13,
  ]

  inicio:any=0;


  segmento:any=[]
  constructor() { }

  ngOnInit(): void {
    this.resto = this.array.length%6
    this.nf_for_next();
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

      if(this.resto == 0 && this.indice_espera == this.array.length+6){
        
        this.segmento = aux;
        return 0;
      }
      else{
        for (let index = this.inicio_slice; index < this.indice_espera; index++) {
          this.segmento.push(this.array.find(element=>element==this.array[index])) 
          
        }
        //aniadimos 6 unidades par poder recorrer el ng-for con 6 ventas
        this.indice_espera = this.indice_espera + 6;
        this.inicio_slice = this.inicio_slice + 6;  
        return 1;
      }
    }
    
    
  
      
  }
  
  nf_for_preview():any{
    var aux = this.segmento;
    this.segmento = [];
    
    
    if(this.indice_espera -6 <=0){
      this.segmento = aux;
      return 0;
    }
    else{
      this.inicio_slice = this.inicio_slice - 6;
      this.indice_espera = this.indice_espera -6;
      for (let index = this.inicio_slice; index < this.indice_espera; index++) {
        this.segmento.push(this.array.find(element=>element==this.array[index])) 
        
      }
      return 1;
    }
    
   
  }

}
