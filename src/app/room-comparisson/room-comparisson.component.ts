import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuartoService } from '../quarto.service'
import { Quarto } from '../quarto';
import { Reserva } from '../reserva';

@Component({
  selector: 'app-room-comparisson',
  templateUrl: './room-comparisson.component.html',
  styleUrls: ['./room-comparisson.component.css']
})
export class RoomComparissonComponent implements OnInit {

  // hardcoded para testar
  
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
  
  
  quartos: Quarto[];

  filtrados: Quarto[];

  constructor(
    private route: ActivatedRoute,
    private quartoService: QuartoService
  ) { }

  ngOnInit() {
    //this.getQuartos();
    // hardcoded para testar
    
    this.quartos = [this.quarto0, this.quarto1, this.quarto2, this.quarto3];
    this.filtrados = this.quartos;
    
  }

  getQuartos(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quartoService.getQuartos(id)
      .subscribe(quartos => {this.quartos = quartos;this.filtrados = quartos;});
  }

  reset(){
    this.filtrados = this.quartos;
    this.minPreco = undefined;
    this.maxPreco = undefined;
    this.diasBaixo = 0;
    this.diasAlto = 0;
    this.entrada = undefined;
    this.entradaStr =  undefined;
    this.saida = undefined;
    this.saidaStr = undefined;
    console.log(this.entrada);
  }

  minPreco: number;
  maxPreco: number;

  filter(precoMin: number, precoMax: number, dataEntrada: string, dataSaida: string): void {
    this.filterPreco(precoMin, precoMax);
    this.filterData(dataEntrada, dataSaida);
    console.log(this.entrada);
    this.calculaPreco();
  }

  filterPreco(precoMin: number, precoMax: number): void {
    if (!precoMin || !precoMax)
      return;
    if (!isNaN(precoMin) && !isNaN(precoMax)) {
      this.filtrados  = [];
      for (let quarto of this.quartos) {
        if (quarto.precoEpocaBaixa >= precoMin && quarto.precoEpocaBaixa <= precoMax 
          && quarto.precoEpocaAlta >= precoMin && quarto.precoEpocaAlta <= precoMax) {
            this.filtrados.push(quarto);
        }
      }
      this.minPreco = precoMin;
      this.maxPreco = precoMax;
    }
  }

  entrada: Date;
  entradaStr: string;
  saida: Date;
  saidaStr: string;

  filterData(dataEntrada: string, dataSaida: string): void {
    let entrada = new Date(dataEntrada);
    let saida = new Date(dataSaida);
    if (!Date.parse(dataEntrada) || !Date.parse(dataSaida) || entrada >= saida) {
      return;
    }
    let disponivel = true;
    let buffer = this.filtrados;
    this.filtrados = [];
    for (let quarto of buffer) {
      for (let reserva of quarto.reservas) {
        // verifica se data nao se sobrepoe a data desta reserva
        if ((entrada < reserva.data_inicio && saida < reserva.data_inicio) 
          || (entrada > reserva.data_fim && saida > reserva.data_fim)) {
            continue;
        }
        // a data sobrepoe-se, logo nao precisa de iterar sobre as outras reservas
        disponivel = false;
        break;
      }
      if (disponivel) {
        this.filtrados.push(quarto);
      } else {
        disponivel = true;
      }
    }
    this.entrada = entrada;
    this.entradaStr = entrada.toDateString();
    this.saida = saida;
    this.saidaStr = saida.toDateString();
  }

  diasBaixo: number = 0;
  diasAlto: number = 0;

  calculaPreco(): void {
      this.diasBaixo = 0;
      this.diasAlto = 0;
    if (!this.entrada || !this.saida) {
      return;
    } else {
      let b1 = "2020-01-15".split("-");
      let b2 = "2020-05-31".split("-");
      let b3 = "2020-09-30".split("-");
      let b4 = "2020-12-15".split("-");
      var baixo1 = new Date(parseInt(b1[0]), parseInt(b1[1])-1, parseInt(b1[2]));
      var baixo2 = new Date(parseInt(b2[0]), parseInt(b2[1])-1, parseInt(b2[2]));
      var baixo3 = new Date(parseInt(b3[0]), parseInt(b3[1])-1, parseInt(b3[2]));
      var baixo4 = new Date(parseInt(b4[0]), parseInt(b4[1])-1, parseInt(b4[2]));
      console.log('0');
      console.log(this.entrada);
      for (let d = this.entrada; d < this.saida; d.setDate(d.getDate() + 1)) {
        console.log('1');
        console.log(this.entrada);
        console.log(d);
        console.log('2');
        let year = d.getFullYear();
        baixo1.setFullYear(year);
        baixo2.setFullYear(year);
        baixo3.setFullYear(year);
        baixo4.setFullYear(year);
        if ((d >= baixo1 && d <= baixo2) || d >= baixo3 && d <= baixo4) {
          this.diasBaixo += 1;
        } else {
          this.diasAlto += 1;
        }
      }
      console.log(this.entrada);      
    }
  }
}