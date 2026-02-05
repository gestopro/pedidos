
import React from 'react';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Calendar, 
  UserPlus, 
  ClipboardList,
  LogOut,
  Settings,
  Plus,
  Trash2,
  Edit,
  Search,
  ChevronLeft,
  ChevronRight,
  Mail,
  FileText,
  ShieldCheck,
  Upload,
  Truck,
  Bell,
  Printer,
  Receipt,
  History,
  FileDown,
  Map as MapIcon,
  ImageIcon,
  LifeBuoy
} from 'lucide-react';

export const ICONS = {
  Clients: <Users size={20} />,
  Products: <Package size={20} />,
  Orders: <ShoppingCart size={20} />,
  Reports: <BarChart3 size={20} />,
  Agenda: <Calendar size={20} />,
  Admin: <Settings size={20} />,
  NewOrder: <Plus size={20} />,
  Logout: <LogOut size={20} />,
  Add: <Plus size={20} />,
  Delete: <Trash2 size={20} />,
  Edit: <Edit size={20} />,
  Search: <Search size={20} />,
  Left: <ChevronLeft size={20} />,
  Right: <ChevronRight size={20} />,
  Mail: <Mail size={20} />,
  Report: <FileText size={20} />,
  ClipboardList: <ClipboardList size={20} />,
  Permissions: <ShieldCheck size={20} />,
  Upload: <Upload size={20} />,
  Truck: <Truck size={20} />,
  Bell: <Bell size={20} />,
  Printer: <Printer size={20} />,
  Invoice: <Receipt size={20} />,
  History: <History size={20} />,
  FileDown: <FileDown size={20} />,
  Map: <MapIcon size={20} />,
  Image: <ImageIcon size={20} />,
  Help: <LifeBuoy size={20} />
};

export const STATES_MEXICO = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 
  'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Guanajuato', 
  'Guerrero', 'Hidalgo', 'Jalisco', 'Estado de México', 'Michoacán', 'Morelos', 
  'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 
  'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 
  'Veracruz', 'Yucatán', 'Zacatecas'
];

export const CATEGORIES = ['Paletas', 'Chocolates', 'Gomitas', 'Caramelos', 'Picosos', 'Bombones'];

export const AVAILABLE_PERMISSIONS = [
  { id: 'products', label: 'Ver Productos' },
  { id: 'clients', label: 'Gestionar Clientes' },
  { id: 'agenda', label: 'Ver Agenda' },
  { id: 'new_order', label: 'Crear Pedido' },
  { id: 'reports', label: 'Ver Informes' },
  { id: 'tracking', label: 'Seguimiento de Pedidos' },
  { id: 'price_list_view', label: 'Ver Mis Precios (Imprimir)' },
  { id: 'collection_history', label: 'Historial de Cobranza' },
  { id: 'cancel_order', label: 'Cancelar Pedidos' }
];
