import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/services/create-user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User = {
    rut:'',
    password:'',
  }

  rut: FormControl;
  pass: FormControl;
  checkbox:FormControl;

  constructor() {
    this.rut = new FormControl('',[
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(10),
      Validators.pattern(/^[0-9].-*$/)
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
        this.user.password = value
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
      console.log(this.rut.value);
      console.log(this.pass.value);
    }
    console.log('envio no valido')
  }

  logIn(data:User){
    if(data.password=='' || data.rut == ''){
      console.log("Ingreso no valido!")
    }
    else{
      console.log(data)
    }
  }
}
