import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-venta-unica',
  templateUrl: './venta-unica.component.html',
  styleUrls: ['./venta-unica.component.css']
})
export class VentaUnicaComponent implements OnInit {
  estado="pagado"; //pendiente o pagado
  id:any="";
  constructor( private router:Router, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id')
    console.log(this.id)
   }

  ngOnInit(): void {
  }

  ver_producto():number{
    console.log("ver producto again");
    return 0;
  }
  
  cotizacion():number{
    console.log("crear cotizacion again");
    return 0;
  }
  modificarEstado():number{
    console.log("modificar venta again");
    return 0;
  }
  delete():number{
    console.log("delete venta again");
    return 0;
  }


  
}
