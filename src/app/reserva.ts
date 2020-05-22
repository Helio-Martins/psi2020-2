export interface Reserva {
  _id: string; // identificador da reserva para a base de dados
  data_inicio: Date;
  data_fim: Date;
  nome_cliente: string;
  morada_cliente: string;
  telefone_cliente: string;
  email_cliente: string;
  nif_cliente: string;
  num_cartao_credito: string;
  validade_cartao_credito: Date;
  cvv_cartao_credito: string;
  preco_noite: number;
  tipo_de_quarto: String;
  //num_quarto: number;
}