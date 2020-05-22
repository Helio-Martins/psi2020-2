import { Imagem } from './imagem';
import { Quarto } from './quarto';

export interface Hotel {
  _id: string,
  nome: string,
  descricao: string,
  morada: string,
  coordenadas: string,
  telefone: string,
  email: string,
  fotos: [Imagem],
  foto: Imagem,
  fotoURL: string,
  quartos: [Quarto],
  servicos:  [string]
}
