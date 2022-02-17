import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css'],
})
export class ProveedoresComponent implements OnInit {
  array = [1,2,3,4,5,6,7,8,9,10,11,12,13];

  constructor() {}

  ngOnInit(): void {}
}
