import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-modify-category',
  templateUrl: './modify-category.component.html',
  styleUrls: ['./modify-category.component.css']
})
export class ModifyCategoryComponent implements OnInit {
  id:any = ""
  newName = ""
  constructor(private route:ActivatedRoute,private router:Router,private service:ProductsService) { 
    this.id = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
  }

  modifyCategoria(){
    this.service.modifyCategory(this.id,this.newName).subscribe(
      (res:any)=>{
        console.log(res)
      }
    )
  }
  deleteCategoria(){
    this.service.deleteCategory(this.id).subscribe(
      (res:any)=>{
        if(res.status == 200){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Categoria eliminada',
            showConfirmButton: false,
            timer: 2000
          })
        }
      }
    )
  }

}
