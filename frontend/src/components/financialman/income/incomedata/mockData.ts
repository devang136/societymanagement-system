export interface Resident {
  id: string;
  name: string;
  unitNumber: string;
  date: string;
  status: 'Tenant' | 'Owner';
  phoneNumber: string;
  amount: number;
  penalty: number | null;
  paymentStatus: 'Pending' | 'Done';
  paymentType: 'Online' | 'Cash';
  avatar: string;
}

export interface OtherIncome {
  id: string;
  title: string;
  amountPerMember: number;
  totalMember: number;
  date: string;
  dueDate: string;
  description: string;
}

export const MOCK_RESIDENTS: Resident[] = [
  {
    id: '1',
    name: 'Cody Fisher',
    unitNumber: '1001',
    date: '2024-02-10',
    status: 'Owner',
    phoneNumber: '92524 12365',
    amount: 1000,
    penalty: null,
    paymentStatus: 'Pending',
    paymentType: 'Online',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cody%20Fisher'
  },
  {
    id: '2',
    name: 'Esther Howard',
    unitNumber: '1002',
    date: '2024-02-11',
    status: 'Owner',
    phoneNumber: '92458 12865',
    amount: 1000,
    penalty: 250,
    paymentStatus: 'Done',
    paymentType: 'Cash',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Esther%20Howard'
  }
];

export const MOCK_OTHER_INCOME: OtherIncome[] = [
  {
    id: '1',
    title: 'Ganesh Chaturthi',
    amountPerMember: 1500,
    totalMember: 12,
    date: '2024-01-07',
    dueDate: '2024-07-10',
    description: 'The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesha in.'
  },
  {
    id: '2',
    title: 'Navratri',
    amountPerMember: 1500,
    totalMember: 12,
    date: '2024-01-07',
    dueDate: '2024-07-10',
    description: 'The celebration of Navratri involves nine nights of dance and devotional celebration.'
  }
];