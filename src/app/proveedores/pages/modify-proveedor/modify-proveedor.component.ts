import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Proveedor, ProveedorService } from '../../services/proveedor.service';
import {finalize} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modify-proveedor',
  templateUrl: './modify-proveedor.component.html',
  styleUrls: ['./modify-proveedor.component.css'],
})
export class ModifyProveedorComponent implements OnInit {
  modifyProveedorForm!: FormGroup;
  proveedorModify!: Proveedor;
  params: any = '';
  nameProveedor: string= "";

  constructor(
    private rutaActiva: ActivatedRoute,
    private fb: FormBuilder,
    private proveedorService: ProveedorService,
    private router: Router
  ) {
    this.params = this.rutaActiva.snapshot.paramMap.get('_id');

  }
  getProveedor() {
    this.proveedorService.getProveedor(this.params).pipe(finalize(()=>this.llenarForm())).subscribe((res) => {
      this.proveedorModify = res['proveedor'];
      this.nameProveedor = this.proveedorModify.nombre;
    });

  }

  ngOnInit(): void {
    this.modifyProveedorForm = this.initForm();
    this.getProveedor();


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
      ncontacto: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9),
          Validators.pattern('^[0-9]+'),
        ],
      ],
      atencion: ['', [Validators.required]],
      correoa: ['', [Validators.required, Validators.email]],
      retira: ['', [Validators.required]],

    });
  }

  llenarForm(){
    this.modifyProveedorForm.patchValue({name: this.proveedorModify.nombre})
    this.modifyProveedorForm.patchValue({rut: this.proveedorModify.rut})
    this.modifyProveedorForm.patchValue({ncontacto: this.proveedorModify.nombreContacto})
    this.modifyProveedorForm.patchValue({direccion: this.proveedorModify.direccion})
    this.modifyProveedorForm.patchValue({telefono: this.proveedorModify.telefono})
    this.modifyProveedorForm.patchValue({atencion: this.proveedorModify.atencion})
    this.modifyProveedorForm.patchValue({correoa: this.proveedorModify.correoAtencion})
    this.modifyProveedorForm.patchValue({retira: this.proveedorModify.retira})
  }

  onUpdate():void{
    try {
      this.proveedorModify = {
        nombre: this.modifyProveedorForm.get('name')!.value,
        rut: this.modifyProveedorForm.get('rut')!.value,
        nombreContacto: this.modifyProveedorForm.get('ncontacto')!.value,
        direccion: this.modifyProveedorForm.get('direccion')!.value,
        telefono: this.modifyProveedorForm.get('telefono')!.value,
        atencion: this.modifyProveedorForm.get('atencion')!.value,
        correoAtencion: this.modifyProveedorForm.get('correoa')!.value,
        retira: this.modifyProveedorForm.get('retira')!.value,

      };
      this.proveedorService
        .updateProveedor(this.proveedorModify, this.params)
        .subscribe((res) => {
          if (res.status == 200) {
            Swal.fire({ icon: 'success', text: 'Datos guardados con exito!!!' });
            this.router.navigate(['/proveedores/lista']);
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
    this.proveedorService.deleteProveedor(this.proveedorModify).subscribe((res)=>{
      if (res.status == 200) {
        Swal.fire({ icon: 'success', text: 'Proveedor Eliminado con exito!!!' });
        this.router.navigate(['/proveedores/lista']);
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

