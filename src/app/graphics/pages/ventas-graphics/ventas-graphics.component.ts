import { Component, OnInit } from '@angular/core';

import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { GraphicsService,ventas } from '../../services/graphics.service';




@Component({
  selector: 'app-ventas-graphics',
  templateUrl: './ventas-graphics.component.html',
  styleUrls: ['./ventas-graphics.component.css']
})
export class VentasGraphicsComponent implements OnInit {

  valueIn!: Date;
  valueOut!: Date;
  numberDate:number=0;
  alertaDate = 0;
  creacionGrafica = 0;
  listVentas:ventas[] = []
  ordenGrafica:any [] = []
  constructor(private service: GraphicsService) { }
  
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };

  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [ ], label: 'Total de ventas' },
      
    ]
  };


  ngOnInit(): void {
   this.getVentas()
  }

  valueM():number|undefined{
    const dateIn = new Date(this.valueIn)
    const dateOut = new Date(this.valueOut)
    
    if(dateIn.getTime() >dateOut.getTime() || 
      dateIn.getTime()>Date.now() || 
      dateOut.getTime()>Date.now() ||
      this.valueIn==undefined || 
      this.valueOut==undefined ||
      dateIn.getTime() == dateOut.getTime()
      
    ){
      this.alertaDate = 1;
      this.creacionGrafica = 0;
      return 0;
    }
    else{
      this.alertaDate = 0
      this.armarGraficaMes();
      
     
    }
    
    
    return 1
  }


  getVentas(){
    this.service.getVentas().subscribe(
      res=>{
        res.data.forEach(element => {
          this.listVentas.push(element)
        });
      }
    )
  }

  armarGraficaMes(){
    this.listVentas.forEach(e=>{
      this.arrojaNombreMes(e.fecha,e.totalDeVenta)
    })
    this.creacionGrafica = 1;
  }

  arrojaNombreMes(data:number,valor:number){
    const dataNew = new Date(data)
    const spliter = dataNew.toString().split(" ")  
    const dia = spliter[2]
    const mes = spliter[1]
    this.agregarData(mes,valor)
  }


  agregarData(mes:string,valor:number){
    this.barChartData.labels?.push(mes);
    this.barChartData.datasets[0].data.push(valor)

    console.log(
      this.barChartData.labels
    )
  }


}
