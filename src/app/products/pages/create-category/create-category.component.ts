import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService,categoria } from '../../services/products.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {


  newCategoria:categoria={
    nombre:"",
  }

  constructor(private service : ProductsService , private router:Router) { }

  ngOnInit(): void {
  }

  addCategoria(){ 
    this.service.addCategoria(this.newCategoria).subscribe(
      (res:any)=>{
        if(res.status == 200){
          setTimeout(()=>{
            this.router.navigate(['/productos/category'])
          },1500)
        }
      }
    )
  }

}
