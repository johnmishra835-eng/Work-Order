import React from 'react';
import { Settings2, RefreshCw, Table, MoveRight, History, SlidersHorizontal, Link, Link2Off } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const SyncScreen: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Page Header */}
      <section className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <h2 className="text-3xl font-black text-primary tracking-tight mb-2">Google Sheets Sync Status</h2>
          <p className="text-on-surface-variant max-w-xl text-sm">
            Monitor and configure the automated data bridge between 3 Phaze field work orders and your master industrial spreadsheet.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 border-2 border-primary text-primary font-bold text-xs uppercase tracking-widest hover:bg-primary/5 transition-colors rounded-sm active:scale-95 flex items-center gap-2">
            <Settings2 size={16} />
            Connection Settings
          </button>
          <button className="px-6 py-3 industrial-gradient text-white font-bold text-xs uppercase tracking-widest hover:shadow-lg transition-all rounded-sm active:scale-95 flex items-center gap-2">
            <RefreshCw size={16} />
            Sync Now
          </button>
        </div>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Connection Status Card */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-sm shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-safety-orange/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-[#e8f5e9] text-[#2e7d32] rounded-lg">
                  <Table size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary">Master Ops Ledger 2024</h3>
                  <p className="text-xs text-on-surface-variant font-mono uppercase">ID: 1x9vB-8Lq...5kJ8W</p>
                </div>
                <span className="ml-auto flex items-center gap-2 px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full text-[10px] font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 bg-safety-orange rounded-full animate-pulse"></span>
                  Live Connection
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-outline-variant/20">
                <div>
                  <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest mb-1">Last Sync</p>
                  <p className="text-lg font-bold text-primary">12m ago</p>
                </div>
                <div>
                  <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest mb-1">Rows Added</p>
                  <p className="text-lg font-bold text-primary">1,429</p>
                </div>
                <div>
                  <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest mb-1">Automated</p>
                  <p className="text-lg font-bold text-[#2e7d32]">Enabled</p>
                </div>
                <div>
                  <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest mb-1">Frequency</p>
                  <p className="text-lg font-bold text-primary">Real-time</p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-4">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Sync Path Visualizer</p>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-12 bg-surface-container rounded-sm flex items-center px-4">
                  <span className="text-[10px] font-bold text-on-surface-variant">3 Phaze Database</span>
                </div>
                <MoveRight className="text-safety-orange" size={20} />
                <div className="flex-1 h-12 border-2 border-dashed border-outline-variant rounded-sm flex items-center px-4">
                  <span className="text-[10px] font-bold text-on-surface-variant">Sheet: "Work_Order_Logs"</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Field Mapping Controls */}
        <div className="bg-surface-container-low p-8 rounded-sm shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em]">Field Mapping</h3>
            <SlidersHorizontal className="text-primary" size={20} />
          </div>
          <div className="space-y-6">
            <MappingRow label="Database Field" value="Order ID" col="Col A" />
            <MappingRow label="Technician" value="Lead Name" col="Col B" />
            <MappingRow label="Job Type" value="Service Code" col="Col E" />
            <MappingRow label="Materials" value="Inventory SKU" col="--" disabled />
            
            <button className="w-full mt-4 py-3 text-[10px] font-black text-primary uppercase tracking-[0.1em] border border-primary hover:bg-primary/5 transition-colors">
              Configure Mappings
            </button>
          </div>
        </div>

        {/* Sync Log Table */}
        <div className="lg:col-span-3 bg-surface-container-lowest rounded-sm shadow-sm overflow-hidden">
          <div className="px-8 py-6 flex justify-between items-center bg-primary text-white">
            <div className="flex items-center gap-3">
              <History size={20} />
              <h3 className="text-sm font-bold uppercase tracking-widest">Recent Sync Activity</h3>
            </div>
            <p className="text-[10px] font-medium text-on-primary-container">Last 24 Hours Activity</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container">
                <tr>
                  <th className="px-8 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Timestamp</th>
                  <th className="px-8 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Work Order ID</th>
                  <th className="px-8 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Action</th>
                  <th className="px-8 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Target Range</th>
                  <th className="px-8 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                <SyncLogRow time="2024-05-24 14:22:01" id="#WO-99210-IND" action="Update Row 142" range="Sheet1!A142:F142" status="Success" />
                <SyncLogRow time="2024-05-24 14:15:33" id="#WO-99209-RES" action="Insert New Row" range="Sheet1!A143:F143" status="Success" />
                <SyncLogRow time="2024-05-24 13:45:10" id="#WO-99208-IND" action="Update Row 89" range="Sheet1!A89:F89" status="Auth Error" isError />
                <SyncLogRow time="2024-05-24 12:00:59" id="#WO-99207-MAINT" action="Bulk Sync Trigger" range="Multiple Ranges" status="Success" />
              </tbody>
            </table>
          </div>
          <div className="px-8 py-4 border-t border-outline-variant/10 flex justify-center">
            <button className="text-[10px] font-black text-primary hover:text-safety-orange uppercase tracking-[0.2em] transition-colors">View Full Transaction Log</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MappingRow: React.FC<{ label: string; value: string; col: string; disabled?: boolean }> = ({ label, value, col, disabled }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{label}</label>
    <div className="flex items-center gap-3">
      <div className="flex-1 text-sm font-medium bg-surface-container-lowest py-2 px-3 border-b-2 border-outline-variant/30">{value}</div>
      {disabled ? <Link2Off size={14} className="text-on-surface-variant/30" /> : <Link size={14} className="text-on-surface-variant" />}
      <div className={cn("flex-1 text-sm font-bold", disabled ? "text-on-surface-variant/30" : "text-safety-orange")}>{col}</div>
    </div>
  </div>
);

const SyncLogRow: React.FC<{ time: string; id: string; action: string; range: string; status: string; isError?: boolean }> = ({ time, id, action, range, status, isError }) => (
  <tr className="hover:bg-surface transition-colors">
    <td className="px-8 py-5 text-xs font-medium text-on-surface">{time}</td>
    <td className="px-8 py-5 text-xs font-bold text-primary tracking-tight">{id}</td>
    <td className="px-8 py-5 text-xs text-on-surface-variant">{action}</td>
    <td className="px-8 py-5 font-mono text-[10px] text-on-surface-variant">{range}</td>
    <td className="px-8 py-5 text-right">
      <span className={cn(
        "px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest",
        isError ? "bg-red-100 text-red-700" : "bg-secondary-container text-on-secondary-container"
      )}>
        {status}
      </span>
    </td>
  </tr>
);
