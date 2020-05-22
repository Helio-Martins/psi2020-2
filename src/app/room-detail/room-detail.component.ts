import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuartoService } from '../quarto.service'
import { Quarto } from '../quarto';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
  quarto: Quarto;

  //hardcoded para testar
  
  quartos: Quarto[];

   quarto0: Quarto = {
    _id:'0',
    tipo:'Quarto Standard',
    precoEpocaBaixa:180,
    precoEpocaAlta:270,
    caracteristicas: ['Telefone','Wi-fi gratuito','Ar condicionado',
    'Televisão LED','Canais por cabo','Mini-bar','Cofre',
    'Casa de banho privativa com telefone','Secador de cabelo',
    'Espelho de maquilhagem','Produtos de higiene pessoal gratuitos',
    'Fechadura eletrónica de segurança','Roupão e chinelos','Maquina de café'],
    numQuartos: 3,
    reservas: []
  };

  quarto1: Quarto = {
    _id:'1',
    tipo:'Suite',
    precoEpocaBaixa:250,
    precoEpocaAlta:330,
    caracteristicas: ['Telefone','Wi-fi gratuito','Ar condicionado',
    'Televisão LED','Canais por cabo','Cofre','Casa de banho privativa com telefone',
    'Secador de cabelo','Espelho de maquilhagem','Produtos de higiene pessoal gratuitos',
    'Fechadura eletrónica de segurança','Sala-de-estar','Roupão e chinelos','Maquina de café'],
    numQuartos: 1,
    reservas: []
  };

  quarto2: Quarto = {
    _id:'2',
    tipo:'Suite Duplex',
    precoEpocaBaixa:270,
    precoEpocaAlta:350,
    caracteristicas: ['Telefone','Wi-fi gratuito','Ar condicionado',
    'Televisão LED','Canais por cabo','Cofre','Casa de banho privativa com telefone',
    'Secador de cabelo','Espelho de maquilhagem','Produtos de higiene pessoal gratuitos',
    'Servico de quarto 24 horas','Fechadura eletrónica de segurança','Sala-de-estar',
    'Roupão e chinelos','Maquina de café'],
    numQuartos: 1,
    reservas: []
  };

  quarto3: Quarto = {
    _id:'3',
    tipo:'Suite Deluxe',
    precoEpocaBaixa:310,
    precoEpocaAlta:450,
    caracteristicas: ['Telefone','Wi-fi gratuito','Ar condicionado',
    'Televisão LED','Canais por cabo','Cofre','Casa de banho privativa com telefone',
    'Secador de cabelo','Espelho de maquilhagem','Produtos de higiene pessoal gratuitos',
    'Servico de quarto 24 horas','Fechadura eletrónica de segurança','Sala-de-estar',
    'Roupão e chinelos','Maquina de café'],
    numQuartos: 1,
    reservas: []
  };

  constructor(
    private route: ActivatedRoute,
    private quartoService: QuartoService
  ) {}

  ngOnInit(): void {

    // hardcoded para testar
    this.quartos = [this.quarto0, this.quarto1, this.quarto2, this.quarto3]
    this.getQuarto();
  }

  getQuarto(): void {
    /*
    const id = this.route.snapshot.paramMap.get('id');
    this.quartoService.getQuarto(id)
      .subscribe(quarto => this.quarto = quarto);
    */
    // hardcoded para testar
    this.quarto = this.quartos[+this.route.snapshot.paramMap.get('id')];
  }


}