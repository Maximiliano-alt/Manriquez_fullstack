import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  button_overlay = 0;

  constructor() { }

  ngOnInit(): void {
  }

  button_overlay_methods(valor:number){
    this.button_overlay = valor;
    console.log(this.button_overlay)
  }

}
