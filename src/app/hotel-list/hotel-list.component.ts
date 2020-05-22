import { Component, OnInit } from '@angular/core';

import { HotelService } from '../hotel.service';
import { Hotel } from '../hotel';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})

export class HotelListComponent implements OnInit {

  hoteis: Hotel[];

  constructor(private hotelService: HotelService) { }

  ngOnInit() {
    this.getHoteis();
  }

  getHoteis(): void {
    this.hotelService.getHoteis()
      .subscribe(hoteis => this.hoteis = hoteis);

  }

}
