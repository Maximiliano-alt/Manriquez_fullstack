import { Component, OnInit } from '@angular/core';
import { PendientesService } from '../../service/pendientes.service';
@Component({
  selector: 'app-list-pendientes',
  templateUrl: './list-pendientes.component.html',
  styleUrls: ['./list-pendientes.component.css']
})
export class ListPendientesComponent implements OnInit {

  array = [1,2,3,4,5,6,7,8,9,10,11,12,13]
  constructor(private service: PendientesService) { }

  ngOnInit(): void {
    this.getPendientes()
  }

  getPendientes(){
    
  }

}
