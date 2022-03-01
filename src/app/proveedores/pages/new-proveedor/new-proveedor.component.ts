import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-proveedor',
  templateUrl: './new-proveedor.component.html',
  styleUrls: ['./new-proveedor.component.css'],
  // host: {
  //   '(window:resize)': 'onResize($event)',
  // },
})
export class NewProveedorComponent implements OnInit {
  // view: boolean = true;
  // width:number= 0;
  // widthBoolean : boolean = false;
  newProveedorForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.newProveedorForm = this.initForm();

  }

  initForm(): FormGroup{
    return this.fb.group({
      name:['',[Validators.required,]],
      ncontacto:['',[Validators.required]],
      direccion:['',[Validators.required]],
      telefono:['',[Validators.required,Validators.minLength(9),Validators.maxLength(9),Validators.pattern("^[0-9]+")]],
      atencion:['',[Validators.required]],
      correoa:['',[Validators.required]],
      retira:['',[Validators.required]], 
      nguia:['',[Validators.required]], 
      comentario:['',[Validators.required]], 
    })
  }

  onSubmit():void{
    console.log("info enviada")
  }

  // cambiarView() {
  //   this.view = !this.view;
  //   if(this.width <1024) {this.widthBoolean = true;}
  //   else this.widthBoolean = false;
  // }

  // onResize(event: any) {
  //   this.width = event.target.innerWidth;
  // }
}
