import React from 'react';
import { TrendingUp, Clock, Zap, Filter, ArrowUpDown, Download, CheckCircle, History, Receipt, FileText, Edit, CloudOff, Cloud } from 'lucide-react';
import { WorkOrder } from '@/src/types';
import { cn } from '@/src/lib/utils';

export const HistoryScreen: React.FC = () => {
  const orders: WorkOrder[] = [
    { id: '#PJ-9982', clientName: 'DataCenter Cooling Expansion', siteAddress: 'Equinix - Sydney Site', date: 'Oct 24, 2024', validUntil: 'Nov 23, 2024', subtotal: 11000, taxRate: 0.13, taxAmount: 1450, total: 12450, status: 'COMPLETED', syncStatus: 'SYNCED', lineItems: [], scopeOfWork: '', clientEmail: '' },
    { id: '#PJ-9985', clientName: 'Switchboard Maintenance', siteAddress: 'Global Logistics Hub', date: 'Oct 28, 2024', validUntil: 'Nov 27, 2024', subtotal: 2500, taxRate: 0.12, taxAmount: 300, total: 2800, status: 'SIGNED', syncStatus: 'SYNCED', lineItems: [], scopeOfWork: '', clientEmail: '' },
    { id: '#PJ-9978', clientName: 'Emergency Conduit Repair', siteAddress: 'BHP Mine Complex', date: 'Oct 20, 2024', validUntil: 'Nov 19, 2024', subtotal: 8000, taxRate: 0.1175, taxAmount: 940, total: 8940, status: 'INVOICED', syncStatus: 'SYNCED', lineItems: [], scopeOfWork: '', clientEmail: '' },
    { id: '#PJ-1001', clientName: 'LED High-Bay Retrofit', siteAddress: 'Westfield Retail Center', date: 'Nov 02, 2024', validUntil: 'Dec 02, 2024', subtotal: 5000, taxRate: 0.12, taxAmount: 600, total: 5600, status: 'QUOTED', syncStatus: 'PENDING', lineItems: [], scopeOfWork: '', clientEmail: '' },
    { id: '#PJ-1004', clientName: 'Solar Array Grounding', siteAddress: 'Inquiry Phase', date: 'Nov 04, 2024', validUntil: 'Dec 04, 2024', subtotal: 0, taxRate: 0.13, taxAmount: 0, total: 0, status: 'DRAFT', syncStatus: 'LOCAL', lineItems: [], scopeOfWork: '', clientEmail: '' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] font-bold text-safety-orange uppercase tracking-[0.2em] mb-1 block">Administrative Control</span>
          <h2 className="text-4xl font-extrabold tracking-tight text-on-surface">Work Order History</h2>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest text-on-surface-variant text-sm font-semibold border-b-2 border-outline-variant/20 hover:border-safety-orange transition-all">
            <Filter size={14} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest text-on-surface-variant text-sm font-semibold border-b-2 border-outline-variant/20 hover:border-safety-orange transition-all">
            <ArrowUpDown size={14} />
            Sort
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest text-on-surface-variant text-sm font-semibold border-b-2 border-outline-variant/20 hover:border-safety-orange transition-all">
            <Download size={14} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 bg-surface-container-lowest shadow-sm rounded-sm">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Total Orders</p>
          <p className="text-3xl font-black text-primary">1,284</p>
          <div className="mt-4 flex items-center gap-2 text-[10px] text-green-600 font-bold">
            <TrendingUp size={12} />
            +12% vs last month
          </div>
        </div>
        <div className="p-6 bg-surface-container-lowest shadow-sm rounded-sm">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Total Revenue</p>
          <p className="text-3xl font-black text-primary">$412,890</p>
          <div className="mt-4 flex items-center gap-2 text-[10px] text-safety-orange font-bold">
            <Clock size={12} />
            $14k pending invoices
          </div>
        </div>
        <div className="md:col-span-2 p-6 bg-primary-container text-white rounded-sm relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[10px] font-bold text-on-primary-container uppercase tracking-widest mb-1">System Health</p>
            <p className="text-xl font-bold">Cloud Sync Status</p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold">
                <Zap size={14} />
                Live to Sheets
              </div>
              <p className="text-[10px] text-on-primary-container font-medium">Last sync: 2 minutes ago</p>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 opacity-10">
            <Zap size={160} />
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest shadow-sm rounded-sm overflow-hidden">
        <div className="p-6 border-b border-surface-container-high flex justify-between items-center">
          <h3 className="font-bold text-primary flex items-center gap-2">
            <History size={20} />
            Order Registry
          </h3>
          <div className="flex gap-4">
            <span className="flex items-center gap-1 text-[10px] font-bold text-on-surface-variant/50">
              <span className="w-2 h-2 bg-safety-orange rounded-full"></span>
              Urgent Actions Required
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.1em] text-on-surface-variant">Quote ID</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.1em] text-on-surface-variant">Client / Job Site</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.1em] text-on-surface-variant">Date</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.1em] text-on-surface-variant">Total Amount</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.1em] text-on-surface-variant">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.1em] text-on-surface-variant">Sync Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high">
              {orders.map((order, idx) => (
                <tr key={idx} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-6 py-5 font-bold text-primary text-sm">{order.id}</td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-on-surface">{order.clientName}</p>
                    <p className="text-xs text-on-surface-variant font-medium">{order.siteAddress}</p>
                  </td>
                  <td className="px-6 py-5 text-xs font-semibold text-on-surface-variant">{order.date}</td>
                  <td className={cn("px-6 py-5 text-sm font-bold", order.total === 0 ? 'text-on-surface-variant/50' : 'text-primary')}>
                    {order.total === 0 ? 'TBD' : `$${order.total.toLocaleString()}`}
                  </td>
                  <td className="px-6 py-5">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-5">
                    <SyncStatusBadge status={order.syncStatus} />
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 text-on-surface-variant/50 hover:text-primary transition-colors">
                      <Edit size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 bg-surface-container-low flex justify-between items-center border-t border-surface-container-high">
          <p className="text-xs font-semibold text-on-surface-variant">Showing 1 - 5 of 1,284 work orders</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-surface-container-lowest text-primary border border-outline-variant/30 text-xs font-bold rounded-sm">1</button>
            <button className="px-3 py-1 text-on-surface-variant hover:bg-surface-container-lowest text-xs font-bold rounded-sm transition-all">2</button>
            <button className="px-3 py-1 text-on-surface-variant hover:bg-surface-container-lowest text-xs font-bold rounded-sm transition-all">3</button>
            <span className="px-3 py-1 text-on-surface-variant text-xs font-bold">...</span>
            <button className="px-3 py-1 text-on-surface-variant hover:bg-surface-container-lowest text-xs font-bold rounded-sm transition-all">256</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusBadge: React.FC<{ status: WorkOrder['status'] }> = ({ status }) => {
  const styles = {
    COMPLETED: "bg-primary-container text-white",
    SIGNED: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    INVOICED: "bg-secondary-container text-on-secondary-container",
    QUOTED: "bg-primary-fixed text-on-primary-fixed-variant",
    DRAFT: "bg-surface-variant text-on-surface-variant",
  };

  const icons = {
    COMPLETED: <CheckCircle size={12} />,
    SIGNED: <History size={12} />,
    INVOICED: <Receipt size={12} />,
    QUOTED: <FileText size={12} />,
    DRAFT: <Edit size={12} />,
  };

  return (
    <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold flex items-center w-fit gap-1 uppercase", styles[status])}>
      {icons[status]}
      {status}
    </span>
  );
};

const SyncStatusBadge: React.FC<{ status: WorkOrder['syncStatus'] }> = ({ status }) => {
  if (status === 'SYNCED') {
    return (
      <div className="flex items-center gap-2 text-green-600">
        <Cloud size={16} />
        <span className="text-[10px] font-bold">SYNCED</span>
      </div>
    );
  }
  if (status === 'PENDING') {
    return (
      <div className="flex items-center gap-2 text-safety-orange">
        <Zap size={16} />
        <span className="text-[10px] font-bold">PENDING</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 text-on-surface-variant/50">
      <CloudOff size={16} />
      <span className="text-[10px] font-bold">LOCAL</span>
    </div>
  );
};
