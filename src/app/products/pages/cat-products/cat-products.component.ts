import { Component, OnInit } from '@angular/core';
import { ProductsService,categoria } from '../../services/products.service';
@Component({
  selector: 'app-cat-products',
  templateUrl: './cat-products.component.html',
  styleUrls: ['./cat-products.component.css']
})
export class CatProductsComponent implements OnInit {
	
  constructor(private service: ProductsService) { }


  array = [1,2,3,4,5,6,7,8,9,10,11,12,13]
  // array:categoria[]=[]
  ngOnInit(): void {
    // this.getCategoria()
  }


  // getCategoria(){
  //   this.service.getCategoria().subscribe(
  //     res=>{
  //       res.forEach((e:categoria)=>{
  //         this.array.push(e)
  //       })
  //     }
  //   )
  // }

}
