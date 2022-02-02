import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-ventas-cliente',
  templateUrl: './ventas-cliente.component.html',
  styleUrls: ['./ventas-cliente.component.css']
})
export class VentasClienteComponent implements OnInit {
  estado="pagado";
  indice_espera = 4;
  inicio_slice = 0;
  index_aux = 0;
  resto=0;
  final = 0;
  array=[
    1,2,3,4,5,6,7,8,9,10,11,12,13,
  ]
  inicio:any=0;


  segmento:any=[]
  categoria:any
  constructor( private router:Router, private route: ActivatedRoute) {
    this.categoria = this.route.snapshot.paramMap.get('id')
    console.log(this.categoria)
   }

  ngOnInit(): void {
    this.resto = this.array.length%4
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
