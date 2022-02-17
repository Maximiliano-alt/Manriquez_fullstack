import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

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
  email:FormControl;
  rut:FormControl;

  constructor(private service:AuthService) { 
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
            this.indicador = 1;
            localStorage.setItem('validateContrasenia',JSON.stringify(this.user))
          }
        }
      )
    }
    
   
  }

}
