"use client"; // Transforma em Client Component

import { useEffect, useState } from "react";
import { fetchTransactions } from "@/src/services/api";
import { Transaction } from "@/src/types/Transaction";
import TransactionModal from "@/src/components/TransactionModal"; // Importe o Modal

export default function Home() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Busca dados ao carregar a página
    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        const data = await fetchTransactions();
        setTransactions(data);
    }

    // Cálculos
    const totalBalance = transactions.reduce((acc, t) => {
        return t.type === 'INCOME' ? acc + t.amount : acc - t.amount;
    }, 0);

    const income = transactions
        .filter(t => t.type === 'INCOME')
        .reduce((acc, t) => acc + t.amount, 0);

    const expense = transactions
        .filter(t => t.type === 'EXPENSE')
        .reduce((acc, t) => acc + t.amount, 0);

    return (
        <main className="min-h-screen bg-slate-950 text-slate-200 p-8 font-sans">

            {/* O Modal vive aqui, mas só aparece se isModalOpen for true */}
            <TransactionModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    loadData(); // Recarrega os dados quando fecha o modal (se salvou algo)
                }}
            />

            <div className="max-w-5xl mx-auto space-y-8">

                <header className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <span className="text-2xl">🦉</span>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-white">
                            Owlet <span className="text-emerald-500">Finance</span>
                        </h1>
                    </div>

                    {/* Botão agora abre o Modal */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-emerald-900/20 active:scale-95 border border-emerald-500/50"
                    >
                        + Nova Transação
                    </button>
                </header>

                {/* ... (O RESTO DO CÓDIGO DOS CARDS E TABELA CONTINUA IGUAL ABAIXO) ... */}
                {/* ... Copie os Cards e a Tabela do código anterior e cole aqui ... */}

                {/* Cards de Resumo */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card Total */}
                    <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Saldo Total</p>
                        <p className="text-3xl font-bold text-white">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalBalance)}
                        </p>
                    </div>

                    {/* Card Entradas */}
                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 shadow-xl">
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Entradas</p>
                        <p className="text-2xl font-semibold text-emerald-400">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(income)}
                        </p>
                    </div>

                    {/* Card Saídas */}
                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 shadow-xl">
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Saídas</p>
                        <p className="text-2xl font-semibold text-red-400">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(expense)}
                        </p>
                    </div>
                </div>

                {/* Tabela */}
                <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-950/50 text-slate-400 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-medium">Descrição</th>
                                <th className="px-6 py-4 font-medium">Data</th>
                                <th className="px-6 py-4 font-medium text-right">Valor</th>
                                <th className="px-6 py-4 font-medium text-center">Status</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                            {transactions.map((t) => (
                                <tr key={t.id} className="hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-200">{t.description}</td>
                                    <td className="px-6 py-4 text-slate-500 font-mono text-sm">
                                        {/* Pega "2026-01-14", divide em partes e inverte para "14/01/2026" */}
                                        {t.date.split('-').reverse().join('/')}
                                    </td>
                                    <td className={`px-6 py-4 text-right font-bold font-mono tracking-tight ${
                                        t.type === 'INCOME' ? 'text-emerald-400' : 'text-red-400'
                                    }`}>
                                        {t.type === 'EXPENSE' ? '- ' : '+ '}
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(t.amount)}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          t.type === 'INCOME'
                              ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20'
                              : 'bg-red-400/10 text-red-400 border border-red-400/20'
                      }`}>
                        {t.type === 'INCOME' ? 'Recebido' : 'Pago'}
                      </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </section>

            </div>
        </main>
    );
}