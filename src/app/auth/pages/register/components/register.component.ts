import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService,user } from 'src/app/auth/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: FormControl;
  rut: FormControl;
  email:FormControl;
  pass:FormControl;
  rePass:FormControl;

  user:user = {
    nombre:"",
    rut:"",
    email:"",
    pass:"",
    validacion:"",
  }


  constructor(private service:AuthService,private router:Router) {
    this.name = new FormControl('',[
      Validators.required,
    ]);
    this.name.valueChanges.subscribe(
      value =>{
        this.user.nombre = value
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

    this.email = new FormControl('',[
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]);
    this.email.valueChanges.subscribe(
      value =>{
        this.user.email = value
      }
    );


    this.pass = new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^[A-Z].*[a-z].[0-9].*$/)
    ]);
    this.pass.valueChanges.subscribe(
      value =>{
        this.user.pass = value
      }
    );

    this.rePass = new FormControl('',[
      Validators.required,

    ]);
    this.rePass.valueChanges.subscribe(
      value =>{
        this.user.pass = value
      }
    );
  }

  ngOnInit(): void {
  }

  register(data:user){
    // name: FormControl;
    // rut: FormControl;
    // email:FormControl;
    // pass:FormControl;
    // rePass:FormControl;

    if(this.name.valid&&
       this.rut.valid&&
       this.email.valid&&
       this.pass.valid &&
       this.rePass.valid &&
       (this.pass.value === this.rePass.value)
       ) {
        this.service.register(data).subscribe(
          res=>{
            if(res.status == 200){
              Swal.fire({icon: 'success',text: 'Agregado con exito'})
              setTimeout(()=>{
                this.router.navigate(['/app'])
              },2000)

            }
            else{
              Swal.fire({icon: 'warning',title: 'Oops...',text: 'Usuario existente'});
            }
          }
        )
    }
  }

}
