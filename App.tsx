
import React, { useState, useEffect } from 'react';
import { User, Product, Client, PriceList, Order, CalendarEvent, BankAccount, SupportChannel, Notification, CommissionCut } from './types';
import { loadData, saveData } from './store';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProductsView from './components/ProductsView';
import ClientsView from './components/ClientsView';
import PriceListsView from './components/PriceListsView';
import SellerPriceListView from './components/SellerPriceListView';
import AgendaView from './components/AgendaView';
import NewOrderView from './components/NewOrderView';
import ReportsView from './components/ReportsView';
import SellerManagementView from './components/SellerManagementView';
import OrderTrackingView from './components/OrderTrackingView';
import CollectionHistoryView from './components/CollectionHistoryView';
import CoverageView from './components/CoverageView';
import BankAccountsView from './components/BankAccountsView';
import MyAccountsView from './components/MyAccountsView';
import SupportDepartmentsView from './components/SupportDepartmentsView';

const INITIAL_CHANNELS: SupportChannel[] = [
  {
    id: '1',
    name: 'María García',
    department: 'Logística y Almacén',
    role: 'Coordinadora de Envíos',
    description: 'Encargada de la preparación de pedidos, asignación de guías de rastreo y resolución de problemas con paqueterías.',
    email: 'logistica@gestopro.com',
    phone: '521234567890',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200',
    color: 'blue',
    helpItems: ['Retrasos en envíos', 'Errores de surtido', 'Asignación de guías']
  },
  {
    id: '2',
    name: 'Roberto Sánchez',
    department: 'Contabilidad y Finanzas',
    role: 'Jefe de Facturación',
    description: 'Responsable de la validación de pagos, emisión de facturas (CFDI), notas de crédito y estados de cuenta.',
    email: 'contabilidad@gestopro.com',
    phone: '521098765432',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200',
    color: 'pink',
    helpItems: ['Aclaraciones de saldos', 'Errores en facturación', 'Validación de pagos']
  }
];

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => loadData('current_user', null));
  const [view, setView] = useState<string>('dashboard');
  const [preSelectedClientId, setPreSelectedClientId] = useState<string | null>(null);
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [trackingSearchTerm, setTrackingSearchTerm] = useState<string>('');
  
  const [users, setUsers] = useState<User[]>(() => loadData('users', []));
  const [products, setProducts] = useState<Product[]>(() => loadData('products', []));
  const [clients, setClients] = useState<Client[]>(() => loadData('clients', []));
  const [priceLists, setPriceLists] = useState<PriceList[]>(() => loadData('price_lists', []));
  const [orders, setOrders] = useState<Order[]>(() => loadData('orders', []));
  const [events, setEvents] = useState<CalendarEvent[]>(() => loadData('events', []));
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(() => loadData('bank_accounts', []));
  const [companyLogo, setCompanyLogo] = useState<string | null>(() => loadData('company_logo', null));
  const [supportChannels, setSupportChannels] = useState<SupportChannel[]>(() => loadData('support_channels', INITIAL_CHANNELS));
  const [supportSchedule, setSupportSchedule] = useState<string>(() => loadData('support_schedule', 'Lunes a Viernes de 9:00 AM a 6:00 PM'));
  const [supportProtocol, setSupportProtocol] = useState<string>(() => loadData('support_protocol', 'Para una resolución más rápida, ten a la mano tu número de folio o nombre del cliente al momento de contactar a cualquier departamento.'));
  const [notifications, setNotifications] = useState<Notification[]>(() => loadData('notifications', []));
  const [commissionCuts, setCommissionCuts] = useState<CommissionCut[]>(() => loadData('commission_cuts', []));

  useEffect(() => {
    saveData('users', users);
    saveData('products', products);
    saveData('clients', clients);
    saveData('price_lists', priceLists);
    saveData('orders', orders);
    saveData('events', events);
    saveData('bank_accounts', bankAccounts);
    saveData('current_user', currentUser);
    saveData('company_logo', companyLogo);
    saveData('support_channels', supportChannels);
    saveData('support_schedule', supportSchedule);
    saveData('support_protocol', supportProtocol);
    saveData('notifications', notifications);
    saveData('commission_cuts', commissionCuts);
  }, [users, products, clients, priceLists, orders, events, bankAccounts, currentUser, companyLogo, supportChannels, supportSchedule, supportProtocol, notifications, commissionCuts]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('current_user');
  };

  const markNotificationsAsRead = () => {
    if (!currentUser) return;
    setNotifications(prev => prev.map(n => n.userId === currentUser.id ? { ...n, read: true } : n));
  };

  const handleNotificationClick = (notif: Notification) => {
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
    setTrackingSearchTerm(notif.folio);
    setView('tracking');
  };

  const addNotification = (notif: Omit<Notification, 'id' | 'date' | 'read'>) => {
    const newNotif: Notification = {
      ...notif,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev].slice(0, 50));
  };

  const handleOrderClient = (clientId: string) => {
    setPreSelectedClientId(clientId);
    setEditingOrderId(null);
    setView('new_order');
  };

  const handleEditOrder = (orderId: string) => {
    setEditingOrderId(orderId);
    setPreSelectedClientId(null);
    setView('new_order');
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} users={users} setUsers={setUsers} />;
  }

  const hasPermission = (permission: string) => {
    if (currentUser.role === 'EMPRESA') return true;
    return currentUser.permissions?.includes(permission);
  };

  const renderView = () => {
    switch (view) {
      case 'dashboard': 
        return (
          <Dashboard 
            user={currentUser} 
            orders={orders} 
            products={products} 
            users={users} 
            clients={clients}
            notifications={notifications}
            onMarkAllRead={markNotificationsAsRead} 
            onNotificationClick={handleNotificationClick}
          />
        );
      
      case 'products': 
        return hasPermission('products') 
          ? <ProductsView user={currentUser} products={products} setProducts={setProducts} orders={orders} />
          : <Dashboard user={currentUser} orders={orders} products={products} users={users} clients={clients} notifications={notifications} onMarkAllRead={markNotificationsAsRead} onNotificationClick={handleNotificationClick} />;

      case 'clients':
        return hasPermission('clients')
          ? <ClientsView 
              user={currentUser} 
              clients={clients} 
              setClients={setClients} 
              orders={orders} 
              products={products} 
              onOrderClient={handleOrderClient}
            />
          : <Dashboard user={currentUser} orders={orders} products={products} users={users} clients={clients} notifications={notifications} onMarkAllRead={markNotificationsAsRead} onNotificationClick={handleNotificationClick} />;

      case 'price_lists': 
        if (currentUser.role === 'EMPRESA') {
          return (
            <PriceListsView 
              priceLists={priceLists} 
              setPriceLists={setPriceLists} 
              products={products} 
              setProducts={setProducts} 
              companyLogo={companyLogo}
              setCompanyLogo={setCompanyLogo}
            />
          );
        }
        return hasPermission('price_list_view')
          ? <SellerPriceListView user={currentUser} priceLists={priceLists} products={products} companyLogo={companyLogo} />
          : <Dashboard user={currentUser} orders={orders} products={products} users={users} clients={clients} notifications={notifications} onMarkAllRead={markNotificationsAsRead} onNotificationClick={handleNotificationClick} />;

      case 'tracking': 
        return hasPermission('tracking')
          ? <OrderTrackingView 
              user={currentUser} 
              orders={orders} 
              setOrders={setOrders} 
              products={products} 
              users={users} 
              onEditOrder={handleEditOrder} 
              companyLogo={companyLogo} 
              initialSearch={trackingSearchTerm}
              onSearchHandled={() => setTrackingSearchTerm('')}
              addNotification={addNotification}
            />
          : <Dashboard user={currentUser} orders={orders} products={products} users={users} clients={clients} notifications={notifications} onMarkAllRead={markNotificationsAsRead} onNotificationClick={handleNotificationClick} />;

      case 'collection_history':
        return hasPermission('collection_history')
          ? <CollectionHistoryView user={currentUser} orders={orders} users={users} clients={clients} setOrders={setOrders} commissionCuts={commissionCuts} setCommissionCuts={setCommissionCuts} companyLogo={companyLogo} />
          : <Dashboard user={currentUser} orders={orders} products={products} users={users} clients={clients} notifications={notifications} onMarkAllRead={markNotificationsAsRead} onNotificationClick={handleNotificationClick} />;

      case 'support':
        return <SupportDepartmentsView user={currentUser} channels={supportChannels} setChannels={setSupportChannels} schedule={supportSchedule} setSchedule={setSupportSchedule} protocol={supportProtocol} setProtocol={setSupportProtocol} />;

      case 'agenda': 
        return hasPermission('agenda')
          ? <AgendaView user={currentUser} events={events} setEvents={setEvents} />
          : <Dashboard user={currentUser} orders={orders} products={products} users={users} clients={clients} notifications={notifications} onMarkAllRead={markNotificationsAsRead} onNotificationClick={handleNotificationClick} />;

      case 'new_order': 
        return hasPermission('new_order')
          ? <NewOrderView 
              user={currentUser} 
              clients={clients} 
              setClients={setClients} 
              products={products} 
              priceLists={priceLists} 
              orders={orders} 
              setOrders={setOrders} 
              preSelectedClientId={preSelectedClientId}
              editingOrderId={editingOrderId}
              onClearEdit={() => { setEditingOrderId(null); setView('tracking'); }}
              onClearPreSelect={() => setPreSelectedClientId(null)}
              addNotification={addNotification}
              users={users}
            />
          : <Dashboard user={currentUser} orders={orders} products={products} users={users} clients={clients} notifications={notifications} onMarkAllRead={markNotificationsAsRead} onNotificationClick={handleNotificationClick} />;

      case 'coverage':
        return currentUser.role === 'EMPRESA'
          ? <CoverageView users={users} />
          : <Dashboard user={currentUser} orders={orders} products={products} users={users} clients={clients} notifications={notifications} onMarkAllRead={markNotificationsAsRead} onNotificationClick={handleNotificationClick} />;

      case 'reports': 
        return hasPermission('reports')
          ? <ReportsView user={currentUser} orders={orders} clients={clients} products={products} users={users} />
          : <Dashboard user={currentUser} orders={orders} products={products} users={users} clients={clients} notifications={notifications} onMarkAllRead={markNotificationsAsRead} onNotificationClick={handleNotificationClick} />;

      case 'admin': 
        return currentUser.role === 'EMPRESA'
          ? <SellerManagementView users={users} setUsers={setUsers} priceLists={priceLists} bankAccounts={bankAccounts} />
          : <Dashboard user={currentUser} orders={orders} products={products} users={users} clients={clients} notifications={notifications} onMarkAllRead={markNotificationsAsRead} onNotificationClick={handleNotificationClick} />;

      case 'bank_accounts':
        return currentUser.role === 'EMPRESA'
          ? <BankAccountsView accounts={bankAccounts} setAccounts={setBankAccounts} />
          : <MyAccountsView user={currentUser} allAccounts={bankAccounts} />;

      default: return <Dashboard user={currentUser} orders={orders} products={products} users={users} clients={clients} notifications={notifications} onMarkAllRead={markNotificationsAsRead} onNotificationClick={handleNotificationClick} />;
    }
  };

  return (
    <div className="flex h-screen bg-pink-50 overflow-hidden">
      <Sidebar 
        user={currentUser} 
        activeView={view} 
        onViewChange={setView} 
        onLogout={handleLogout}
        companyLogo={companyLogo}
      />
      <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar print:p-0 print:bg-white print:overflow-visible">
        {renderView()}
      </main>
    </div>
  );
};

export default App;