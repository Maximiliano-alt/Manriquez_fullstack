import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';



@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit { 

  limitador = 0;
  indice_espera = this.limitador;
  inicio_slice = 0;
  index_aux = 0;
  resto=0;
  final = 0;


  inicio:any=0;


  segmento:any=[]

  @Input()
  input:any ={
    indicador:'',
    data:<any>[]
  }

  constructor() {

    // primero aseguramos cada uno de los indices para nuestra lista
    // cada uno de ellos seran los elementos que tenemos que
    // agregar en una lista




  }

  ngOnInit(): void {
    console.log(this.input.data[0].rut)
    if(this.input.indicador == 'clientes' ||
    this.input.indicador == 'pendientes' ||
    this.input.indicador == 'proveedores')
    {
      this.limitador = 6;
      this.indice_espera = this.limitador
    }

    else{
      this.limitador = 4;
      this.indice_espera = this.limitador
    }


    this.resto = this.input.data.length%this.limitador //elementos que quedan por recorrer
    

    this.nf_for_next()
  

  }



  nf_for_next():number{
    var aux = this.segmento;
    this.segmento = [];


    if(this.inicio_slice == (this.input.data.length - this.resto) && this.resto != 0){

      for (let index = (this.input.data.length-this.resto); index < this.input.data.length; index++) {
        if(this.input.data[index]!=undefined){
          this.segmento.push(this.input.data.find((element:any)=>element==this.input.data[index])!) 
        }

      }

      return 0;
    }
    else{

      // recorremos del principio hasta llegar al resto

      if(this.resto == 0 && this.indice_espera == this.input.data.length+this.limitador){

        this.segmento = aux;
        return 0;
      }
      else{
       
        for (let index = this.inicio_slice; index < this.indice_espera; index++) {
          if(this.input.data[index]!=undefined){
            this.segmento.push(this.input.data.find((element:any)=>element==this.input.data[index])!) 
          }
  
        }
        //aniadimos 6 unidades par poder recorrer el ng-for con 6 ventas
       if(this.indice_espera<this.input.data.length){
        this.indice_espera = this.indice_espera + this.limitador;
        this.inicio_slice = this.inicio_slice + this.limitador;
       }

        return 1;
      }

    }




  }


  nf_for_preview():any{
    var aux = this.segmento;
    this.segmento = [];


    if(this.indice_espera -this.limitador <=0){
      this.segmento = aux;
      return 0;
    }
    else{
      this.inicio_slice = this.inicio_slice - this.limitador;
      this.indice_espera = this.indice_espera -this.limitador;
      for (let index = this.inicio_slice; index < this.indice_espera; index++) {
        this.input.data.find((element:any)=>{
          if(element==this.input.data[index]){
            this.segmento.push(element)
          }
        })

      }
      return 1;
    }


  }


}
