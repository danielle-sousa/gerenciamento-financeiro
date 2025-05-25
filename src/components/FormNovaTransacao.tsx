"use client";

import { useState } from "react";
import { TipoTransacao, Transacao } from "@/models/Transacao";
import { useTransacoes } from "@/contexts/TransacaoContext";
import { v4 as uuidv4 } from "uuid";

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
      <select
        value={tipo}
        onChange={(e) => setTipo(e.target.value as TipoTransacao)}
        className="w-full border rounded p-2 mb-4"
      >
        <option value="depósito">Depósito</option>
        <option value="transferência">Transferência</option>
      </select>

      <label className="block mb-2 font-medium">Valor</label>
      <input
        type="number"
        value={valor}
        onChange={(e) => setValor(Number(e.target.value))}
        className="w-full border rounded p-2 mb-4"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Adicionar
      </button>
    </form>
  );
}