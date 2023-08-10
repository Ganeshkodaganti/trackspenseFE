export interface TransactionModel {
  transactionId: string;
  transactionName: string;
  transactionDescription: string;
  transactionCategory: string;
  transactionDate: Date;
  transactionAmount: number;
  userId: string;
}
