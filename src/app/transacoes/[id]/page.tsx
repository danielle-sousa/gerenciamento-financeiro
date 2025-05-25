import { Transacao } from "@/models/Transacao";
import { transacoesMock } from "@/data/transacoes";
import { notFound } from "next/navigation";
import Link from "next/link";

type Params = {
  params: {
    id: string;
  };
};

export default function DetalheTransacaoPage({ params }: Params) {
  const transacao = transacoesMock.find((t) => t.id === params.id);

  if (!transacao) {
    return notFound(); 
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Detalhes da Transação</h1>

      <div className="space-y-4 border p-4 rounded-lg shadow">
        <p><strong>Tipo:</strong> {transacao.tipo}</p>
        <p><strong>Valor:</strong> R$ {Math.abs(transacao.valor).toFixed(2)}</p>
        <p><strong>Data:</strong> {transacao.data.toLocaleDateString("pt-BR")}</p>
        <p><strong>Descrição:</strong> {transacao.getDescricao()}</p>
      </div>

      <Link
        href="/transacoes"
        className="inline-block mt-6 text-blue-600 underline"
      >
        ← Voltar para listagem
      </Link>
    </main>
  );
}
