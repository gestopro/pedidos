
import { User, Product, Client, PriceList, Order, CalendarEvent } from './types';

// Initial Mock Data
const INITIAL_USERS: User[] = [
  { id: '1', username: 'admin', password: '123', role: 'EMPRESA', name: 'Administrador CAMIS' },
  // FIX: Change priceListId to assignedPriceListIds to match User type
  { id: '2', username: 'vendedor1', password: '123', role: 'VENDEDOR', name: 'Juan Pérez', assignedPriceListIds: ['list1'] }
];

export const loadData = <T,>(key: string, initial: T): T => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initial;
  } catch (error) {
    console.error(`Error loading data for key ${key}:`, error);
    return initial;
  }
};

export const saveData = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving data for key ${key}:`, error);
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      alert('¡ATENCIÓN!: No hay espacio suficiente en el navegador para guardar más datos (posiblemente por imágenes muy pesadas). Intenta subir archivos más ligeros.');
    }
  }
};
