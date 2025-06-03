import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import Card from "@/DesignSystem/Card";

interface Props {
  saldo: number;
}

export function CardBoasVindas({ saldo }: Props) {
  const dataFormatada = format(new Date(), "EEEE, dd/MM/yyyy", {
    locale: ptBR,
  });

  return (
    <div className="card-boas-vindas rounded-lg shadow p-6 flex justify-between items-start">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Bem-vindo(a), Dani!</h2>
        <p className="text-white text-xs">Hoje é {dataFormatada}</p>
      </div>

      <div className="text-left">
        <p className="text-sm text-white-500">Saldo Atual</p>
        <hr className="my-2 hr-secondary" />

        <p className="text-white text-sm">Conta Corrente</p>
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