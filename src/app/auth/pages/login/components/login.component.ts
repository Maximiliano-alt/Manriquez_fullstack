import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { AuthService,userLogin } from 'src/app/auth/service/auth.service';

import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import {Router} from "@angular/router"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:userLogin = {
    rut:"",
    pass:"",
  }

  rut: FormControl;
  pass: FormControl;
  checkbox:FormControl;

  constructor(private service:AuthService, private cookie: CookieService, private router:Router ) {
    this.rut = new FormControl('',[
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(10),
      Validators.pattern(/[0-9].-[0-9].*$/)
    ]);
    this.rut.valueChanges.subscribe(
      value =>{
        this.user.rut = value
      }
    );
    this.pass = new FormControl('',[//20636614-1
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^[A-Z].*[a-z].[0-9].*$/)
    ]);
    this.pass.valueChanges.subscribe(
      value =>{
        this.user.pass = value
      }
    );
    this.checkbox = new FormControl();
    this.checkbox.valueChanges.subscribe(
      value =>{
        console.log(value);
      }
    );
  }

  ngOnInit(): void {
    if(localStorage.getItem('_pipo')!= null){
      this.service.validarToken({token:localStorage.getItem('_pipo')}).subscribe(
        res=>{
          if(res.status==200)
          {
            localStorage.setItem('_pipo',res.mensaje)
            this.router.navigate(['/app'])
          }
      }
      )
      
    }
  }
  saveInfo(event:Event){

    event.preventDefault();
    if(this.rut.valid && this.pass.valid){

    }
    else{
      console.log('envio no valido')
    }
  }

  logIn(data:userLogin){
   
    if(this.rut.valid && this.pass.valid ){

      this.service.login(data).subscribe(
        res =>{
          if(res.status==200){
            Swal.fire({icon: 'success',text: 'Inicio de sesión exitoso'})
            this.service.createCookie(res.mensaje,this.checkbox.value)
            this.router.navigate(['/app'])
          }
          else if(res.status==500){
            Swal.fire({icon: 'warning',title: 'Oops...',text: 'contraseña incorrecta '});
          }
          else{
            Swal.fire({icon: 'warning',title: 'Oops...',text: 'Usuario no encontrado'});
          }
        }
      )


    }
  }
}
