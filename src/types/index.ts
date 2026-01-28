export type Category = 'Goods' | 'Services' | 'Software';
export type RFPStatus = 'Draft' | 'Published' | 'Closed' | 'Cancelled';
export type VendorStatus = 'Active' | 'Inactive' | 'Pending';
export type VendorType = 'Goods' | 'Services' | 'Software' | 'Mixed';
export type ProposalStatus = 'Submitted' | 'Under Review' | 'Accepted' | 'Rejected';
export type EvaluationMethod = 'Lowest Price' | 'Technical Score' | 'Combined';

export interface RFPItem {
  id: string;
  name: string;
  specification: string;
  quantity: number;
  unit: string;
}

export interface RFP {
  id: string;
  title: string;
  category: Category;
  department: string;
  issueDate: string;
  closingDate: string;
  status: RFPStatus;
  evaluationMethod: EvaluationMethod;
  items: RFPItem[];
  proposalCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Vendor {
  id: string;
  name: string;
  type: VendorType;
  status: VendorStatus;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

export interface ProposalItem {
  id: string;
  itemId: string;
  itemName: string;
  unitPrice: number;
  quantity: number;
  tax: number;
  lineTotal: number;
}

export interface Proposal {
  id: string;
  rfpId: string;
  rfpTitle: string;
  vendorId: string;
  vendorName: string;
  items: ProposalItem[];
  subtotal: number;
  tax: number;
  totalAmount: number;
  status: ProposalStatus;
  submittedDate: string;
  notes: string;
}

export interface DashboardStats {
  totalRFPs: number;
  activeRFPs: number;
  pendingEvaluations: number;
  vendorsParticipated: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}
