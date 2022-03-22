import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductsService ,product, categoria} from '../../services/products.service';

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
    unidadMedida:"",
    vecesComprado:0,
  }
  categorias:categoria[]=[]

  constructor( private route:ActivatedRoute,private router:Router,private service: ProductsService) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getProduct()
    this.getCategoria()

  }

  getCategoria(){
    this.service.getCategoria().subscribe(
      (res:any)=>{
        res.map((cat:categoria)=>{this.categorias.push(cat)})
      }
    )
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
    this.service.deleteProduct(value).subscribe(
      (res:any)=>{
        if(res.status == 200){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Eliminado exitosamente',
            showConfirmButton: false,
            timer: 2000
          })
          this.router.navigate(['/productos/products-category'])
        }
        else if(res.status == 500){
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'El producto no fue eliminado',
            showConfirmButton: false,
            timer: 2000
          })
          this.router.navigate(['/productos/products-category'])
        }
      })
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
            this.router.navigate(['/productos/products-category/',this.newProducto.categoria])
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
