import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit,ViewChild } from '@angular/core';
import { GraphicsService,producto ,categoria} from 'src/app/graphics/services/graphics.service';



@Component({
  selector: 'app-productos-graphics',
  templateUrl: './productos-graphics.component.html',
  styleUrls: ['./productos-graphics.component.css']
})
export class ProductosGraphicsComponent implements OnInit {
 

  constructor(private service: GraphicsService) { }
  aviso:number = 0
  click:number = 0
  return:number = 0
  
  listaProductos: producto[] = []; //lista de productos
  listaCategorias :categoria[]=[]
  ngOnInit(): void {
    this.getCategoria()
    
  }


 

  getCategoria(){
    this.listaCategorias=[]
    this.service.getCategoria().subscribe(
      res=>{
        res.forEach((e)=>{
          this.listaCategorias.push(e)
        })
      }
    )
  }


  //traemos los productos
  getProductos(data:string){
    this.aviso = 0;
    this.click = 1;
    this.return = 0;
    this.listaProductos.splice(0,this.listaProductos.length); //lista de productos
    this.service.getProductosForCategory(data).subscribe(
      res=>{
        if(res.length == 0){
          this.return = 2;
        }
        
        res.forEach((e)=>{
          this.listaProductos.push(e);  
          this.ordenacionMayorAMenor(res.length)
          .then((data)=>{if(data==1){
            
          }})   
        })
        
      }
    )
  } 


  //ordenamos la lista de mayor a menor
  ordenacionMayorAMenor(largo:number){
    return new Promise((resolve,reject)=>{
      if(this.listaProductos.length != largo){
        
      }
      else{
        for (let index1 = 0; index1 < this.listaProductos.length; index1++) {
          
          for (let index2 = 0; index2 < this.listaProductos.length; index2++) {
            var a = this.listaProductos[index1].vecesComprado;
            var b = this.listaProductos[index2].vecesComprado;
            if(a>b){
              var aux = this.listaProductos[index1];
              this.listaProductos[index1] = this.listaProductos[index2];
              this.listaProductos[index2] = aux
    
            }
            
          }
          
        }
        this.aviso = 1;
        this.click = 0;
       
        
      }
      resolve(1)
    })
    
   
  }




 
  

}
