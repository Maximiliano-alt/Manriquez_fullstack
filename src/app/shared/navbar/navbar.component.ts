import { Component, OnInit,EventEmitter,Input,Output } from '@angular/core';
import { Router } from '@angular/router';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  

  @Input()
  var:any={
    route:"",
    title:"",
    category:""
  }
  
  @Output()
  emit: EventEmitter<any> = new EventEmitter();

  constructor(private router:Router){

  }

  logOut(){
    localStorage.removeItem('_pipo')
    this.router.navigate(['/'])
  }
}
