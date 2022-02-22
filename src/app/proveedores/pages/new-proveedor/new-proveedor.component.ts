import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-proveedor',
  templateUrl: './new-proveedor.component.html',
  styleUrls: ['./new-proveedor.component.css'],
  host: {
    '(window:resize)': 'onResize($event)',
  },
})
export class NewProveedorComponent implements OnInit {
  view: boolean = false;
  width:number= 0;
  widthBoolean : boolean = false;
  constructor() {
    this.width = screen.width;
  }

  ngOnInit(): void {}

  cambiarView() {
    this.view = !this.view;
    if(this.width >=1024) {this.widthBoolean = false;}
    else this.widthBoolean = true;  
  }

  onResize(event: any) {
    this.width = event.target.innerWidth;
  }
}
