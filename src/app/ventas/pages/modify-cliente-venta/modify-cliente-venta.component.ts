import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { venta, VentasService } from 'src/app/ventas/services/ventas.service';
import Swal from 'sweetalert2';
import { ClienteService,cliente, ventaCliente } from 'src/app/clientes/service/cliente.service';

@Component({
  selector: 'app-modify-cliente-venta',
  templateUrl: './modify-cliente-venta.component.html',
  styleUrls: ['./modify-cliente-venta.component.css']
})
export class ModifyClienteVentaComponent implements OnInit {
  id : any = "";
  nameClient = "";
  modifyClienteForm!: FormGroup;
  clientModify!: cliente;
  nameCliente: string= "";



  constructor(private route: ActivatedRoute, private service: ClienteService, private router:Router,private fb: FormBuilder,private ventaService: VentasService) {
    this.id = this.route.snapshot.paramMap.get('rut')
  }

  ngOnInit(): void {
    this.modifyClienteForm = this.initForm();
    this.getClient();

  }
  initForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      rut: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(10),
          Validators.pattern(/[0-9].-[0-9].*$/),
        ],
      ],
      direccion: ['', [Validators.required]],
      telefono: [
        '',
        [
          Validators.required,
        ],
      ],
      comuna: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      correo: ['', [Validators.required,Validators.email]],

    });
  }
  getClient(){
    // this.service.getOneClient(this.id).subscribe(
    //   (res:any)=>{
    //     console.log(res)
    //   }
    // )
    this.service.getOneClient(this.id).pipe(finalize(()=>this.llenarForm())).subscribe((res:any) => {
      this.clientModify = res.data;
      this.nameClient = this.clientModify.nombre;
    });
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

  llenarForm(){
    this.modifyClienteForm.patchValue({name: this.clientModify.nombre})
    this.modifyClienteForm.patchValue({rut: this.clientModify.rut})
    this.modifyClienteForm.patchValue({direccion: this.clientModify.direccion})
    this.modifyClienteForm.patchValue({comuna: this.clientModify.comuna})
    this.modifyClienteForm.patchValue({telefono: this.clientModify.telefono})
    this.modifyClienteForm.patchValue({correo: this.clientModify.correo})
    this.modifyClienteForm.patchValue({ciudad: this.clientModify.ciudad})
  }

  onUpdate():void{
    try {
      this.clientModify = {
        nombre: this.modifyClienteForm.get('name')!.value,
        rut: this.modifyClienteForm.get('rut')!.value,
        direccion: this.modifyClienteForm.get('direccion')!.value,
        telefono: this.modifyClienteForm.get('telefono')!.value,
        correo: this.modifyClienteForm.get('correo')!.value,
        comuna: this.modifyClienteForm.get('comuna')!.value,
        ciudad: this.modifyClienteForm.get('ciudad')!.value,
      };
      this.service.clientUpdate(this.clientModify, this.id)
        .subscribe((res) => {
          if (res.status == 200) {
            Swal.fire({ icon: 'success', text: 'Cliente Actualizado con exito!!!' });
            this.router.navigate(['/clientes']);
          } else {
            Swal.fire({
              icon: 'warning',
              title: 'Oops...',
              text: 'Sucedio un Error Intententelo nuevamente ',
            });
          }
        });
    } catch (error) {
    }
  }

  onDelete():void{
    this.service.deleteCliente(this.id).subscribe((res:any)=>{
      if (res.status == 200) {
        Swal.fire({ icon: 'success', text: 'Cliente Eliminado con exito!!!' });
        this.router.navigate(['/clientes']);
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Sucedio un Error Intententelo nuevamente ',
        });
      }
    })

  }
}
