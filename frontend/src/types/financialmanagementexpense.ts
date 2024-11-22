export interface Expense {
  id: string;
  title: string;
  description: string;
  date: string;
  amount: number;
  billFormat: 'PDF' | 'JPG';
  file?: File;
}