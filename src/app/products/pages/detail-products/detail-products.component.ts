import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService,product } from '../../services/products.service';

@Component({
  selector: 'app-detail-products',
  templateUrl: './detail-products.component.html',
  styleUrls: ['./detail-products.component.css']
})
export class DetailProductsComponent implements OnInit {
  id:any="";
  indicador = 0;

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

  img = ""

  constructor(private route:ActivatedRoute,private router:Router,private service:ProductsService) { 
    this.id = this.route.snapshot.paramMap.get('id')
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

}
