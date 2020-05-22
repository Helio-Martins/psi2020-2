import { Reserva } from './reserva';

export interface Quarto {
  _id: string; // identificador do quarto para a base de dados
	tipo: string; // standard, suite, etc
	caracteristicas: [string]; // lista dos servicos disponibilizados
  precoEpocaBaixa: number; // preco epoca baixa
  precoEpocaAlta: number; // preco epoca alta
  numQuartos: number; // numero de quartos deste tipo disponiveis
  reservas: [Reserva];
}
