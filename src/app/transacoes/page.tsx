"use client";

import Link from "next/link";
import { useTransacoes } from "@/contexts/TransacaoContext";
import { SidebarMenu } from "@/components/SidebarMenu";
import { ExtratoTransacoes } from "@/components/ExtratoTransacoes";
import Card from "@/DesignSystem/Card";
import { useState } from "react";
import Alert from "@/DesignSystem/Alert/Alert";
import ConfirmModal from "@/DesignSystem/ConfirmModal";

export default function ListagemTransacoesPage() {
  const { transacoes, setTransacoes } = useTransacoes();

  const [alerta, setAlerta] = useState<{
  tipo: "success" | "error" | "info" | "warning";
  titulo: string;
  mensagem?: string;
  } | null>(null);

  const [modalAberto, setModalAberto] = useState(false);
  const [idParaExcluir, setIdParaExcluir] = useState<string | null>(null);

  const excluirTransacao = (id: string) => {
    setIdParaExcluir(id);
    setModalAberto(true);
  };

 const confirmarExclusao = () => {
    if (idParaExcluir) {
      setTransacoes(transacoes.filter((t) => t.id !== idParaExcluir));
      setAlerta({
      tipo: "success",
      titulo: "Excluído com sucesso",
      mensagem: "A transação foi removida.",
    });
      setIdParaExcluir(null);
    }
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
      <h1 className="text-2xl font-bold mb-6">Transações</h1>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2 border-transparent">Tipo</th>
            <th className="text-left p-2 border-transparent">Valor</th>
            <th className="text-left p-2 border-transparent">Data</th>
            <th className="text-left p-2 border-transparent">Ações</th>
          </tr>
        </thead>
        <tbody>
          {transacoes.map((t) => (
            <tr key={t.id} className="hover:bg-gray-50">
              <td className="p-2 border-transparent">{t.tipo}</td>
              <td
                className={`p-2 border-transparent ${
                  t.valor >= 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                R$ {Math.abs(t.valor).toFixed(2)}
              </td>
              <td className="p-2 border-transparent">
                {t.data.toLocaleDateString("pt-BR")}
              </td>
              <td className="p-2 border-transparent space-x-2 flex items-center">
                <Link
                  href={`/transacoes/${t.id}`}
                  className="text-blue-600 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>

                </Link>
                <Link
                  href={`/transacoes/editar/${t.id}`}
                  className="text-yellow-600 cursor-pointer"
                >
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" strokeWidth={1.5} stroke="currentColor" className="size-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                 </svg>

                </Link>
                <button
                  onClick={() => excluirTransacao(t.id)}
                  className="text-red-600 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </Card>
      </section>

      <aside className="w-1/5 p-6">
              <ExtratoTransacoes />
      </aside>

      <ConfirmModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onConfirm={confirmarExclusao}
        title="Confirmar exclusão"
        description="Tem certeza que deseja excluir esta transação? Essa ação não poderá ser desfeita."
      />
    </main>
    
  );
}
