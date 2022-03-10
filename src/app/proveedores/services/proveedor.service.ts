import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { res } from '../../auth/service/auth.service';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  constructor(private http: HttpClient) {}
  addNewProveedor(data: Proveedor) {
    return this.http.post<res>(environment.baseUrl + '/createProveedor', data);
  }

  getAllProveedores(){
    return this.http.get<any>(environment.baseUrl+'/listarProveedores').pipe(

    )
  }
  getProveedor(data:any){

    return this.http.get<any>(environment.baseUrl+'/proveedor/'+ data).pipe(

    )
  }

}
export interface Proveedor {
  nombre: string;
  rut: string;
  nombreContacto: string;
  direccion: string;
  telefono: string;
  atencion: string;
  correoAtencion: string;
  retira: string;

}

