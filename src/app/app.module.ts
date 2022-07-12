import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';//hacer peticiones de tipo http al back
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModifyVentaComponent } from './ventas/pages/modify-venta/modify-venta.component';
import { ModifyClienteVentaComponent } from './ventas/pages/modify-cliente-venta/modify-cliente-venta.component';
@NgModule({
  declarations: [
    AppComponent,
    ModifyVentaComponent,
    ModifyClienteVentaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
