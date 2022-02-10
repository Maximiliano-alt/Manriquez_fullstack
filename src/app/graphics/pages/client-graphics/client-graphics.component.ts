import { Component, OnInit,ViewChild  } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { GraphicsService,cliente } from '../../services/graphics.service';


@Component({
  selector: 'app-client-graphics',
  templateUrl: './client-graphics.component.html',
  styleUrls: ['./client-graphics.component.css']
})
export class ClientGraphicsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;


  // arrayClientes

  array:cliente[]=[]

  constructor(private service:GraphicsService) { }

  ngOnInit(): void {
    this.traerClientes()
  }
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    
  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [ ], label: 'Compras' },
      
    ]
  };
  


  // metodos para comunicacion con el backend

// metodo para agregar



  traerClientes(){
    this.service.getCliente().subscribe(
      res=>{
        res.clientes.forEach(clientes=>{
          this.array.push(clientes)
        })
        this.ordenar();
      }
      
    )
  }

  ordenar(){
    this.array.sort((a,b)=>a.totalDeCompra - b.totalDeCompra)
    const valorEliminar = this.array.length - 5;
    this.array.splice(0,valorEliminar)
    this.agregar()
  }

  agregar(){
    this.array.forEach(clientes=>{
      this.barChartData.labels?.push(clientes.nombre)
      this.barChartData.datasets[0].data.push(clientes.totalDeCompra)
    })
    
  }

  



}
