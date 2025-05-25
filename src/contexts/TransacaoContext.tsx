"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Transacao } from "@/models/Transacao";
import { transacoesMock } from "@/data/transacoes";

type TransacaoContextType = {
  transacoes: Transacao[];
  setTransacoes: (transacoes: Transacao[]) => void;
  atualizarTransacao: (transacaoAtualizada: Transacao) => void;
  adicionarTransacao: (nova: Transacao) => void; 
};

const TransacaoContext = createContext<TransacaoContextType | undefined>(
  undefined
);

export const TransacaoProvider = ({ children }: { children: ReactNode }) => {
  const [transacoes, setTransacoes] = useState<Transacao[]>(transacoesMock);

  const atualizarTransacao = (transacaoAtualizada: Transacao) => {
    setTransacoes((prev) =>
      prev.map((t) => (t.id === transacaoAtualizada.id ? transacaoAtualizada : t))
    );
  };

  const adicionarTransacao = (nova: Transacao) => {
  setTransacoes((prev) => [...prev, nova]);
};

  return (
    <TransacaoContext.Provider
      value={{ transacoes, setTransacoes, atualizarTransacao, adicionarTransacao, }}
    >
      {children}
    </TransacaoContext.Provider>
  );
};

export const useTransacoes = () => {
  const context = useContext(TransacaoContext);
  if (!context) {
    throw new Error("useTransacoes deve ser usado dentro de TransacaoProvider");
  }
  return context;
};
