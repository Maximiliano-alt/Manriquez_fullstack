import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductsService ,product} from '../../services/products.service';

@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product.component.html',
  styleUrls: ['./modify-product.component.css']
})
export class ModifyProductComponent implements OnInit {
  indicador = 0;
  id:any="";//aca guardamos el valor que viene por la ruta

  newProducto:product={
    categoria:"",
    color:"",
    descripcion:"",
    imagen:"",
    nombre:"",
    stock:0,
    valor:0,
    vecesComprado:0,
  }
 
  constructor( private route:ActivatedRoute,private router:Router,private service: ProductsService) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct(){
    this.service.getOneProduct(this.id).subscribe(
      (res:any)=>{
        if(res.status==200){
          this.indicador = 1 
          this.newProducto = res.data
        }
      }
    )
  }

  eliminar(value:any){
    console.log(value)
  }

  editar(){
    this.service.modifyProduct(this.id,this.newProducto).subscribe(
      (res:any)=>{
        if(res.status == 200){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.mensaje,
            showConfirmButton: false,
            timer: 2000
          })
          setTimeout(()=>{
            window.location.reload()
          },2000)
        }
        else if(res.status == 500){
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: res.mensaje,
            showConfirmButton: false,
            timer: 2000
          })
        }
      }
    )
  }
  onFileChanges(event: any): void {
    this.newProducto.imagen = event[0].base64;
    console.log(this.newProducto.imagen)
  }

}