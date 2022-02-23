import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.css']
})
export class HomeProductsComponent implements OnInit {
  array=[1,2,3,4,5,6,7,8,9,10,11,12,13]

  constructor() { }

  ngOnInit(): void {
  }

}
