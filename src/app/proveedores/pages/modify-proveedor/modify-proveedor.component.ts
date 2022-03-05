import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Proveedor, ProveedorService } from '../../services/proveedor.service';
import {finalize} from 'rxjs/operators';
@Component({
  selector: 'app-modify-proveedor',
  templateUrl: './modify-proveedor.component.html',
  styleUrls: ['./modify-proveedor.component.css'],
})
export class ModifyProveedorComponent implements OnInit {
  modifyProveedorForm!: FormGroup;
  proveedorModify!: Proveedor;
  params: any = '';

  constructor(
    private rutaActiva: ActivatedRoute,
    private fb: FormBuilder,
    private proveedorService: ProveedorService
  ) {
    this.params = this.rutaActiva.snapshot.paramMap.get('_id');

  }
  getProveedor() {
    this.proveedorService.getProveedor(this.params).pipe(finalize(()=>this.llenarForm())).subscribe((res) => {
      this.proveedorModify = res['proveedor'];
      console.log(this.proveedorModify);       
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
      nguia: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[0-9]+'),
        ],
      ],
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
    this.modifyProveedorForm.patchValue({nguia: this.proveedorModify.numeroGuia})


  }
}
