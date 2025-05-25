import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

interface Props {
  saldo: number;
}

export function CardBoasVindas({ saldo }: Props) {
  const dataFormatada = format(new Date(), "EEEE, dd/MM/yyyy", {
    locale: ptBR,
  });

  return (
    <div className="bg-white rounded-lg shadow p-6 flex justify-between items-start">
      <div>
        <h2 className="text-xl font-bold">Bem-vindo de volta!</h2>
        <p className="text-gray-500 mt-1">{dataFormatada}</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">Saldo Atual</p>
        <p
          className={`text-2xl font-bold ${
            saldo >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          R$ {saldo.toFixed(2)}
        </p>
      </div>
    </div>
  );
}