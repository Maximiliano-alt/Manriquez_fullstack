import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VentasService } from 'src/app/ventas/services/ventas.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-venta-unica',
  templateUrl: './venta-unica.component.html',
  styleUrls: ['./venta-unica.component.css']
})
export class VentaUnicaComponent implements OnInit {
  estado="pagado"; //pendiente o pagado
  id:any="";
  constructor( private router:Router, private route: ActivatedRoute,private service: VentasService) {
    this.id = this.route.snapshot.paramMap.get('id')
  }

  cliente!:any;
  rut!:string
  ventaProductos:any
  dataIndicador  = 0

  ngOnInit(): void {
    this.rut = localStorage.getItem('dataToken') || ""
    this.getClienteAndVenta()
  }

   getClienteAndVenta(){


    this.service.getVentaAndCliente(this.id,this.rut).subscribe(
      (res:any)=>{
        if(res.status==404){
          Swal.fire({
            title: 'Error :(',
            text: 'Usuario no encontrado',
            icon: 'error',
          })
          this.router.navigate(['/clientes/clientes'])
        }
        else{
          this.cliente = res.data
          this.ventaProductos = res.dataVenta
          console.log(this.ventaProductos)
          this.dataIndicador = 1
          this.estado = this.ventaProductos.estado
        }
      }
    )

  }

  ver_producto():number{
    
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
