import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CounterServiceService {

  constructor(private http:HttpClient) { }
  addCounter(tipo:string, valor:any){
    return this.http.put<any>(environment.baseUrl+'/update/contador/'+tipo+'/'+valor,{});// /update/contador/:tipo/:valor
  }
  getCounter(tipo:string){
    return this.http.get<any>(environment.baseUrl+'/get/contador/'+tipo);
  }
}
