import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ClienteService , cliente, ventaCliente } from '../../service/cliente.service';
import { venta } from 'src/app/ventas/services/ventas.service';

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


  // array=[
  //   1,2,3,4,5,6,7,8,9,10,11,12,13,
  // ]

  array:venta[]=[]

  inicio:any=0;

  cliente!:ventaCliente;

  segmento:any=[]
  rut:any
  constructor( private router:Router, private route: ActivatedRoute,private service:ClienteService) {
    this.rut = this.route.snapshot.paramMap.get('id')
   }

  ngOnInit(): void {
    localStorage.setItem('dataToken',this.rut)
    this.resto = this.array.length%4
    // this.nf_for_next();
    this.getCliente()
  }

  getCliente(){
    this.service.getOneClient(this.rut).subscribe(
      (res:any)=>{
        if(res.status == 200){
          this.cliente = res.data
          this.getVentasCliente();
        }
        else{
          Swal.fire({
            title: '',
            text: 'Este usuario no se encuentra',
            icon: 'error',
          })
        }
      }
    )
  }


  getVentasCliente(){
    this.service.getVentasClient(this.rut).subscribe(
      (res:any)=>{
        if(res.historial){
          res.historial.forEach((element:venta) => {
            this.array.push(element);
          });
          if(res.historial.length == this.array.length){
            this.nf_for_next()
          }
        }
        else{
          Swal.fire({
            title: '',
            text: 'Usuario incorrecto!',
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

}
