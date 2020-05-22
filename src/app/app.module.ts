import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HotelService } from './hotel.service';


import { HotelListComponent } from './hotel-list/hotel-list.component';
import { MessagesComponent } from './messages/messages.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { QuartoService } from './quarto.service';
import { RoomComparissonComponent } from './room-comparisson/room-comparisson.component';

@NgModule({
  declarations: [
    AppComponent,
    HotelListComponent,
    MessagesComponent,
    HotelDetailComponent,
    RoomDetailComponent,
    RoomComparissonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [QuartoService, HotelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
