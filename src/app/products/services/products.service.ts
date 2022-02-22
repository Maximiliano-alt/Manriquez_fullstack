import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

}

export interface product{
  nombre: string,
  valor: number,
  descripcion: string,
  categoria:string,
  stock:number,
  vecesComprado:number,
  color:string,
  imagen:string,
}
