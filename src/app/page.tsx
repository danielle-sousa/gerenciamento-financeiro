"use client";

import { SidebarMenu } from "@/components/SidebarMenu";
import { CardBoasVindas } from "@/components/CardBoasVindas";
import { FormNovaTransacao } from "@/components/FormNovaTransacao";
import { ExtratoTransacoes } from "@/components/ExtratoTransacoes";
import { useTransacoes } from "@/contexts/TransacaoContext";
import Card from "@/DesignSystem/Card";

export default function HomePage() {
  const { transacoes } = useTransacoes();
  const saldo = transacoes.reduce((acc, t) => acc + t.valor, 0);

  return (
    <main className="flex min-h-screen bg-gray-100">
      <SidebarMenu />
      <section className="w-3/5 p-6 space-y-6">
        <CardBoasVindas saldo={saldo} />

        <Card>
          <h3 className="text-lg font-bold mb-4">Nova Transação</h3>
          <FormNovaTransacao />
        </Card>
 
      </section>
      <aside className="w-1/5 p-6">
        <ExtratoTransacoes />
      </aside>
    </main>
  );
}
