import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { res } from '../../auth/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  constructor(private http: HttpClient) {}
  addNewProveedor(data: Proveedor) {
    return this.http.post<res>(environment.baseUrl + '/createProveedor', data);
  }
}
export interface Proveedor {
  nombre: string;
  nombreContacto: string;
  direccion: string;
  telefono: string;
  atencion: string;
  correoAtencion: string;
  retira: string;
  numeroGuia: string;
  comentario: string;
}

