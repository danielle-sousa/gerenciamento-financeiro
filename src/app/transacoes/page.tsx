"use client";

import { useState } from "react";
import { Transacao } from "@/models/Transacao";
import { transacoesMock } from "@/data/transacoes";
import Link from "next/link";

export default function ListagemTransacoesPage() {
  const [transacoes, setTransacoes] = useState<Transacao[]>(transacoesMock);

  const excluirTransacao = (id: string) => {
    const confirmar = confirm("Tem certeza que deseja excluir?");
    if (confirmar) {
      setTransacoes(transacoes.filter((t) => t.id !== id));
    }
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Transações</h1>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2 border">Tipo</th>
            <th className="text-left p-2 border">Valor</th>
            <th className="text-left p-2 border">Data</th>
            <th className="text-left p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {transacoes.map((t) => (
            <tr key={t.id} className="hover:bg-gray-50">
              <td className="p-2 border">{t.tipo}</td>
              <td
                className={`p-2 border ${
                  t.valor >= 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                R$ {Math.abs(t.valor).toFixed(2)}
              </td>
              <td className="p-2 border">
                {t.data.toLocaleDateString("pt-BR")}
              </td>
              <td className="p-2 border space-x-2">
                <Link
                  href={`/transacoes/${t.id}`}
                  className="text-blue-600 underline"
                >
                  Ver
                </Link>
                <Link
                  href={`/editar/${t.id}`}
                  className="text-yellow-600 underline"
                >
                  Editar
                </Link>
                <button
                  onClick={() => excluirTransacao(t.id)}
                  className="text-red-600 underline"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
