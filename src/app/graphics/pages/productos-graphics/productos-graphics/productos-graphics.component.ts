import { Component, OnInit,ViewChild } from '@angular/core';
import { GraphicsService,producto } from 'src/app/graphics/services/graphics.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-productos-graphics',
  templateUrl: './productos-graphics.component.html',
  styleUrls: ['./productos-graphics.component.css']
})
export class ProductosGraphicsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(private service: GraphicsService) { }

  listaProductos: producto[] = []; //lista de productos

  ngOnInit(): void {
    this.getProductos()
  }


  //datasets
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [ ], label: 'Compras' },
      
    ]
  };
  //


  getProductos(){
    this.service.getProductos().subscribe(
      res=>{
        res.forEach((e)=>{
         this.agregarData(e.nombre,e.vecesComprado)
        })
      }
    )
  }


  agregarData(nombre:string,valor:number){

    // sacamos el index del valor que vamos a introducir
    const index = this.barChartData.labels?.indexOf(nombre)
    
    if(index!>=0){
    
      // se encontro el valor (Esta!)
      this.barChartData.datasets[0].data[index!] = this.barChartData.datasets[0].data[index!]+valor
    }
    else if(index == -1){
      
      this.barChartData.labels?.push(nombre);
      this.barChartData.datasets[0].data.push(valor)
    }
    
   
  }

}
