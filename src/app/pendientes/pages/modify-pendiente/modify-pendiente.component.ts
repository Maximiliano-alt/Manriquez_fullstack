import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PendientesService,pendiente } from '../../service/pendientes.service';

@Component({
  selector: 'app-modify-pendiente',
  templateUrl: './modify-pendiente.component.html',
  styleUrls: ['./modify-pendiente.component.css']
})
export class ModifyPendienteComponent implements OnInit {

  id:any = "";
  indicadorRespuesta = 0
  
  newPendiente:pendiente ={
    fecha:0 ,
    observacion:"",
    tipo:""
  }

  constructor(private route:ActivatedRoute, private router:Router,private service: PendientesService) {
    this.id = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.getPendienteForId()
  }

  getPendienteForId(){
    this.service.getPendienteForId(this.id).subscribe(
      (res:any)=>{
        if(res){
          this.indicadorRespuesta = 1
          this.newPendiente = res.data
        }
        
      }
    )
  }


  deleteOne(value:any){
    this.service.deleteOne(value).subscribe(
      (res:any)=>{
        if(res.status==200){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Eliminacion extiosa!',
            showConfirmButton: false,
            timer: 1000
          })
          this.router.navigate(['/pendientes'])
        }
        else if(res.status==500){
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error al eliminar el pendiente!',
            showConfirmButton: false,
            timer: 1000
          })
          this.router.navigate(['/pendientes'])
        }
      }
    )
  }

  modifyOne(value:any){
    
    
    this.service.updateOne(value,this.id).subscribe(
      (res:any)=>{
        if(res.status==200){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Pendiente actualizado!!',
            showConfirmButton: false,
            timer: 1000
          })
          setTimeout(()=>{
            window.location.reload()
          },2000)
          
        }
      }
    )
  }

}
