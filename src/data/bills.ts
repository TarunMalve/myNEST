export type BillType = 'rent' | 'electricity' | 'water' | 'maintenance' | 'gas' | 'internet' | 'property_tax';
export type PaymentStatus = 'paid' | 'pending' | 'overdue' | 'partial';
export type PaymentMethod = 'UPI' | 'NEFT' | 'Card' | 'Cash' | 'Cheque';

export interface Bill {
  id: string;
  type: BillType;
  title: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: PaymentStatus;
  method?: PaymentMethod;
  flatId: string;
  userId: string;
  month: string;
  year: number;
  description?: string;
  receiptId?: string;
}

export const BILLS: Bill[] = [
  // March 2026
  { id: 'b1', type: 'rent', title: 'Monthly Rent', amount: 18000, dueDate: '2026-03-05', paidDate: '2026-03-03', status: 'paid', method: 'UPI', flatId: 'flat-a203', userId: 'u1', month: 'March', year: 2026, receiptId: 'RCP-2026-031' },
  { id: 'b2', type: 'electricity', title: 'MPEB Electricity Bill', amount: 1840, dueDate: '2026-03-15', paidDate: '2026-03-12', status: 'paid', method: 'UPI', flatId: 'flat-a203', userId: 'u1', month: 'March', year: 2026, description: '245 units @ ₹7.5/unit', receiptId: 'RCP-2026-032' },
  { id: 'b3', type: 'water', title: 'Water Charges', amount: 350, dueDate: '2026-03-20', status: 'pending', flatId: 'flat-a203', userId: 'u1', month: 'March', year: 2026 },
  { id: 'b4', type: 'maintenance', title: 'Society Maintenance', amount: 2500, dueDate: '2026-03-10', paidDate: '2026-03-08', status: 'paid', method: 'NEFT', flatId: 'flat-a203', userId: 'u1', month: 'March', year: 2026, receiptId: 'RCP-2026-033' },
  { id: 'b5', type: 'gas', title: 'PNG Gas Bill', amount: 680, dueDate: '2026-03-25', status: 'pending', flatId: 'flat-a203', userId: 'u1', month: 'March', year: 2026 },

  // February 2026
  { id: 'b6', type: 'rent', title: 'Monthly Rent', amount: 18000, dueDate: '2026-02-05', paidDate: '2026-02-04', status: 'paid', method: 'UPI', flatId: 'flat-a203', userId: 'u1', month: 'February', year: 2026, receiptId: 'RCP-2026-021' },
  { id: 'b7', type: 'electricity', title: 'MPEB Electricity Bill', amount: 2100, dueDate: '2026-02-15', paidDate: '2026-02-13', status: 'paid', method: 'UPI', flatId: 'flat-a203', userId: 'u1', month: 'February', year: 2026, receiptId: 'RCP-2026-022' },
  { id: 'b8', type: 'water', title: 'Water Charges', amount: 350, dueDate: '2026-02-20', paidDate: '2026-02-18', status: 'paid', method: 'Cash', flatId: 'flat-a203', userId: 'u1', month: 'February', year: 2026, receiptId: 'RCP-2026-023' },
  { id: 'b9', type: 'maintenance', title: 'Society Maintenance', amount: 2500, dueDate: '2026-02-10', paidDate: '2026-02-10', status: 'paid', method: 'NEFT', flatId: 'flat-a203', userId: 'u1', month: 'February', year: 2026, receiptId: 'RCP-2026-024' },
  { id: 'b10', type: 'gas', title: 'PNG Gas Bill', amount: 590, dueDate: '2026-02-25', paidDate: '2026-02-24', status: 'paid', method: 'UPI', flatId: 'flat-a203', userId: 'u1', month: 'February', year: 2026, receiptId: 'RCP-2026-025' },

  // January 2026
  { id: 'b11', type: 'rent', title: 'Monthly Rent', amount: 18000, dueDate: '2026-01-05', paidDate: '2026-01-05', status: 'paid', method: 'UPI', flatId: 'flat-a203', userId: 'u1', month: 'January', year: 2026, receiptId: 'RCP-2026-011' },
  { id: 'b12', type: 'electricity', title: 'MPEB Electricity Bill', amount: 1650, dueDate: '2026-01-15', paidDate: '2026-01-14', status: 'paid', method: 'Card', flatId: 'flat-a203', userId: 'u1', month: 'January', year: 2026, receiptId: 'RCP-2026-012' },
  { id: 'b13', type: 'water', title: 'Water Charges', amount: 350, dueDate: '2026-01-20', paidDate: '2026-01-19', status: 'paid', method: 'Cash', flatId: 'flat-a203', userId: 'u1', month: 'January', year: 2026, receiptId: 'RCP-2026-013' },
  { id: 'b14', type: 'maintenance', title: 'Society Maintenance', amount: 2500, dueDate: '2026-01-10', status: 'overdue', flatId: 'flat-a203', userId: 'u1', month: 'January', year: 2026 },
  { id: 'b15', type: 'property_tax', title: 'Property Tax (Annual)', amount: 8400, dueDate: '2026-01-31', paidDate: '2026-01-28', status: 'paid', method: 'NEFT', flatId: 'flat-a203', userId: 'u1', month: 'January', year: 2026, receiptId: 'RCP-2026-014' },
];

export const BILL_TYPE_LABELS: Record<BillType, string> = {
  rent: 'Rent',
  electricity: 'Electricity',
  water: 'Water',
  maintenance: 'Maintenance',
  gas: 'Gas',
  internet: 'Internet',
  property_tax: 'Property Tax',
};

export const BILL_TYPE_COLORS: Record<BillType, string> = {
  rent: '#4f46e5',
  electricity: '#f59e0b',
  water: '#3b82f6',
  maintenance: '#8b5cf6',
  gas: '#22c55e',
  internet: '#06b6d4',
  property_tax: '#ec4899',
};

export const getMonthlyTotal = (bills: Bill[], month: string, year: number): number =>
  bills.filter(b => b.month === month && b.year === year).reduce((sum, b) => sum + b.amount, 0);
