import { Injectable } from '@angular/core';
import { Img, PdfMakeWrapper, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  dateTime: Date;

  constructor() {
    this.dateTime = new Date();
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
   }

  transformMonth(date: Date):string {
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return monthNames[date.getMonth()];
  }
  async downloadPdf(type:string){
    const pdf = new PdfMakeWrapper();
    pdf.pageSize('A4');
    pdf.defaultStyle({
      margin: 5,
      fontSize: 15,
      alignment:'justify',
  });

    pdf.add( await new Img('../assets/page/Pisosmanriquez.logo-02.png').width(200).build());
    pdf.add(new Txt('\n\nME Construcción y Diseño de interiores Spa').color('#F25C05').relativePosition(0,-20).bold().end);
    pdf.add(new Txt('\n\n76.861.179-3').color('#F25C05').relativePosition(0,-5).bold().end);
    pdf.add(new Txt('\n\nSantiago. '+this.dateTime.getUTCDate()+ ' de '+this.transformMonth(this.dateTime)+' del '+this.dateTime.getFullYear()).decoration('underline').relativePosition(300,45).bold().end);


    pdf.create().open();
  }
}
