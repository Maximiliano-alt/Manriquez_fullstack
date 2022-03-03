import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PendientesService,pendiente } from 'src/app/pendientes/service/pendientes.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  indicadorPendientes=0;
  button_overlay = 0;

  constructor(private route:Router,private servicePendiente:PendientesService) { }

  ngOnInit(): void {
    this.traerPendientes()
  }

  button_overlay_methods(valor:number){
    this.button_overlay = valor;
  }
  

  traerPendientes(){
    this.servicePendiente.getPendientes().subscribe(
      (res:any)=>{
        res.data.forEach((element:pendiente) => {
          var date = new Date(element.fecha).getTime()
          if(date>= Date.now()){
            this.indicadorPendientes = 1
          }
        });
      }
    )
  }

}
