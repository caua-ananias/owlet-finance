// Define os tipos possíveis (igual ao Enum do Java)
export type TransactionType = 'INCOME' | 'EXPENSE';

// Define a estrutura da Transação
export interface Transaction {
    id: string;
    description: string;
    amount: number;
    date: string; // O JSON retorna data como string (ISO 8601)
    type: TransactionType;
}