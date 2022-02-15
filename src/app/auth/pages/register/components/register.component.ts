import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/services/create-user.service';

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

  user:User = {
    rut:'',
    password:'',
  }


  constructor() {
    this.name = new FormControl('',[
      Validators.required,
    ]);
    this.name.valueChanges.subscribe(
      value =>{
        this.user.rut = value
      }
    );

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

    this.email = new FormControl('',[
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]);
    this.email.valueChanges.subscribe(
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
        this.user.password = value
      }
    );

    this.rePass = new FormControl('',[
      Validators.required,
    ]);
    this.rePass.valueChanges.subscribe(
      value =>{
        this.user.password = value
      }
    );
  }

  ngOnInit(): void {
  }

}
