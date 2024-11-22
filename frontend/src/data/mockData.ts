import { Income, Expense, Note } from '@/types/expense';

export interface Maintenance {
  id: number;
  date: Date;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
}

export interface Resident {
  id: string;
  name: string;
  unit: string;
  wing: string;
  type: 'owner' | 'tenant';
  status: 'active' | 'inactive';
  contactNumber: string;
  email: string;
}

export interface OtherIncome {
  id: number;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
  reference: string;
}

export const mockIncomes: Income[] = [
  {
    id: 1,
    date: new Date('2024-01-15'),
    description: 'Rental Income',
    amount: 1500,
    category: 'Rent',
  },
  {
    id: 2,
    date: new Date('2024-01-20'),
    description: 'Parking Fee',
    amount: 300,
    category: 'Parking',
  },
];

export const mockExpenses: Expense[] = [
  {
    id: 1,
    date: new Date('2024-01-10'),
    description: 'Building Maintenance',
    amount: 500,
    category: 'Maintenance',
  },
  {
    id: 2,
    date: new Date('2024-01-25'),
    description: 'Utilities',
    amount: 800,
    category: 'Utilities',
  },
];

export const mockNotes: Note[] = [
  {
    id: 1,
    date: new Date('2024-01-05'),
    title: 'Budget Meeting',
    content: 'Discuss Q1 2024 budget allocation',
    priority: 'High',
  },
  {
    id: 2,
    date: new Date('2024-01-12'),
    title: 'Maintenance Schedule',
    content: 'Plan routine maintenance tasks',
    priority: 'Medium',
  },
];

export const mockMaintenance: Maintenance[] = [
  {
    id: 1,
    date: new Date('2024-01-08'),
    title: 'HVAC Repair',
    description: 'Fix air conditioning system',
    status: 'In Progress',
    priority: 'High',
  },
  {
    id: 2,
    date: new Date('2024-01-18'),
    title: 'Plumbing Check',
    description: 'Routine plumbing inspection',
    status: 'Pending',
    priority: 'Medium',
  },
];

export const MOCK_RESIDENTS: Resident[] = [
  {
    id: '1',
    name: 'John Doe',
    unit: '101',
    wing: 'A',
    type: 'owner',
    status: 'active',
    contactNumber: '+1234567890',
    email: 'john.doe@example.com'
  },
  {
    id: '2',
    name: 'Jane Smith',
    unit: '202',
    wing: 'B',
    type: 'tenant',
    status: 'active',
    contactNumber: '+1987654321',
    email: 'jane.smith@example.com'
  }
];

export const MOCK_OTHER_INCOME: OtherIncome[] = [
  {
    id: 1,
    date: new Date('2024-01-15'),
    description: 'Facility Rental',
    amount: 500,
    category: 'Rental',
    paymentMethod: 'Bank Transfer',
    reference: 'FR-2024-001'
  },
  {
    id: 2,
    date: new Date('2024-01-20'),
    description: 'Vending Machine Revenue',
    amount: 300,
    category: 'Miscellaneous',
    paymentMethod: 'Cash',
    reference: 'VM-2024-001'
  }
];
