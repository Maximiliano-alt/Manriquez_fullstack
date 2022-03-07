import { Component, OnInit } from '@angular/core';
import { Proveedor, ProveedorService } from '../../services/proveedor.service';
import Swal from 'sweetalert2';
import { FilterProveedoresPipe } from '../../pipe/filter-proveedores.pipe';
@Component({
  selector: 'app-proveedores',
  templateUrl: './list-proveedores.component.html',
  styleUrls: ['./list-proveedores.component.css'],
})
export class ListProveedoresComponent implements OnInit {
  array: Proveedor[] = [];
  arrayAux: Proveedor[] = [];
  estadoDeSearch: number = 1;
  filterProveedores: any;

  constructor(
    private proveedorService: ProveedorService,
    private filterProveedor: FilterProveedoresPipe
  ) {}

  ngOnInit(): void {
    this.getListProveedores();
    this.arrayAux = this.array;

    
  }

  getListProveedores(): void {
    this.proveedorService.getAllProveedores().subscribe((res) => {
      if (res.length == 0) {
        Swal.fire({
          title: '',
          text: 'No hay proveedores ingresados en el sistema, ingresa una en el boton +',
          icon: 'warning',
        });
      } else {
        res['proveedores'].forEach((element: any) => {
          this.array.push(element);
        });
      }
    });
  }

  search(value: number) {
    this.arrayAux = this.filterProveedor.transform(this.array, this.filterProveedores);
    if (this.estadoDeSearch == 1) {
      this.estadoDeSearch = value;
      setTimeout(() => {
        this.estadoDeSearch = 1;
      }, 1);
    }
  }
}
