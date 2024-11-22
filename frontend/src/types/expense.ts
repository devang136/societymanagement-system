export interface Expense {
  id: number;
  date: Date;
  description: string;
  amount: number;
  category: string;
}

export interface Income {
  id: number;
  date: Date;
  description: string;
  amount: number;
  category: string;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  date: Date;
  priority: 'High' | 'Medium' | 'Low';
}

export interface Maintenance {
  id: number;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  priority: 'High' | 'Medium' | 'Low';
  date: Date;
}