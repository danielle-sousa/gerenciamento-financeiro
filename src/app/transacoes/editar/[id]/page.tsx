"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Transacao, TipoTransacao } from "@/models/Transacao";
import Link from "next/link";
import { useTransacoes } from "@/contexts/TransacaoContext";

export default function EditarTransacaoPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const { transacoes, atualizarTransacao } = useTransacoes();

  const transacaoExistente = transacoes.find((t) => t.id === id);

  if (!transacaoExistente) {
    return <p>Transação não encontrada.</p>;
  }

  const [tipo, setTipo] = useState<TipoTransacao>(transacaoExistente.tipo);
  const [valor, setValor] = useState(Math.abs(transacaoExistente.valor));
  const [data, setData] = useState(
    transacaoExistente.data.toISOString().substring(0, 10)
  );

  const handleEditar = (e: React.FormEvent) => {
    e.preventDefault();

    const transacaoEditada = new Transacao(
      id!,
      tipo,
      tipo === "depósito" ? valor : -Math.abs(valor),
      new Date(data)
    );

    atualizarTransacao(transacaoEditada);

    alert("Transação atualizada com sucesso!");
    router.push("/transacoes");
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Transação</h1>

      <form onSubmit={handleEditar} className="space-y-4">
        <div>
          <label className="block mb-1">Tipo</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value as TipoTransacao)}
            className="w-full p-2 border rounded"
          >
            <option value="depósito">Depósito</option>
            <option value="transferência">Transferência</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Valor</label>
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(Number(e.target.value))}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Data</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="flex justify-between items-center mt-6">
          <Link href="/transacoes" className="text-blue-600 underline">
            ← Cancelar
          </Link>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Salvar Alterações
          </button>
        </div>
      </form>
    </main>
  );
}
