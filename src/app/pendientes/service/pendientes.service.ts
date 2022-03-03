import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PendientesService {

  constructor(private http: HttpClient) { }

  getPendientes(){
    
  }
  addPendiente(value:pendiente){
    return this.http.post(environment.baseUrl+'/add/pendiente',value);
  }

}



export interface pendiente{
  tipo: string,
  fecha:number,
  observacion:string,
}