import { useTransacoes } from "@/contexts/TransacaoContext";

export function ExtratoTransacoes() {
  const { transacoes } = useTransacoes();

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold mb-4 title-primary">Extrato</h3>
      <ul className="divide-y divide-gray-200 max-h-[400px] overflow-auto">
        {transacoes.slice(0, 5).map((t) => (
          <li
            key={t.id}
            className="py-2 flex justify-between text-sm cursor-pointer hover:bg-gray-100"
          >
            <span>{t.tipo}</span>
            <span className={t.valor >= 0 ? "text-green-600" : "text-red-600"}>
              R$ {Math.abs(t.valor).toFixed(2)}
            </span>
          </li>
        ))}
        {transacoes.length === 0 && (
          <li className="text-gray-500 text-center py-4">Nenhuma transação</li>
        )}
      </ul>
    </div>
  );
}