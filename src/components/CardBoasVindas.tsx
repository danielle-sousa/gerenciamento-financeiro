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
    <div className="bg-white rounded-lg shadow p-6 flex justify-between items-start">
      <Card className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Bem-vindo(a), Dani!</h2>
        <p className="text-gray-600">Hoje é {dataFormatada}</p>
      </Card>

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