import { createContext, useEffect, useState, ReactNode } from "react";
import { api } from "./services/api";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}


interface TransactionsProviderProps {
    children: ReactNode; //ReactNode accepts any content in React
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>; 

interface TransactionContextData {
  transactions: Transaction[];
  createTransaction: (Transactions: TransactionInput) => void ;
}

export const TransactionsContext = createContext<TransactionContextData>(
  {} as TransactionContextData
);
//usually an error happens here, force default to recognize the typing i want

export function TransactionsProvider({ children }: TransactionsProviderProps) {

const [transactions, setTransactions] = useState<Transaction[]>([]);

useEffect(() => {
    api
      .get("/transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  function createTransaction(transaction: TransactionInput) {
    api.post("/transactions", transaction);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};