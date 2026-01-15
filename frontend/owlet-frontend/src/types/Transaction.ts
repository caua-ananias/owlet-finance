export type TransactionType = 'INCOME' | 'EXPENSE';

// Define a estrutura da Transação
export interface Transaction {
    id: string;
    description: string;
    amount: number;
    date: string;
    type: TransactionType;
}