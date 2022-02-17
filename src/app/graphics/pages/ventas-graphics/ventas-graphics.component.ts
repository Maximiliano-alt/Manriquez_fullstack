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
    this.barChartData = {
      labels: [],
      datasets: [
        { data: [ ], label: 'Total de ventas' },
        
      ]
    };
    this.alertaDate = 0;
    var aux = this.service.goGraphicsRange(dateIn,dateOut,data)
    if(aux == null){
      
      this.alertaDate = 1;
      this.creacionGrafica = 0
    }
    if(aux != null){
      this.creacionGrafica = 1
      aux.forEach(element => {

        var label = (new Date(element.fecha).toString().split(" "))[1]+'-'+
                    (new Date(element.fecha).toString().split(" "))[2]
        var value = element.totalDeVenta
        this.agregarData(label,value)
      });
    }
    
  }

  goGraphicsHistory(){
    // reiniciamos el grafico!
    this.barChartData = {
      labels: [],
      datasets: [
        { data: [ ], label: 'Total de ventas' },
        
      ]
    };
    this.alertaDate = 0;

    this.listVentas.forEach((e)=>{
      var spliter = new Date(e.fecha).toString().split(" ") //separamos la fecha
      this.agregarData(spliter[3],e.totalDeVenta)
    })
    this.creacionGrafica = 1

  }

  armarGraficaMes(){
    this.barChartData = {
      labels: [],
      datasets: [
        { data: [ ], label: 'Total de ventas' },
        
      ]
    };
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
