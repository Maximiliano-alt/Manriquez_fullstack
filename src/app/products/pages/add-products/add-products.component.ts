import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { product,ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  product:product = {
    nombre: "",
    valor: 0,
    descripcion:"",
    categoria:"",
    stock:0,
    vecesComprado:0,
    color: "",
    imagen: "",
    
  }


  name: FormControl;
  price: FormControl;
  color:FormControl;
  stock:FormControl;
  category:FormControl;
  description:FormControl;


  constructor(private service:ProductsService, private router:Router) {
    //nombre
    this.name = new FormControl('',[
      Validators.required,
    ]);
    this.name.valueChanges.subscribe(
      value =>{
        this.product.nombre = value
      }
    );

    //precio
    this.price = new FormControl('',[
      Validators.required,
      Validators.pattern(/^[0-9]*$/)
    ]);
    this.price.valueChanges.subscribe(
      value =>{
        this.product.valor = value
      }
    );

    //color
    this.color = new FormControl('',[
      Validators.required,
    ]);
    this.color.valueChanges.subscribe(
      value =>{
        this.product.color = value
      }
    );

    //stock
    this.stock = new FormControl('',[
      Validators.required,
      Validators.pattern(/^[0-9]*$/)
    ]);
    this.stock.valueChanges.subscribe(
      value =>{
        this.product.stock = value
      }
    );

    //categoria
    this.category = new FormControl('',[
      Validators.required
    ]);
    this.category.valueChanges.subscribe(
      value =>{
        this.product.categoria = value
      }
    );

    //descripcion
    this.description = new FormControl('',[
      Validators.required,
    ]);
    this.description.valueChanges.subscribe(
      value =>{
        this.product.descripcion = value
      }
    );


  }

  ngOnInit(): void {
  }

  createProduct(data:product){

    if(this.name.valid && this.price.valid && this.color.valid && this.stock.valid && this.category.valid && this.description.valid ){
      this.service.addProduct(data).subscribe(
        res =>{
          if(res.status==200){
            Swal.fire({icon: 'success',text: 'Producto creado'})
            this.router.navigate(['/productos/products-category'])
          }
          else if(res.status==500){
            Swal.fire({icon: 'warning',title: 'Oops...',text: 'Problema al crear el producto'});
          }
          else{
            Swal.fire({icon: 'warning',title: 'Oops...',text: 'Problema al crear el producto'});
          }
        }
      )


    }
  }
  
  onFileChanges(event: any): void {
    this.product.imagen = event[0].base64;
    console.log(this.product.imagen)
  }
}
