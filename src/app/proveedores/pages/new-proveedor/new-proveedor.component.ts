import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProveedorService, Proveedor } from '../../services/proveedor.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-proveedor',
  templateUrl: './new-proveedor.component.html',
  styleUrls: ['./new-proveedor.component.css'],
})
export class NewProveedorComponent implements OnInit {
  newProveedorForm!: FormGroup;
  proveedorSave!: Proveedor;
  constructor(
    private fb: FormBuilder,
    private proveedorService: ProveedorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newProveedorForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
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
      comentario: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    try {
      this.proveedorSave = {
        nombre: this.newProveedorForm.get('name')!.value,
        nombreContacto: this.newProveedorForm.get('ncontacto')!.value,
        direccion: this.newProveedorForm.get('direccion')!.value,
        telefono: this.newProveedorForm.get('telefono')!.value,
        atencion: this.newProveedorForm.get('atencion')!.value,
        correoAtencion: this.newProveedorForm.get('correoa')!.value,
        retira: this.newProveedorForm.get('retira')!.value,
        numeroGuia: this.newProveedorForm.get('nguia')!.value,
        comentario: this.newProveedorForm.get('comentario')!.value,
      };
      this.proveedorService
        .addNewProveedor(this.proveedorSave)
        .subscribe((res) => {
          if (res.status == 200) {
            Swal.fire({ icon: 'success', text: 'Proveedor creado' });
            this.router.navigate(['/proveedores/lista']);
          }
        });
      console.log('info enviada');
    } catch (error) {
      console.log(error);
    }
  }
}
