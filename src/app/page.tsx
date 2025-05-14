import { transacoesMock } from "@/data/transacoes";
import { Transacao } from "@/models/Transacao";

export default function HomePage() {
  const saldoTotal = transacoesMock.reduce((acc, t) => acc + t.valor, 0);

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
          {transacoesMock.map((t) => (
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
        <p className="text-gray-600">[Formulário a ser implementado]</p>
      </section>
    </main>
  );
}
