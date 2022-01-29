import { Component, OnInit,EventEmitter,Input,Output } from '@angular/core';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  

  @Input()
  var:any={
    route:'',
    title:''
  }
  @Output()
  emit: EventEmitter<any> = new EventEmitter();
}
