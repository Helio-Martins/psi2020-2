import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { RoomComparissonComponent } from './room-comparisson/room-comparisson.component';

const routes: Routes = [
  { path: '', redirectTo: '/hoteis', pathMatch: 'full' },
  { path: 'hoteis', component: HotelListComponent },
  { path: 'hotel/:id', component: HotelDetailComponent },
  { path: 'quartos/:id', component: RoomComparissonComponent },
  { path: 'quarto/:id', component: RoomDetailComponent }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
