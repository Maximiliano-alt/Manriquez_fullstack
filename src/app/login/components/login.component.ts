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


  constructor() {
    this.rut = new FormControl();
    this.rut.valueChanges.subscribe(
      value =>{
        console.log(value);
      }
    );
    this.pass = new FormControl();
   }

  ngOnInit(): void {
  }

}
