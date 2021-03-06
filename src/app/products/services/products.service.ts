import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { res } from 'src/app/auth/service/auth.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  addProduct(data:product){
    return this.http.post<res>(environment.baseUrl+'/newProduct',data)
  }

  getCategoria(){
    return this.http.get<categoria[]>(environment.baseUrl+'/get/categoria')
  }

  getProduct(data:string){
    return this.http.post<product[]>(environment.baseUrl+'/get/producto/category',{data})
  }

  modifyCategory(value:any,newName:any){
    return this.http.post(environment.baseUrl+'/modify/category',{value,newName})
    
  }

  deleteCategory(value:any){
    return this.http.get(environment.baseUrl+'/delete/categoria/'+value)
  }

  addCategoria(value:any){
    return this.http.post(environment.baseUrl+'/add/categoria',value)
  }
  getOneProduct(value:any){
    return this.http.get(environment.baseUrl+'/get/product/'+value);
  }

  modifyProduct(id:any,data:product){
    return this.http.post(environment.baseUrl+'/modifyProduct',data)
  }
  deleteProduct(id:any){
    return this.http.get(environment.baseUrl+'/delete/'+id)
  }

}

export interface product{
  nombre: string,
  valor: number,
  unidadMedida:string,
  descripcion: string,
  categoria:string,
  stock:number,
  vecesComprado:number,
  color:string,
  imagen:string,
}
export interface categoria{
  nombre:string,
}
