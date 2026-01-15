"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface TransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function TransactionModal({ isOpen, onClose }: TransactionModalProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // --- CORREÇÃO DE DATA ---
    // Função que pega a data local (Brasil) corretamente
    const getLocalDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Mês começa em 0 no JS
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    // ------------------------

    // Estados do Formulário
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState<"INCOME" | "EXPENSE">("EXPENSE");

    // Inicializa com a data local correta
    const [date, setDate] = useState(getLocalDate());

    // Função de Salvar
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    description,
                    amount: parseFloat(amount.replace(",", ".")),
                    date,
                    type,
                    userId: "d6559158-e8d1-41a4-bb92-041c8a755f7b"
                }),
            });

            if (response.ok) {
                // Limpa o form
                setDescription("");
                setAmount("");
                setDate(getLocalDate()); // Reseta a data para hoje

                router.refresh();
                onClose();
            } else {
                alert("Erro ao salvar transação!");
            }
        } catch (error) {
            console.error(error);
            alert("Erro de conexão");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Header do Modal */}
                <div className="bg-slate-800/50 p-4 border-b border-slate-700 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-white">Nova Transação</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition">✕</button>
                </div>

                {/* Formulário */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">

                    {/* Descrição */}
                    <div>
                        <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Descrição</label>
                        <input
                            required
                            type="text"
                            placeholder="Ex: Mercado, Freelance..."
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    {/* Valor e Data */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Valor (R$)</label>
                            <input
                                required
                                type="number"
                                step="0.01"
                                placeholder="0,00"
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 transition"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Data</label>
                            <input
                                required
                                type="date"
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 transition [color-scheme:dark]"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Tipo (Radio Buttons Estilizados) */}
                    <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-lg border border-slate-800">
                        <button
                            type="button"
                            onClick={() => setType("INCOME")}
                            className={`p-2 rounded-md text-sm font-bold transition ${type === "INCOME" ? "bg-emerald-600 text-white shadow-lg" : "text-slate-500 hover:text-white"}`}
                        >
                            Entrada
                        </button>
                        <button
                            type="button"
                            onClick={() => setType("EXPENSE")}
                            className={`p-2 rounded-md text-sm font-bold transition ${type === "EXPENSE" ? "bg-red-500 text-white shadow-lg" : "text-slate-500 hover:text-white"}`}
                        >
                            Saída
                        </button>
                    </div>

                    {/* Botão Salvar */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-emerald-900/20 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Salvando..." : "Confirmar Transação"}
                    </button>

                </form>
            </div>
        </div>
    );
}