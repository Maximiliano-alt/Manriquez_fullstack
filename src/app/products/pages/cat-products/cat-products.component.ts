import { Component, OnInit } from '@angular/core';
import { FilterCategoryPipe } from '../../pipe/filter-category.pipe';
import { ProductsService,categoria } from '../../services/products.service';
@Component({
  selector: 'app-cat-products',
  templateUrl: './cat-products.component.html',
  styleUrls: ['./cat-products.component.css']
})
export class CatProductsComponent implements OnInit {
	
  constructor(private service: ProductsService,private filterPipe: FilterCategoryPipe) { }
  filter=""
  estadoDeSearch=1;
  // array = [1,2,3,4,5,6,7,8,9,10,11,12,13]
  array:categoria[]=[]
  arrayAux:categoria[]=[]
  ngOnInit(): void {
    this.getCategoria()
    this.arrayAux = this.array
  }


  getCategoria(){
    this.service.getCategoria().subscribe(
      res=>{
        res.forEach((e:categoria)=>{
          this.array.push(e)
        })
      }
    )
  }


  search(value:number){

    
    this.arrayAux = this.filterPipe.transform(this.array,this.filter);
    
    if(this.estadoDeSearch == 1){
      this.estadoDeSearch = value
      setTimeout(()=>{
        this.estadoDeSearch = 1
      },1)
    } 
  }

}
