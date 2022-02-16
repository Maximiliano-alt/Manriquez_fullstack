import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-clientes',
  templateUrl: './list-clientes.component.html',
  styleUrls: ['./list-clientes.component.css']
})
export class ListClientesComponent implements OnInit {
  id:any
  estado="pagado";
  array:any=[
    1,2,3,4,5,6,7,8,9,10,11,12,13,
  ]
  constructor() { }

  ngOnInit(): void {
    
  }

  
  
  

}
