"use client";

import { useTransacoes } from "@/contexts/TransacaoContext";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function DetalhesTransacaoPage() {
  const { transacoes } = useTransacoes();
  const params = useParams();
  const router = useRouter();

  const transacao = transacoes.find(t => t.id === params.id);

  if (!transacao) {
    return (
      <main className="p-6 max-w-xl mx-auto">
        <h1>Transação não encontrada.</h1>
        <Link href="/transacoes" className="text-blue-600 underline">
          ← Voltar para lista
        </Link>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Detalhes da Transação</h1>
      <p><strong>ID:</strong> {transacao.id}</p>
      <p><strong>Tipo:</strong> {transacao.tipo}</p>
      <p>
        <strong>Valor:</strong>{" "}
        <span className={transacao.valor >= 0 ? "text-green-600" : "text-red-600"}>
          R$ {Math.abs(transacao.valor).toFixed(2)}
        </span>
      </p>
      <p><strong>Data:</strong> {transacao.data.toLocaleDateString("pt-BR")}</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => router.back()}
      >
        Voltar
      </button>
    </main>
  );
}
