import { Component, OnInit } from '@angular/core';
import { PendientesService } from '../../service/pendientes.service';
@Component({
  selector: 'app-list-pendientes',
  templateUrl: './list-pendientes.component.html',
  styleUrls: ['./list-pendientes.component.css']
})
export class ListPendientesComponent implements OnInit {

  constructor(private service: PendientesService) { }

  ngOnInit(): void {
    this.getPendientes()
  }

  getPendientes(){
    
  }

}
