export enum TipoTransacao {
  DEPOSITO = "depósito",
  TRANSFERENCIA = "transferência",
  PAGAMENTO = "pagamento",
}

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

  get valorFormatado(): string {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(this.valor);
  }

    get dataFormatada(): string {
    return this.data.toLocaleDateString("pt-BR");
  }

   resumo(): string {
    return `${this.tipo.toUpperCase()} de ${this.valorFormatado} em ${this.dataFormatada}`;
  }
}
