import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { AuthService,userLogin } from 'src/app/auth/service/auth.service';

import { CookieService } from 'ngx-cookie-service';

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

  constructor(private service:AuthService, private cookie: CookieService ) {
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

    
    if(this.rut.valid && this.pass.valid){
      var aux  = this.service.login(data)
      if(aux.status==200){
        console.log(aux.mensaje)
      }
    }
  }
}
