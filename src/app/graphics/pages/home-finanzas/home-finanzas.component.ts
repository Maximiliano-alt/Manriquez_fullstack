import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GraphicsService,Gasto,finanzas } from '../../services/graphics.service';


@Component({
  selector: 'app-home-finanzas',
  templateUrl: './home-finanzas.component.html',
  styleUrls: ['./home-finanzas.component.css']
})
export class HomeFinanzasComponent implements OnInit {
  gastoId= 0;
  constructor(private service:GraphicsService) { }
  tipoAux=""

  newFinanzas:finanzas={
    estadoFinanciero:0,
    ganancias:0,
    gastos:[],
    totalGastos:0,
  }

  newGasto:Gasto ={
    tipo:"",
    total:0
  }

  ngOnInit(): void {
    this.getFinanzas()

  }


  add_gasto(){
    this.gastoId = 1;
    
  }
  sendGasto():number{
    

    // error
    if(this.newGasto.tipo=="" || this.newGasto.total == 0){
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Revisa los datos ingresados',
        showConfirmButton: false,
        timer: 2000
      })
      return 0;
    }

    if(this.newGasto.tipo == "Otro" && this.tipoAux==""){
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Revisa los datos ingresados',
        showConfirmButton: false,
        timer: 2000
      })
      return 0;
    }

    else{

      if(this.newGasto.tipo == "Otro"){
        //la data de aux
        var tipo = this.tipoAux;
        var total = this.newGasto.total
        this.service.addGasto({tipo,total}).subscribe(
          (res:any)=>{
            if(res.status == 200){
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se ingreso correctamente!',
                showConfirmButton: false,
                timer: 2000
              })
            }
            else if(res.status != 200){
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Intenta mas tarde :(',
                showConfirmButton: false,
                timer: 2000
              })
            }
          }
        )
        
      }
      else if(this.newGasto.tipo != "" && this.newGasto.tipo != "Otro"){
        //la data de la variable gasto
        var tipo = this.newGasto.tipo;
        var total = this.newGasto.total
        this.service.addGasto({tipo,total}).subscribe(
          (res:any)=>{
            if(res.status == 200){
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se ingreso correctamente!',
                showConfirmButton: false,
                timer: 2000
              })
            }
            else if(res.status != 200){
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Intenta mas tarde :(',
                showConfirmButton: false,
                timer: 2000
              })
            }
          }
        )
      }

      
      this.gastoId = 0;
    } 
    return 1
  }
  close(){
    this.gastoId = 0;
  }

  getFinanzas(){
    this.service.getFinanzas().subscribe(
      (res:any)=>{
        if(res.data){
          this.newFinanzas = res.data
          this.newFinanzas.estadoFinanciero = this.newFinanzas.ganancias-this.newFinanzas.totalGastos
          console.log(this.newFinanzas)
        }
      }
    )
  }
}
