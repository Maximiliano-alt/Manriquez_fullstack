import { Component, OnInit } from '@angular/core';

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
  array=[
    1,2,3,4,5,6,7,8,9,10
  ]
  segmento:any=[]
  constructor() { }

  ngOnInit(): void {
    this.resto = this.array.length%4;
    console.log(this.resto)
    
  }

  nf_for_next(){
    // this.segmento=[]
    this.segmento=[]  
    this.array.splice(this.inicio_slice,this.indice_espera).forEach(element=>{
      this.segmento.push(element);
      this.array.push(element)
    })
    console.log(this.segmento)
      
    }
    


}
