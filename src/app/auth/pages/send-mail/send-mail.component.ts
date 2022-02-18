import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements OnInit {

  user = {
    rut:"",
    email:"",
    validators:1
  }

  codigo = ""  //codigo de validacion

  passForm = {
    pass:"",
    repass:"",
    rut:"",
  }

  email:FormControl;
  rut:FormControl;
  pass:FormControl;
  rePass:FormControl;

  constructor(private service:AuthService,private router:Router) { 
    this.email = new FormControl('',[
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]);
    this.email.valueChanges.subscribe(
      value =>{
       this.user.email  = value
      }
    );

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

    this.pass = new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^[A-Z].*[a-z].[0-9].*$/)
    ]);
    this.pass.valueChanges.subscribe(
      value =>{
        this.passForm.pass = value
      }
    );
    this.rePass = new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^[A-Z].*[a-z].[0-9].*$/)
    ]);
    this.pass.valueChanges.subscribe(
      value =>{
        this.passForm.pass = value
      }
    );
  }
  indicador:number= 0;
  ngOnInit(): void {
    var aux =  JSON.parse(localStorage.getItem('validateContrasenia') || '{}')
    this.indicador = aux.validators
    this.user.email = aux.email
    this.user.rut = aux.rut
    if(this.indicador == undefined){
      this.indicador = 0
    }
  }

  sendMail(){
    if(this.email.valid && this.rut.valid){
      this.service.sendMail({rut:this.rut.value,pass:this.email.value}).subscribe(
        res=>{
          if(res.status == 200){
            Swal.fire({icon: 'success',text: 'El codigo se envio verifica el correo que nos diste'})
            this.indicador = 1;
            localStorage.setItem('validateContrasenia',JSON.stringify(this.user))
          }
        }
      )
    }
  }


  enviarCodigo(){
    if(this.codigo == ""){
      Swal.fire({icon: 'warning',title: 'Oops...',text: 'Codigo invalido '});
    }
    else{
      this.service.saveCodigoValidacion(this.user.rut,this.codigo).subscribe(
        res=>{
          if(res.status==200){
            Swal.fire({icon: 'success',text: 'Codigo correcto! Cambia tu contraseña y pon una que recuerdes'})
            this.indicador = 2;
          }
        }
      )
    }
  }

  modificarPass(){
   if(this.pass.valid && this.rePass.valid && this.pass.value == this.rePass.value){
    this.service.modifyPassword(this.user.rut,this.pass.value).subscribe(
      res=>{
        if(res.status==200){
          Swal.fire({icon: 'success',text: 'Tu contraseña fue cambiada exitosamente!'})
          localStorage.removeItem('validateContrasenia')
          this.router.navigate(['/auth/login'])
        }
        else{
          Swal.fire({icon: 'warning',title: 'Oops...',text: 'Intenta mas tarde  '});

        }
      }
    )
   }
  }


}
