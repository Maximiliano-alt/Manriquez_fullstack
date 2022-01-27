import { Component, OnInit,EventEmitter,Input,Output } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input()
  button_overlay:number = 0;

  @Output()
  indicador: EventEmitter<any> = new EventEmitter();

  
  
  button_overlay_methods(valor:number){
    this.button_overlay = valor;
    this.indicador.emit(this.button_overlay);
  }
  
  LogOut(){
    
  }
}
