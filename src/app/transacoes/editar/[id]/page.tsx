"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Transacao, TipoTransacao } from "@/models/Transacao";
import Link from "next/link";
import { useTransacoes } from "@/contexts/TransacaoContext";
import Input from "@/DesignSystem/Input";
import Select from "@/DesignSystem/Select";
import { Button } from "@/DesignSystem";
import Card from "@/DesignSystem/Card";
import { SidebarMenu } from "@/components/SidebarMenu";
import { ExtratoTransacoes } from "@/components/ExtratoTransacoes";
import Alert from "@/DesignSystem/Alert/Alert";

export default function EditarTransacaoPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const { transacoes, atualizarTransacao } = useTransacoes();

   const [alerta, setAlerta] = useState<{
    tipo: "success" | "error" | "info" | "warning";
    titulo: string;
    mensagem?: string;
    } | null>(null);

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

    setAlerta({
      tipo: "success",
      titulo: "Editado com sucesso",
      mensagem: "Transação atualizada com sucesso!",
    });
    
  };

  return (
    <main className="flex min-h-screen bg-gray-100">

      <SidebarMenu />

      <section className="w-3/5 p-6 space-y-6 card-transacoes">

      <Card className="card-transacoes">

        {alerta && (
                <Alert
                  type="success"
                  title="Tudo certo!"
                  message="A operação foi concluída com sucesso."
                  dismissible
                  autoDismiss
                  dismissAfter={4000}
              />
              )}
       
      <h1 className="text-2xl font-bold mb-4">Editar Transação</h1>

      <form onSubmit={handleEditar} className="space-y-4">
        <div>
          <label className="block mb-1">Tipo</label>
            <Select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value as TipoTransacao)}
                  options={[
                    { label: "Depósito", value: "depósito" },
                    { label: "Transferência", value: "transferência" },
                    { label: "Pagamento", value: "pagamento" },
                  ]}
                />
        </div>

        <div>
          <label className="block mb-1">Valor</label>
         <Input
          type="text"
          value={valor}
          onChange={(e) => setValor(Number(e.target.value))}
        />
        </div>

        <div>
          <label className="block mb-1">Data</label>
          <Input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center mt-6">
          <Link href="/transacoes" className="text-blue-600 underline">
          <Button variant="primary">Cancelar</Button>
          </Link>
         <Button variant="primary">Adicionar</Button>
        </div>
      </form>

      </Card>
      </section>

        <aside className="w-1/5 p-6">
          <ExtratoTransacoes />
      </aside>
    </main>
  );
}
