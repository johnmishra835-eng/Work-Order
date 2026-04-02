import React from 'react';
import { Send, RefreshCw, Download, Edit3, Table, CheckCircle2, Loader2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { WorkOrder } from '@/src/types';

interface PreviewScreenProps {
  workOrder: WorkOrder;
  onEdit: () => void;
}

export const PreviewScreen: React.FC<PreviewScreenProps> = ({ workOrder, onEdit }) => {
  const [isDownloading, setIsDownloading] = React.useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      // Simulate download
      const link = document.createElement('a');
      link.href = '#';
      link.download = `Quote_3Phaze_${workOrder.id}.pdf`;
      console.log('PDF Downloaded');
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Document Canvas */}
      <div className="flex-grow bg-surface-container-lowest shadow-xl rounded-sm min-h-[1056px] flex flex-col overflow-hidden">
        {/* Document Header */}
        <div className="bg-primary-container p-8 flex justify-between items-start text-white">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tighter text-white mb-1">QUOTE PREVIEW</h1>
            <p className="text-on-primary-container text-xs font-bold tracking-[0.1em] uppercase">Ref: #{workOrder.id}</p>
          </div>
          <div className="text-right">
            <p className="text-on-primary-container text-xs font-bold tracking-[0.1em] uppercase">Issue Date</p>
            <p className="font-semibold">{workOrder.date}</p>
            <p className="text-on-primary-container text-xs font-bold tracking-[0.1em] uppercase mt-4">Valid Until</p>
            <p className="font-semibold">{workOrder.validUntil}</p>
          </div>
        </div>

        <div className="p-12 space-y-12 flex-grow">
          {/* Branding & Entities */}
          <div className="grid grid-cols-2 gap-16">
            <div className="space-y-4">
              <h2 className="text-xs font-bold text-safety-orange tracking-[0.15em] uppercase">From</h2>
              <div className="space-y-1">
                <p className="font-bold text-lg text-primary">3 Phaze Electricals</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Industrial Power Systems Division<br />
                  42 High-Voltage Ave, Suite 100<br />
                  North Industrial District, CA 90210
                </p>
                <p className="text-sm font-medium pt-2">lic. #ELC-99203-A</p>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-xs font-bold text-safety-orange tracking-[0.15em] uppercase">To</h2>
              <div className="space-y-1">
                <p className="font-bold text-lg text-on-surface">{workOrder.clientName}</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {workOrder.siteAddress}
                </p>
                <p className="text-sm font-medium pt-2">{workOrder.clientEmail}</p>
              </div>
            </div>
          </div>

          {/* Job Details Bento */}
          <div className="bg-surface-container-low p-6 rounded-sm grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1 md:col-span-2">
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Scope of Work</p>
              <p className="text-sm text-primary leading-relaxed">{workOrder.scopeOfWork}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Priority Status</p>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-bold uppercase tracking-wider">High Priority</span>
            </div>
          </div>

          {/* Pricing Table */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-safety-orange tracking-[0.15em] uppercase">Itemized Services & Materials</h3>
            <div className="w-full">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left border-b border-outline-variant/30">
                    <th className="py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Description</th>
                    <th className="py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-right">Qty/Hrs</th>
                    <th className="py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-right">Rate</th>
                    <th className="py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {workOrder.lineItems.map((item, idx) => (
                    <tr key={idx} className={idx % 2 !== 0 ? "bg-surface-container-low/30" : ""}>
                      <td className="py-5">
                        <p className="font-semibold text-sm text-primary">{item.description}</p>
                      </td>
                      <td className="py-5 text-right text-sm">{item.quantity}</td>
                      <td className="py-5 text-right text-sm">${item.unitPrice.toFixed(2)}</td>
                      <td className="py-5 text-right font-medium text-sm">${item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals Section */}
          <div className="flex justify-end">
            <div className="w-full md:w-64 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">Subtotal</span>
                <span className="font-medium">${workOrder.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">Tax ({(workOrder.taxRate * 100).toFixed(2)}%)</span>
                <span className="font-medium">${workOrder.taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="pt-3 border-t border-primary/20 flex justify-between items-center">
                <span className="text-xs font-bold text-primary uppercase tracking-widest">Total Amount</span>
                <span className="text-xl font-black text-primary">${workOrder.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          {/* Signature Pad */}
          <div className="mt-16 space-y-6">
            <h3 className="text-xs font-bold text-safety-orange tracking-[0.15em] uppercase">Authorization</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="h-32 bg-surface-container-low/50 rounded-sm border border-outline-variant/20 relative group overflow-hidden cursor-crosshair">
                  <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-10 pointer-events-none">
                    <span className="text-xs font-medium italic text-on-surface-variant">Sign here electronically</span>
                  </div>
                  <svg className="w-full h-full text-primary/80 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 200 80">
                    <path d="M20 40C30 35 50 20 70 40S100 60 130 40 180 30 180 50" strokeLinecap="round" />
                  </svg>
                  <div className="absolute bottom-4 left-4 right-4 h-0.5 signature-line"></div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Client Signature</p>
                    <p className="text-xs text-on-surface-variant">Authorized Representative</p>
                  </div>
                  <button className="text-[10px] font-bold text-primary uppercase hover:text-safety-orange transition-colors">Clear</button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-32 bg-surface-container-low/50 rounded-sm border border-outline-variant/20 flex items-center justify-center relative">
                  <CheckCircle2 size={48} className="text-outline-variant/30" />
                  <div className="absolute bottom-4 left-4 right-4 h-0.5 signature-line"></div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Company Seal</p>
                  <p className="text-xs text-on-surface-variant">3 Phaze Electricals Official Verification</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-surface-container-low px-12 py-8 flex justify-between items-center text-[10px] uppercase tracking-[0.05em] text-on-surface-variant/50 border-t border-outline-variant/10">
          <p>© 2024 3 Phaze Electricals. Industrial Precision.</p>
          <div className="flex gap-6">
            <span className="hover:text-safety-orange cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-safety-orange cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-safety-orange cursor-pointer transition-colors">Safety Standards</span>
          </div>
        </footer>
      </div>

      {/* Action Sidebar */}
      <aside className="w-full md:w-80 space-y-6">
        <div className="bg-surface-container-highest/50 p-6 rounded-sm space-y-6">
          <h4 className="text-xs font-bold text-primary tracking-[0.1em] uppercase">Document Actions</h4>
          <button className="w-full py-4 industrial-gradient text-white font-bold rounded-sm shadow-sm flex items-center justify-center gap-3 active:scale-95 transition-transform">
            <Send size={20} />
            Send to Client
          </button>
          <button className="w-full py-4 bg-surface-container-lowest border-2 border-primary text-primary font-bold rounded-sm flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all active:scale-95">
            <RefreshCw size={20} />
            Finalize & Sync
          </button>
          <div className="pt-4 border-t border-outline-variant/30 space-y-4">
            <button 
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-full flex items-center justify-between p-3 hover:bg-surface-container-high rounded-sm transition-colors group disabled:opacity-50"
            >
              <span className="text-sm font-medium text-on-surface-variant group-hover:text-primary">
                {isDownloading ? 'Generating...' : 'Download PDF'}
              </span>
              {isDownloading ? (
                <Loader2 size={18} className="animate-spin text-primary" />
              ) : (
                <Download size={18} className="text-on-surface-variant/50 group-hover:text-primary" />
              )}
            </button>
            <button 
              onClick={onEdit}
              className="w-full flex items-center justify-between p-3 hover:bg-surface-container-high rounded-sm transition-colors group"
            >
              <span className="text-sm font-medium text-on-surface-variant group-hover:text-primary">Edit Quote</span>
              <Edit3 size={18} className="text-on-surface-variant/50 group-hover:text-primary" />
            </button>
          </div>
        </div>

        <div className="bg-primary-container p-6 rounded-sm text-white">
          <h4 className="text-[10px] font-bold text-on-primary-container tracking-[0.2em] uppercase mb-4">Integrations</h4>
          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded">
              <Table size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-xs font-bold">Google Sheets Sync</p>
              <p className="text-[10px] text-on-primary-container">Auto-update Master Registry</p>
            </div>
            <div className="ml-auto">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="p-4 border border-outline-variant/20 rounded-sm">
          <p className="text-[10px] font-bold text-safety-orange uppercase mb-2">Notice</p>
          <p className="text-xs text-on-surface-variant leading-relaxed italic">
            All quotes are subject to site inspection. Pricing includes standard safety protocol compliance for Zone 2 Industrial environments.
          </p>
        </div>
      </aside>
    </div>
  );
};
