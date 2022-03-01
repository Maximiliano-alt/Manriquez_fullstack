import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService,product } from '../../services/products.service';
@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.css']
})
export class HomeProductsComponent implements OnInit {
  array=[1,2,3,4,5,6,7,8,9,10,11,12,13]
  // array : product[] = []


  categoria:any
  constructor(private router: Router,private route: ActivatedRoute,private service:ProductsService) { 
    this.categoria = this.route.snapshot.paramMap.get('categoria');
 
  }

  ngOnInit(): void {
    // this.getProduct()
  }

  // getProduct(){
  //   this.service.getProduct(this.categoria).subscribe(
  //     res=>{
      
  //       res.forEach((e:product)=>{
  //         this.array.push(e);
  //       })   
  //     }
  //   )
  // }

}
