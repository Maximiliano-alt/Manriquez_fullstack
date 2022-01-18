import { Component, OnInit } from '@angular/core';
import { CreateUserService,User } from 'src/app/services/create-user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor(private newService: CreateUserService) { }

  user:User={
    rut:"New User",
    password:"Password"
  }

  ngOnInit(): void {
    this.crearUsuario(this.user);
  }

  crearUsuario(user:User){
    this.newService.crearUsuario(user).subscribe(
      res=>{
        if(res.status==200){
          console.log(res.mensaje);
        }
        else{
          console.log(res.mensaje);
        }
      }
    ) 
  }

}
