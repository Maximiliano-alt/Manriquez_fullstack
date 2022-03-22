import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterProductPipe } from '../../pipe/filter-product.pipe';
import { ProductsService,product } from '../../services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.css']
})
export class HomeProductsComponent implements OnInit {
  // array=[1,2,3,4,5,6,7,8,9,10,11,12,13]
  array : product[] = []
  arrayAux : product[] = []
  estadoDeSearch = 1;
  filter = "";
  categoria:any
  constructor(private router: Router,private route: ActivatedRoute,private service:ProductsService,private filterProduct:FilterProductPipe) {
    this.categoria = this.route.snapshot.paramMap.get('categoria');

  }

  ngOnInit(): void {
    this.getProduct()
    this.arrayAux = this.array

  }

  getProduct(){
    this.service.getProduct(this.categoria).subscribe(
      res=>{
        if(res.length == 0){
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'No existen productos en esta categoria',
            showConfirmButton: false,
            timer: 2000
          })
          setTimeout(()=>{
            this.router.navigate(['/productos'])
          },2000)
        }
        res.forEach((e:product)=>{
          this.array.push(e);
        })
      }
    )
  }

  search(value:number){


    this.arrayAux = this.filterProduct.transform(this.array,this.filter);

    if(this.estadoDeSearch == 1){
      this.estadoDeSearch = value
      setTimeout(()=>{
        this.estadoDeSearch = 1
      },1)
    }




  }

}
