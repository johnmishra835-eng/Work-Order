export type Screen = 'drafting' | 'history' | 'preview' | 'sync';

export interface WorkOrder {
  id: string;
  clientName: string;
  clientEmail: string;
  siteAddress: string;
  date: string;
  validUntil: string;
  lineItems: LineItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  status: 'COMPLETED' | 'SIGNED' | 'INVOICED' | 'QUOTED' | 'DRAFT';
  syncStatus: 'SYNCED' | 'PENDING' | 'LOCAL';
  scopeOfWork: string;
}

export interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}
