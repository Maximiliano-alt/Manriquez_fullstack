import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ClienteService } from '../../service/cliente.service';

@Component({
  selector: 'app-modify-cliente',
  templateUrl: './modify-cliente.component.html',
  styleUrls: ['./modify-cliente.component.css']
})
export class ModifyClienteComponent implements OnInit {
  id : any = "";
  constructor(private route: ActivatedRoute, private service: ClienteService, private router:Router) { 
    this.id = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
  }


  delete(){
    this.service.deleteCliente(this.id).subscribe(
      (res:any)=>{
        if(res.status == 200){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Eliminado correctamente',
            showConfirmButton: false,
            timer: 2000
          })
          this.router.navigate(['/clientes'])
        }
        else if(res.status==500){
          if(res.status == 200){
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'No eliminado',
              showConfirmButton: false,
              timer: 2000
            })
            this.router.navigate(['/clientes'])
          }
        }
      }
    )
  }

}
