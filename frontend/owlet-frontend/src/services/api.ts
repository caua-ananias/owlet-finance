import { Transaction } from "@/src/types/Transaction";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function fetchTransactions(): Promise<Transaction[]> {
    try {
        const response = await fetch(`${API_URL}/transactions`, {
            cache: "no-store", // Garante que sempre pegue dados novos (sem cache)
        });

        if (!response.ok) {
            throw new Error("Failed to fetch transactions");
        }

        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar transações:", error);
        return [];
    }
}