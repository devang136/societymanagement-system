export interface Invoice {
  invoiceId: string;
  ownerName: string;
  billDate: string;
  paymentDate: string;
  phoneNumber: string;
  email: string;
  maintenanceAmount: number;
  pendingAmount: number;
  address: string;
}

export interface MaintenanceCard {
  billDate: string;
  pendingDate: string;
  maintenanceAmount: number;
  penaltyAmount: number;
  total: number;
}

export interface PaymentMethod {
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}