
export type UserRole = 'EMPRESA' | 'VENDEDOR';
export type OrderStatus = 'PENDIENTE' | 'RECIBIDO' | 'PREPARANDO' | 'ENVIADO' | 'ENTREGADO' | 'CANCELADO';

export interface CustomDocument {
  id: string;
  name: string;
  data: string; // base64 PDF
}

export interface UserDocuments {
  situacionFiscal?: string; // base64 PDF
  ine?: string;            // base64 PDF
  comprobanteDomicilio?: string; // base64 PDF
  customDocs?: CustomDocument[];
}

export interface Notification {
  id: string;
  userId: string; // ID del destinatario
  orderId: string;
  folio: string;
  message: string;
  date: string;
  read: boolean;
  type: 'NEW_ORDER' | 'STATUS_CHANGE' | 'ORDER_EDIT' | 'CANCELATION';
}

export interface Payment {
  id: string;
  amount: number;
  date: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  holderName: string;
  accountNumber: string;
  clabe: string;
  observations?: string;
}

export interface SupportChannel {
  id: string;
  name: string;
  department: string;
  role: string;
  description: string;
  email: string;
  phone: string;
  avatar: string;
  color: 'pink' | 'blue';
  helpItems: string[];
}

export interface User {
  id: string;
  username: string;
  password?: string;
  role: UserRole;
  name: string;
  assignedPriceListIds?: string[]; // Soporte para múltiples listas
  permissions?: string[];
  hasCommission?: boolean;
  commissionPercentage?: number;
  assignedZones?: string[]; // Estados de México asignados
  documents?: UserDocuments; // Expediente digital
  assignedAccountIds?: string[]; // Cuentas de transferencia asignadas
  color?: string; // Color hexadecimal o clase de tailwind para identificación
}

export interface Address {
  street: string;
  number: string;
  neighborhood: string;
  municipality: string;
  state: string;
  zipCode: string;
}

export interface BlacklistEntry {
  date: string;
  action: 'BLOQUEO' | 'RESTAURACIÓN';
  reason: string;
  conditions?: string;
}

export interface Client {
  id: string;
  name: string;
  address: Address;
  email: string;
  phone: string;
  notes: string;
  vendedorId: string;
  isBlacklisted?: boolean;
  blacklistReason?: string;
  blacklistConditions?: string; 
  blacklistHistory?: BlacklistEntry[];
}

export interface Product {
  id: string;
  description: string;
  category: string;
  piecesPerBag: number;
  bagsPerBox: number;
  unitType: 'Caja' | 'Bolsa';
  unitCost: number;
  boxCost: number;
  imageUrl?: string;
}

export interface PriceList {
  id: string;
  name: string;
  prices: Record<string, number>; // productId -> custom price
}

export interface OrderItem {
  productId: string;
  quantity: number;
  priceAtTime: number;
}

export interface Deduction {
  id: string;
  amount: number;
  reason: string;
}

export interface CommissionCut {
  id: string;
  sellerId: string;
  folio: string;
  date: string;
  orderIds: string[];
  deductions: Deduction[];
  totalCommission: number;
  totalDeductions: number;
  netPayable: number;
  isPaid: boolean;
  paymentDate?: string;
  paymentReference?: string; // Folio que ampara el pago
}

export interface Order {
  id: string;
  folio: string;
  documentFolio?: string; 
  serialNumber: string;
  date: string;
  clientId: string; 
  clientRefId?: string; 
  vendedorId: string;
  items: OrderItem[];
  subtotal: number;
  ieps: number;
  total: number;
  totalBoxes: number;
  status: OrderStatus;
  seen: boolean;
  invoiceUrl?: string;
  remissionUrl?: string;
  trackingImageUrl?: string;
  trackingNumber?: string; // Nuevo campo para número de guía textual
  observations?: string;
  isInvoice?: boolean; 
  freightCost?: number; 
  creditNoteFolio?: string;
  creditNoteAmount?: number; 
  paymentComplementFolio?: string;
  payments?: Payment[];
  isCommissionPaid?: boolean;
  commissionPaidDate?: string;
  commissionCutId?: string; // Vinculación a un corte
  // Campos de cancelación
  cancelReason?: string;
  canceledBy?: string;
  cancelDate?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  vendedorId: string;
  description: string;
}
