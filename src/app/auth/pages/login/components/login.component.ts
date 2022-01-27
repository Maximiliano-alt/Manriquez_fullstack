import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rut: FormControl;
  pass: FormControl;
  checkbox:FormControl;

  constructor() {
    this.rut = new FormControl('',[
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(10)
    ]);
    this.rut.valueChanges.subscribe(
      value =>{
        console.log(value);
      }
    );
    this.pass = new FormControl('',[//20636614-1
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^[a-zA-Z0-9]*$/)
    ]);
    this.pass.valueChanges.subscribe(
      value =>{
        console.log(value);
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
}
