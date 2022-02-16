import { Component, OnInit } from '@angular/core';

import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { GraphicsService,ventas} from '../../services/graphics.service';


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
    this.service.getVentas().subscribe(
      res=>{
        res.data.forEach( element => {
          this.listVentas.push(element)
        });
      }
    )
  }

  goGraphicsRange(dateIn:Date,dateOut:Date,data:ventas[]){
    var aux = this.service.goGraphicsRange(dateIn,dateOut,data)
    if(aux == null){
      this.alertaDate = 1;
    }
    if(aux != null){
      aux.forEach(element => {
        console.log(new Date(element.fecha))
      });
    }
    
  }

  armarGraficaMes(){
    const data = Date.now()
    var dataLetra = new Date(data)
    var spliter = dataLetra.toString().split(" ")
    var anio = spliter[3]

    this.creacionGrafica = 1
    this.listVentas.forEach( e=>{
      const anioData = (new Date(e.fecha).toString().split(" ")[3])
      
      if(anio == anioData){
        this.arrojaNombreMes(e.fecha,e.totalDeVenta)    
      } 
    })
    
  }

  async arrojaNombreMes(data:number,valor:number){
    
    const dataNew = new Date(data)
    const spliter = dataNew.toString().split(" ")  
    console.log(spliter)
    const mes = spliter[1]
    this.agregarData(mes,valor)
  }


  agregarData(mes:string,valor:number){
    // sacamos el index del valor que vamos a introducir
    const index = this.barChartData.labels?.indexOf(mes)
    
    if(index!>=0){
    
      // se encontro el valor (Esta!)
      this.barChartData.datasets[0].data[index!] = this.barChartData.datasets[0].data[index!]+valor
    }
    else if(index == -1){
      
      this.barChartData.labels?.push(mes);
      this.barChartData.datasets[0].data.push(valor)
    }
    
   
  }


}
