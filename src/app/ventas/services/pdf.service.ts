import { Injectable } from '@angular/core';
import { Img, PdfMakeWrapper, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() {
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
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
    pdf.add(new Txt('\n\nME Construcción y Diseño de interiores Spa').color('orange').relativePosition(40,-17).end);
    pdf.create().open();
  }
}
