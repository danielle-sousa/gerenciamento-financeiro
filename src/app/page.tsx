"use client";

import { useState } from "react";
import { Transacao, TipoTransacao } from "@/models/Transacao";
import { v4 as uuidv4 } from "uuid";
import { transacoesMock } from "@/data/transacoes";

export default function HomePage() {
  const [transacoes, setTransacoes] = useState<Transacao[]>(transacoesMock);
  const [tipo, setTipo] = useState<TipoTransacao>("depósito" as TipoTransacao);
  const [valor, setValor] = useState<number>(0);
  const [data, setData] = useState<string>("");

  const saldoTotal = transacoes.reduce((acc, t) => acc + t.valor, 0);

  const adicionarTransacao = (e: React.FormEvent) => {
    e.preventDefault();

    if (!valor || !data) return;

    const novaTransacao = new Transacao(
      uuidv4(),
      tipo,
      tipo === "depósito" ? valor : -Math.abs(valor),
      new Date(data)
    );

    setTransacoes([novaTransacao, ...transacoes]);

    // Limpar o formulário
    setTipo("depósito" as TipoTransacao);
    setValor(0);
    setData("");
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Bem-vindo(a) 👋</h1>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">Saldo atual:</h2>
        <p className="text-3xl text-green-600 font-bold">
          R$ {saldoTotal.toFixed(2)}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Últimas transações</h2>
        <ul className="space-y-2">
          {transacoes.map((t) => (
            <li
              key={t.id}
              className="border p-3 rounded-md bg-white shadow-sm flex justify-between"
            >
              <span>{t.getDescricao()}</span>
              <span className="text-gray-500 text-sm">
                {t.data.toLocaleDateString("pt-BR")}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Nova transação</h2>
        <form onSubmit={adicionarTransacao} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Tipo</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as TipoTransacao)}
              className="w-full border rounded-md p-2"
            >
              <option value="depósito">Depósito</option>
              <option value="pagamento">Pagamento</option>
              <option value="transferência">Transferência</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Valor (R$)</label>
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(Number(e.target.value))}
              className="w-full border rounded-md p-2"
              step="0.01"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Data</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Adicionar transação
          </button>
        </form>
      </section>
    </main>
  );
}
