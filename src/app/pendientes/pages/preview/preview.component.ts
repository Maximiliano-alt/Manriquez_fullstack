import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { PendientesService,pendiente } from '../../service/pendientes.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  id : any = ""
  constructor(private router:Router,private route:ActivatedRoute, private service: PendientesService) {
    this.id = this.route.snapshot.paramMap.get('id')
   }

  ngOnInit(): void {
    this.getPendienteForId()
  }

  newPendiente:pendiente={
    tipo:'',
    observacion:'',
    fecha:0
  }

  getPendienteForId(){
    this.service.getPendienteForId(this.id).subscribe(
      (res:any)=>{
        if(res.status == 200){
          this.newPendiente = res.data
        }
        else{
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Este pendiente no fue encontrado!',
            showConfirmButton: false,
            timer: 2000
          })
          setTimeout(()=>{
            this.router.navigate(['/pendientes']);
          },1000)
        }
      }
    )
  }

}
