import { Transacao } from "@/models/Transacao";

export const transacoesMock: Transacao[] = [
  new Transacao("1", "depósito", 1500, new Date("2025-05-10")),
  new Transacao("2", "pagamento", -200, new Date("2025-05-11")),
  new Transacao("3", "transferência", -300, new Date("2025-05-12")),
];
