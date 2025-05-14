export type TipoTransacao = 'depósito' | 'transferência' | 'pagamento';

export class Transacao {
  id: string;
  tipo: TipoTransacao;
  valor: number;
  data: Date;

  constructor(id: string, tipo: TipoTransacao, valor: number, data: Date) {
    this.id = id;
    this.tipo = tipo;
    this.valor = valor;
    this.data = data;
  }

  getDescricao(): string {
    return `${this.tipo} de R$ ${this.valor.toFixed(2)}`;
  }
}
