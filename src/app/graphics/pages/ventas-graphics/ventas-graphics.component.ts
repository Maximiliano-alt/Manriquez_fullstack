import { Component, OnInit } from '@angular/core';

import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { GraphicsService,cliente } from '../../services/graphics.service';




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
  constructor() { }
  
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };

  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: ['Junio','Junio','Junio','Junio','Junio'],
    datasets: [
      { data: [ 10000,10000,10000,10000,10 ], label: 'Total de ventas' },
      
    ]
  };


  ngOnInit(): void {
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
    }
    this.creacionGrafica = 1;
    return 1
  }


  
}
