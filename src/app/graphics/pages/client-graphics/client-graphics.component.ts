import { Component, OnInit,ViewChild  } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-client-graphics',
  templateUrl: './client-graphics.component.html',
  styleUrls: ['./client-graphics.component.css']
})
export class ClientGraphicsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor() { }

  ngOnInit(): void {
  }
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    
  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [ 'Juan Larenas', 'Marcelo Estay', 'Maximiliano Espindola', 
    'Juan Larenas', 'Marcelo Estay', 'Maximiliano Espindola',
     ],
    datasets: [
      { data: [ 2000000, 1590000, 800000, 810000, 560000, 55000], label: 'Compras' },
      
    ]
  };
  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 1000000),
      Math.round(Math.random() * 1000000),
      Math.round(Math.random() * 1000000),
      Math.round(Math.random() * 1000000),
      Math.round(Math.random() * 1000000),
      Math.round(Math.random() * 1000000),
     ];

    this.chart?.update();
  }
}
