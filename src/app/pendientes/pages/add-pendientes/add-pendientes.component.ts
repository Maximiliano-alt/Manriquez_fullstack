import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PendientesService, pendiente } from '../../service/pendientes.service';
@Component({
  selector: 'app-add-pendientes',
  templateUrl: './add-pendientes.component.html',
  styleUrls: ['./add-pendientes.component.css']
})
export class AddPendientesComponent implements OnInit {


  newPendiente:pendiente = {
    tipo:'',
    observacion:'',
    fecha: 0, 
  } 

  constructor(private service: PendientesService, private router: Router) { 




  }

  ngOnInit(): void {
  }



  

  addPendiente(){
    if(this.newPendiente.fecha != 0 && 
      this.newPendiente.observacion != ''&&
      this.newPendiente.tipo != ''){
        this.newPendiente.fecha = new Date(this.newPendiente.fecha).getTime();
        
        
        this.service.addPendiente(this.newPendiente).subscribe(
          (res:any)=>{
            if(res.status == 200){
              Swal.fire({
                title: '',
                text: 'Ingreso correcto',
                icon: 'success',
              })
              this.newPendiente = {
                tipo:'',
                observacion:'',
                fecha: 0, 
              } 
            }
          }
        )
      }
  }


}
