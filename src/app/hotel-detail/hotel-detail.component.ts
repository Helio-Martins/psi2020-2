import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { HotelService } from '../hotel.service';
import { Hotel } from '../hotel';
import { Imagem } from '../imagem';
import { QuartoService } from '../quarto.service'
import { Quarto } from '../quarto';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {

  hotel: Hotel;

  precoMaisBaixo: number;

  quartos: Quarto[];

  totalQuartos: number;

  listaUrls: string[];

  constructor( 
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private quartoService: QuartoService,
    private sanitizer: DomSanitizer)
  { }

  ngOnInit(): void {
    this.getHotel();
  }

  getHotel(): void {
    // a funcao vai buscar ao HotelService o Hotel com o dado id
    const id = this.route.snapshot.paramMap.get('id');
    this.hotelService.getHotel(id)
      .subscribe(hotel => { this.hotel = hotel; 
      this.getImagens();
      this.getQuartos();
      console.log('fetched Imagens');
      console.log('fetched Quartos')}
      );
  }

  getQuartos(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quartoService.getQuartos(id)
      .subscribe(quartos => {this.quartos = quartos;
      this.countQuartos(this.quartos);
      this.getPrecoMaisBaixo()});
  }

  countQuartos(quartos: Quarto[]): void{
    this.totalQuartos= 0;
    quartos.forEach(element => {
      this.totalQuartos += element.numQuartos;
    });
  }

  getPrecoMaisBaixo(): void{
    let max = Infinity;
    for(let quarto of this.quartos)
      if(quarto.precoEpocaBaixa <= max)
        max = quarto.precoEpocaBaixa;
    this.precoMaisBaixo = max;
  }

  getImagens(){
    this.listaUrls = [];
    for (let foto of this.hotel.fotos) {
        let url =  'data:image/' + foto.contentType + ';base64,' + foto.bytes;
        this.listaUrls.push(url);
    }
  }
}
