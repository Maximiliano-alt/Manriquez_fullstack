import { Component, OnInit } from '@angular/core';
import { LoginService , User} from 'src/app/services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  user:User={
    rut:"20068493-1",
    password:"Armada1a1278"
    
  
  }

  ngOnInit(): void {
    this.login(this.user);
  }

  login(user:User){
    //tomamos el usuario ingresado por parametro y se lo pasamos al servicio
    this.loginService.crearUsuario(user).subscribe(
      res=>{//esperamos la respuesta
        if(res.status == 200){//como la respuesta tiene estados 200 singnifica que esta todo bien
          console.log("Ingreso exitoso!");
        }
        else{//se recibe estado 500 por ende quedo la escoba
          console.log(res.mensaje);
        }
      }
    )
  }
}
