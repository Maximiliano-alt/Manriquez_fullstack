import { ThrowStmt } from '@angular/compiler';
import { destroyPlatform, Injectable } from '@angular/core';
import { Img, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { ITable } from 'pdfmake-wrapper';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { cliente, ClienteService } from 'src/app/clientes/service/cliente.service';
import { Proveedor, ProveedorService } from 'src/app/proveedores/services/proveedor.service';
import { VentasService, servicio } from './ventas.service';
import { HttpClient } from '@angular/common/http';
import { RouterLinkWithHref } from '@angular/router';

interface venta{
  id_Venta: number, //valor automatico en hora minuto segundo y fecha
    cliente: {
        nombre: string,
        apellidos: string,
        direccion: string,
        comuna:string,
        ciudad:string,
        telefono: string,
        correo: string,
        rut: string,
    }, //son objectos de Cliente
    estado: string,
    productos:productoComprado[], //son objectos de productos
    fecha: number, //valor automatico en hora minuto segundo y fecha
    servicios:servicio[],
    porcentaje: number,
    totalDeVenta:number,
    envio:string,
    proveedor:{
      nombre: string;
      rut: string;
      nombreContacto: string;
      direccion: string;
      telefono: string;
      atencion: string;
      correoAtencion: string;
      retira: string;
    },
    comentario:string
}
interface productoComprado{
  nombre: String,
  valor: number,
  unidadMedida:String,
  descripcion: String,
  cantidad:number,
}
type TableRow = [number,number,string,string,number,number]
type TableRowServices = [string,number]
@Injectable({
  providedIn: 'root'
})
export class PdfService {
  infoData:any;
  dateTime: Date;
  year = 2022;
  countCot = 1;
  countNote = 1;
  proveedorService: ProveedorService;
  ventasService:VentasService;
  clienteService:ClienteService;
  lengthService:any;
  proveedor:Proveedor ={
    nombre: "",
    rut: "",
    nombreContacto: "",
    direccion: "",
    telefono: "",
    atencion: "",
    correoAtencion: "",
    retira: ""
  }
  cliente:cliente = {
    nombre: "",
    direccion: "",
    comuna: "",
    ciudad: "",
    telefono: "",
    correo: "",
    rut: "",
    totalDeCompra:0,
  }
  venta:venta={
    id_Venta: 0, //valor automatico en hora minuto segundo y fecha
    cliente: {
        nombre: '',
        apellidos: '',
        direccion: '',
        comuna:'',
        ciudad:'',
        telefono: '',
        correo: '',
        rut: '',
    }, //son objectos de Cliente
    estado: '',
    productos:[

    ], //son objectos de productos
    fecha: 0, //valor automatico en hora minuto segundo y fecha
    servicios: [],
    porcentaje: 0,
    totalDeVenta:0,
    envio:'',
    proveedor:{
      nombre: '',
      rut: '',
      nombreContacto: '',
      direccion: '',
      telefono: '',
      atencion: '',
      correoAtencion: '',
      retira: '',
    },
    comentario:''
  }
  constructor(proveedorService:ProveedorService,ventasService:VentasService,clienteService:ClienteService) {
    this.proveedorService = proveedorService;
    this.ventasService = ventasService;
    this.clienteService = clienteService;
    this.dateTime = new Date();
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
   }
   ngOnInit(){

   }
   counter = 0;
   descuento = 0;
   originPosition = 370;
   rowHeight = 25;
   fontSizeData = 10
  transformMonth(date: Date):string {
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return monthNames[date.getMonth()];
  }

  async downloadPdf(type:string,id:any,rut:any,commentary:string,desc:number,dataVenta:any,observacion:any){
    await this.findProveedor(id,rut);
    await this.findCliente(id,rut);
    //const data = await this.fetchDataVenta();
    this.dateTime = new Date();
    const pdf = new PdfMakeWrapper();
    this.descuento = desc;

    pdf.defaultStyle({
      margin: 5,
      fontSize:15,
      alignment:'justify',
  });

    if(type === 'orden'){
      pdf.pageSize('A4');
    pdf.add( await new Img('../assets/page/Pisosmanriquez.logo-02.png').width(200).build());
    pdf.add(new Txt('\n\nME Construcción y Diseño de interiores Spa').color('#F25C05').relativePosition(0,-20).bold().end);
    pdf.add(new Txt('\n\n76.861.179-3').color('#F25C05').relativePosition(0,-5).bold().end);
    pdf.add(new Txt('\n\nSantiago. '+this.dateTime.getUTCDate()+ ' de '+this.transformMonth(this.dateTime)+' del '+this.dateTime.getFullYear()).decoration('underline').relativePosition(300,45).bold().end);
    pdf.add(new Txt('\n\nORDEN DE COMPRA N°'+this.countNumberGuide(this.year)+'/'+this.dateTime.getFullYear()).decoration('underline').fontSize(25).relativePosition(30,60).bold().end);
    pdf.add(new Txt('\n\NOMBRE      : '+this.proveedor.nombre).decoration('underline').fontSize(20).relativePosition(30,140).bold().end);
    pdf.add(new Txt('\n\DIRECCIÓN      : '+this.proveedor.direccion).decoration('underline').fontSize(20).relativePosition(30,165).bold().end);
    pdf.add(new Txt('\n\FONO      : '+this.proveedor.telefono).decoration('underline').fontSize(20).relativePosition(30,190).bold().end);
    pdf.add(new Txt('\n\ATENCION      : '+this.proveedor.telefono).decoration('underline').fontSize(20).relativePosition(30,215).bold().end);
    pdf.add(new Txt('\n\CORREO      : '+this.proveedor.correoAtencion).decoration('underline').fontSize(20).relativePosition(30,240).bold().end);
    pdf.add(new Txt('\n\RETIRA      : '+this.proveedor.retira).decoration('underline').fontSize(20).relativePosition(30,265).bold().end);
    pdf.add(new Txt('\n\N° GUIA      : '+this.countNumberGuide(this.year)).decoration('underline').fontSize(20).relativePosition(30,290).bold().end);
    pdf.add(new Txt('\n\COMENTARIO: ').decoration('underline').fontSize(20).relativePosition(30,350).bold().end);
    pdf.add(new Txt('\n'+commentary).fontSize(15).relativePosition(60,400).bold().end);
    pdf.create().open();
    pdf.create().download('Orden de compra para '+this.proveedor.nombre.toUpperCase())

    }
    if(type === 'cotizacion'){// - Ceramicos - Porcelanatos - Pasto Sintetico -
      pdf.pageSize('A3');//C:\Users\maxes\OneDrive\Documentos\Pega\SoftwareMama\manriquez-fullstack\Frontend\src\assets\page\ICONO-EXPERIENCIA.svg
      pdf.add( await new Img('../assets/page/Pisosmanriquez.logo-02.png').width(200).build());

      pdf.add(new Txt('\n\nME Construcción y Diseño de interiores Spa').color('#F25C05').fontSize(25).relativePosition(215,-125).bold().end);
      pdf.add(new Txt('\n\nRUT: 76.861.179-3').color('#F25C05').fontSize(25).relativePosition(215,-100).bold().end);
      pdf.add(new Txt('\n\nPisos Flotantes - Pisos Madera - Pisos Vinílicos - Ceramicos - Porcelanatos').relativePosition(215,-35).italics().end);
      pdf.add(new Txt('\n\nPasto Sintetico - Alfombras - Cortinas Roller - Departamento de construcción ').relativePosition(215,-15).italics().end);
      pdf.add(new Txt('\n\nPapeles Murales - Servicios Alfombras - Cierres de Terraza').relativePosition(215,5).italics().end);
      pdf.add(new Txt('\n\nDirección: Isabel la Católica 6020, Las Condes, Santiago').relativePosition(240,45).italics().end);
      pdf.add(new Txt('\n\nTeléfono: +56 2 33058688 - +56973763087 - Sitio web: https://www.pisosmanriquez.cl').relativePosition(240,65).italics().end);
      pdf.add( await new Img('../assets/page/ICONO-EXPERIENCIA.jpeg').width(125).height(125).relativePosition(40,25).build());
      pdf.add(new Txt('\n\nN° de Cot  '+this.countNumberCot()).relativePosition(50,115).fontSize(15).bold().end);
      console.log(this.countCot)
      pdf.add(new Txt('\n\nEstado    Pendiente').relativePosition(50,135).fontSize(15).bold().end);
      pdf.add(new Txt('\n\nFecha    '+this.dateTime.getUTCDate()+'/'+(this.dateTime.getMonth()+1)+'/'+this.dateTime.getFullYear()).relativePosition(50,155).fontSize(15).bold().end);
      pdf.add(new Txt('\n\nCOTIZACIÓN').relativePosition(330,150).fontSize(18).bold().end);
      pdf.add(new Txt('\n\Nombre       :      '+this.cliente.nombre).relativePosition(50,255).fontSize(12).end);
      pdf.add(new Txt('\n\RUT Cliente   :      '+this.cliente.rut).relativePosition(450,255).fontSize(12).end);
      pdf.add(new Txt('\n\Dirección     :      '+this.cliente.direccion).relativePosition(50,285).fontSize(12).end);
      pdf.add(new Txt('\n\Comuna         :      '+this.cliente.comuna).relativePosition(450,285).fontSize(12).end);
      pdf.add(new Txt('\n\Ciudad         :      '+this.cliente.ciudad).relativePosition(50,315).fontSize(12).end);
      pdf.add(new Txt('\n\Teléfono        :      '+this.cliente.telefono).relativePosition(450,315).fontSize(12).end);
      var tablaProduct = this.createTable(dataVenta,this.descuento)
      var tablaObs = this.createTableObservacion(observacion, tablaProduct.table.body.length)
      var tablaServices = this.createTableServices(dataVenta, tablaProduct.table.body.length)
      var tablaTotal = this.createTableTotal(dataVenta,this.descuento, tablaProduct.table.body.length)
      pdf.add( tablaProduct );
      pdf.add( tablaObs );
      pdf.add( tablaServices );
      pdf.add( tablaTotal );
      var countRowsTBS = tablaProduct.table.body.length + tablaServices.table.body.length;
      var jumper = this.originPosition+(this.rowHeight+this.rowHeight/2)+((this.rowHeight+5)*countRowsTBS);
      pdf.add(new Txt('\nCondiciones generales').bold().relativePosition(20, jumper).fontSize(15).end);
      pdf.add(new Txt('\nForma de pago: 60% inicio trabajos, saldo al finalizar').relativePosition(20,jumper+25).fontSize(12).end);
      pdf.add(new Txt('\nTransferencia bancaria() , tarjetas de credito, debito, webpay.').relativePosition(20,jumper+40).fontSize(12).end);
      pdf.add( await new Img('../assets/page/webpay.png').width(100).height(50).relativePosition(370,jumper+20).build());

      pdf.add(new Table([['POLÍTICA DE DEVOLUCIÓN DE PRODUCTO\n* La devolución del producto es válida SOLO cuando existe una falla de fábrica (Esto lo evalúan nuestros técnicos especializados) 2 días habiles.\n* Pisos Manriquez entrega 10 días habiles como plazo máximo desde la fecha de compra para la devolución por los motivos antes mencionados. \n* Dicha devolución NO SE LLEVARÁ A CABO si el producto en cuestión se ha utilizado, estropeado o no es entregado en su embalaje original.\n* No se aceptan devoluciones por motivos tales como sobrante de material, y/o cambio de colores en todas nuestras lineas de productos.\n* No se aceptará la devolución del producto si el cliente no presenta la Factura o Boleta de este.']]).widths(['*',-9]).relativePosition(20,jumper+80).fontSize(12).end);

      jumper += 230;
      pdf.add( await new Img('../assets/page/pyramid.png').width(100).height(50).relativePosition(0,jumper).build());
      pdf.add( await new Img('../assets/page/bs.png').width(100).height(50).relativePosition(100,jumper).build());
      pdf.add( await new Img('../assets/page/multicarpet.jpg').width(100).height(50).relativePosition(180,jumper).build());
      pdf.add( await new Img('../assets/page/carpenter.jpg').width(50).height(50).relativePosition(280,jumper).build());
      pdf.add( await new Img('../assets/page/feltex.png').width(50).height(50).relativePosition(340,jumper).build());
      pdf.add( await new Img('../assets/page/logo-ducasse.png').width(100).height(50).relativePosition(400,jumper).build());
      pdf.add( await new Img('../assets/page/winter.jpg').width(100).height(50).relativePosition(495,jumper).build());
      pdf.add( await new Img('../assets/page/etersol.png').width(100).height(50).relativePosition(595,jumper).build());
      pdf.add( await new Img('../assets/page/wiener.png').width(80).height(50).relativePosition(700,jumper).build());
      pdf.create().download('Cotizacion para '+dataVenta.cliente.nombre.toUpperCase())
      pdf.create().open();
    }
    if(type === 'guia'){// - Ceramicos - Porcelanatos - Pasto Sintetico -
      pdf.pageSize('A3');//C:\Users\maxes\OneDrive\Documentos\Pega\SoftwareMama\manriquez-fullstack\Frontend\src\assets\page\ICONO-EXPERIENCIA.svg
      pdf.add( await new Img('../assets/page/Pisosmanriquez.logo-02.png').width(200).build());

      pdf.add(new Txt('\n\nME Construcción y Diseño de interiores Spa').color('#F25C05').fontSize(25).relativePosition(215,-125).bold().end);
      pdf.add(new Txt('\n\nRUT: 76.861.179-3').color('#F25C05').fontSize(25).relativePosition(215,-100).bold().end);
      pdf.add(new Txt('\n\nPisos Flotantes - Pisos Madera - Pisos Vinílicos - Ceramicos - Porcelanatos').relativePosition(215,-35).italics().end);
      pdf.add(new Txt('\n\nPasto Sintetico - Alfombras - Cortinas Roller - Departamento de construcción ').relativePosition(215,-15).italics().end);
      pdf.add(new Txt('\n\nPapeles Murales - Servicios Alfombras - Cierres de Terraza').relativePosition(215,5).italics().end);
      pdf.add(new Txt('\n\nDirección: Isabel la Católica 6020, Las Condes, Santiago').relativePosition(240,45).italics().end);
      pdf.add(new Txt('\n\nTeléfono: +56 2 33058688 - +56973763087 - Sitio web: https://www.pisosmanriquez.cl').relativePosition(240,65).italics().end);
      pdf.add( await new Img('../assets/page/ICONO-EXPERIENCIA.jpeg').width(125).height(125).relativePosition(40,25).build());

      pdf.add(new Txt('\n\nN° nota de Venta '+this.countNumberCot()).relativePosition(50,115).fontSize(15).bold().end);
      pdf.add(new Txt('\n\nEstado    Pendiente').relativePosition(50,135).fontSize(15).bold().end);
      pdf.add(new Txt('\n\nFecha    '+this.dateTime.getUTCDate()+'/'+(this.dateTime.getMonth()+1)+'/'+this.dateTime.getFullYear()).relativePosition(50,155).fontSize(15).bold().end);
      pdf.add(new Txt('\n\nNOTA DE VENTA').relativePosition(330,150).fontSize(18).bold().end);
      pdf.add(new Txt('\n\Nombre       :      '+this.cliente.nombre).relativePosition(50,255).fontSize(12).end);
      pdf.add(new Txt('\n\RUT Cliente   :      '+this.cliente.rut).relativePosition(450,255).fontSize(12).end);
      pdf.add(new Txt('\n\Dirección     :      '+this.cliente.direccion).relativePosition(50,285).fontSize(12).end);
      pdf.add(new Txt('\n\Comuna         :      '+this.cliente.comuna).relativePosition(450,285).fontSize(12).end);
      pdf.add(new Txt('\n\Ciudad         :      '+this.cliente.ciudad).relativePosition(50,315).fontSize(12).end);
      pdf.add(new Txt('\n\Teléfono        :      '+this.cliente.telefono).relativePosition(450,315).fontSize(12).end);
      var tablaProduct = this.createTable(dataVenta,this.descuento)
      var tablaObs = this.createTableObservacion(observacion, tablaProduct.table.body.length)
      var tablaServices = this.createTableServices(dataVenta, tablaProduct.table.body.length)
      var tablaTotal = this.createTableTotal(dataVenta,this.descuento, tablaProduct.table.body.length)
      pdf.add( tablaProduct);
      pdf.add( tablaServices);
      pdf.add( tablaObs );
      pdf.add( tablaTotal );
      var countRowsTBS = tablaProduct.table.body.length + tablaServices.table.body.length;
      var jumper = this.originPosition+(this.rowHeight+this.rowHeight/2)+((this.rowHeight+5)*countRowsTBS);
      pdf.add(new Txt('\nCondiciones generales').bold().relativePosition(20, jumper).fontSize(15).end);
      pdf.add(new Txt('\nForma de pago: 60% inicio trabajos, saldo al finalizar').relativePosition(20,jumper+25).fontSize(12).end);
      pdf.add(new Txt('\nTransferencia bancaria() , tarjetas de credito, debito, webpay.').relativePosition(20,jumper+40).fontSize(12).end);
      pdf.add( await new Img('../assets/page/webpay.png').width(100).height(50).relativePosition(370,jumper+20).build());

      pdf.add(new Table([['POLÍTICA DE DEVOLUCIÓN DE PRODUCTO\n* La devolución del producto es válida SOLO cuando existe una falla de fábrica (Esto lo evalúan nuestros técnicos especializados) 2 días habiles.\n* Pisos Manriquez entrega 10 días habiles como plazo máximo desde la fecha de compra para la devolución por los motivos antes mencionados. \n* Dicha devolución NO SE LLEVARÁ A CABO si el producto en cuestión se ha utilizado, estropeado o no es entregado en su embalaje original.\n* No se aceptan devoluciones por motivos tales como sobrante de material, y/o cambio de colores en todas nuestras lineas de productos.\n* No se aceptará la devolución del producto si el cliente no presenta la Factura o Boleta de este.']]).widths(['*',-9]).relativePosition(20,jumper+80).fontSize(12).end);

      jumper += 230;
      pdf.add( await new Img('../assets/page/pyramid.png').width(100).height(50).relativePosition(0,jumper).build());
      pdf.add( await new Img('../assets/page/bs.png').width(100).height(50).relativePosition(100,jumper).build());
      pdf.add( await new Img('../assets/page/multicarpet.jpg').width(100).height(50).relativePosition(180,jumper).build());
      pdf.add( await new Img('../assets/page/carpenter.jpg').width(50).height(50).relativePosition(280,jumper).build());
      pdf.add( await new Img('../assets/page/feltex.png').width(50).height(50).relativePosition(340,jumper).build());
      pdf.add( await new Img('../assets/page/logo-ducasse.png').width(100).height(50).relativePosition(400,jumper).build());
      pdf.add( await new Img('../assets/page/winter.jpg').width(100).height(50).relativePosition(495,jumper).build());
      pdf.add( await new Img('../assets/page/etersol.png').width(100).height(50).relativePosition(595,jumper).build());
      pdf.add( await new Img('../assets/page/wiener.png').width(80).height(50).relativePosition(700,jumper).build());
      pdf.create().download('Nota de venta de '+dataVenta.cliente.nombre.toUpperCase())
      pdf.create().open();
    }


  }

  createTable(data:any,desc:any):(ITable){
    var dataTable = this.extractData(data,desc)
    return new Table([
      [ 'Cant.', 'Nombre','U. ME','Descripción','Valor producto','Total'],
      ...dataTable,
      //['Observacion', '','','','','Total']
    ]).widths([38,125,40,370,67,67])
    .layout({
      hLineColor:(rowIndex:any,node:any,columnIndex:any) =>{
        return rowIndex != 0 && rowIndex != 1  && rowIndex != dataTable.length+1 ? rowIndex='#FFFFFF':rowIndex='#000000';
      },
      fillColor: (rowIndex:any,node:any,columnIndex:any) => {
        return rowIndex ===0 ? '#CCCCCC':'';
      },
      hLineWidth: (rowIndex:any) => {
        return rowIndex = 1;
      },
    })
    .heights(rowIndex =>{
      return rowIndex = this.rowHeight
    }).relativePosition(20, this.originPosition).fontSize(this.fontSizeData).end;
  }

  extractData(data:any,desc:any):any{
    var productos = data.productos;
    var row:TableRow[] = [];
    productos.forEach((producto:any) => {
      var totalProductos = producto.valor*producto.cantidad;

      row.push([producto.cantidad,producto.nombre,producto.unidadMedida,producto.descripcion,producto.valor,totalProductos]);

    });

      return row;

    // return productos.map((row:any) => [row.productos.map((p:any) => p.cantidad),data.id_Venta,row.productos.map((p:any) => p.unidadMedida),row.productos.map((p:any) => p.descripcion),data.servicios.map((s:any) => {}),row.productos.map((p:any) => p.valor),this.descuento,row.totalDeVenta]);

  }

  createTableObservacion(observacion:any, countRows_TBProducts:number):(ITable){

    return new Table([ ['Observacion: '+observacion]]).heights(rowIndex =>{
      return rowIndex = this.rowHeight
    }).widths(['*',-9])
    .relativePosition(20, this.originPosition+((this.rowHeight+5)*countRows_TBProducts)).fontSize(this.fontSizeData).end

  }

  createTableServices(data:any, countRows_TBProducts:number):any{
    var dataTable= this.extractDataServices(data)
    if(this.lengthService === 0){
      return new Table([
        ['Servicios','Valor servicio'],
        ['NO HAY SERVICIOS','0']
      ]
        ).heights(rowIndex =>{
        return rowIndex = this.rowHeight
      }).layout({
        fillColor: (rowIndex:any,node:any,columnIndex:any) => {
          return rowIndex ===0 ? '#CCCCCC':'';
        },
      }).widths([300,67])
      .relativePosition(20, (this.originPosition+5)+(this.rowHeight+this.rowHeight/2)+((this.rowHeight+5)*countRows_TBProducts)).fontSize(this.fontSizeData).end
    }
    return new Table([
      ['Servicios','Valor servicio'],
      ...dataTable]).heights(rowIndex =>{
      return rowIndex = this.rowHeight
    }).layout({
      fillColor: (rowIndex:any,node:any,columnIndex:any) => {
        return rowIndex ===0 ? '#CCCCCC':'';
      },
    }).widths([300,67])
    .relativePosition(20, (this.originPosition+5)+(this.rowHeight+this.rowHeight/2)+((this.rowHeight+5)*countRows_TBProducts)).fontSize(this.fontSizeData).end
  }

  extractDataServices(data:any):any{
    // data == servicios
    var servicios = data.servicios;
    var row:TableRowServices[] = [];

    this.lengthService = servicios.length
    servicios.forEach((service:any) => {
            row.push([service.nombre,service.valor]);
    });
    if(servicios.length == servicios.length ){
      return row;
    }

    // return productos.map((row:any) => [row.productos.map((p:any) => p.cantidad),data.id_Venta,row.productos.map((p:any) => p.unidadMedida),row.productos.map((p:any) => p.descripcion),data.servicios.map((s:any) => {}),row.productos.map((p:any) => p.valor),this.descuento,row.totalDeVenta]);

  }
  createTableTotal(dataVenta:any, descuento:any, countRows_TBProducts:number):(ITable){
    //const IVA = 0.19
    var Sub = dataVenta.totalDeVenta/1.19;
    var desc =  Math.round( Sub*(descuento/100) )
    var NETO = Sub - desc
    var IVA = Math.round( NETO*0.19 )
    var TOTAL = NETO + IVA
    // return new Table([
    //   ['Servicios','Valor servicio'],
    return new Table([ ['Sub Total',Sub],['Descuento %'+descuento,desc],['NETO',NETO],['IVA 19%',IVA],['TOTAL $',TOTAL]

    ]).widths([73,67])
    .relativePosition(367+150, (this.originPosition+5)+(this.rowHeight+this.rowHeight/2)+((this.rowHeight+5)*countRows_TBProducts)).fontSize(this.fontSizeData).end
  }

  // async fetchDataVenta(id:string,rut:string):Promise<venta[]>{
  //   return this.ventasService.getVentaAndCliente
  // }
  countNumberGuide(thisYear:number):number{
    if(thisYear != this.dateTime.getFullYear()){
      this.year += 1;
      return this.counter = 1;
    }
    return this.counter = this.counter+1;

  }

  countNumberCot():number{
    return this.countCot++;
  }
  countNumberNote():number{
    return this.countNote++;
  }
  findProveedor(id:any,rut:any):any{
    return new Promise((resolve,reject)=>{
      this.ventasService.getVentaAndCliente(id,rut).subscribe(
        (res:any)=>{
          this.proveedor.nombre = res.dataVenta.proveedor.nombre
          this.proveedor.rut = res.dataVenta.proveedor.rut
          this.proveedor.nombreContacto = res.dataVenta.proveedor.nombreContacto
          this.proveedor.direccion =  res.dataVenta.proveedor.direccion
          this.proveedor.telefono = res.dataVenta.proveedor.telefono
          this.proveedor.correoAtencion = res.dataVenta.proveedor.correoAtencion
          this.proveedor.retira =  res.dataVenta.proveedor.retira
          resolve(this.proveedor);
        }
      )
    })
  }

  findCliente(id:any,rut:any){
    return new Promise((resolve,reject)=>{
      this.ventasService.getVentaAndCliente(id,rut).subscribe(
        (res:any)=>{
          this.cliente.nombre = res.dataVenta.cliente.nombre
          this.cliente.rut = res.dataVenta.cliente.rut
          this.cliente.comuna = res.dataVenta.cliente.comuna
          this.cliente.direccion =  res.dataVenta.cliente.direccion
          this.cliente.telefono = res.dataVenta.cliente.telefono
          this.cliente.correo = res.dataVenta.cliente.correo
          this.cliente.ciudad =  res.dataVenta.cliente.ciudad
          resolve(this.cliente);
        }
      )
    })
  }
}
