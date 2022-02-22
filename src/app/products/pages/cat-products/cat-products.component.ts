import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cat-products',
  templateUrl: './cat-products.component.html',
  styleUrls: ['./cat-products.component.css']
})
export class CatProductsComponent implements OnInit {
	
  constructor() { }
  array = [1,2,3,4,5,6,7,8,9,10,11,12,13]
  ngOnInit(): void {
  }

}
