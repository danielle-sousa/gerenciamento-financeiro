"use client";

import { useState } from "react";
import { TipoTransacao, Transacao } from "@/models/Transacao";
import { useTransacoes } from "@/contexts/TransacaoContext";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/DesignSystem";
import Input from "@/DesignSystem/Input";
import Select from "@/DesignSystem/Select";

export function FormNovaTransacao() {
  const { adicionarTransacao } = useTransacoes();
  const [tipo, setTipo] = useState<TipoTransacao>(TipoTransacao.DEPOSITO);
  const [valor, setValor] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const novaTransacao = new Transacao(
      uuidv4(),
      tipo,
      tipo === "depósito" ? valor : -Math.abs(valor),
      new Date()
    );

    adicionarTransacao(novaTransacao);
    setValor(0);
    setTipo(TipoTransacao.DEPOSITO);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="block mb-2 font-medium">Tipo</label>
      <Select
        value={tipo}
        onChange={(e) => setTipo(e.target.value as TipoTransacao)}
        options={[
          { label: "Depósito", value: "depósito" },
          { label: "Transferência", value: "transferência" },
          { label: "Pagamento", value: "pagamento" },
        ]}
      />

      <label className="block mb-2 font-medium">Valor</label>
      <Input
      type="number"
      value={valor}
      onChange={(e) => setValor(Number(e.target.value))}
      />

      <Button variant="primary">Adicionar</Button>
    </form>
  );
}