import React, { useState, useEffect } from 'react';
import { FileText, User, Zap, Package, Plus, Trash2, Edit2, Check, X, Loader2, Percent, DollarSign } from 'lucide-react';
import { LineItem, WorkOrder } from '@/src/types';
import { cn } from '@/src/lib/utils';

interface DraftingScreenProps {
  workOrder: WorkOrder;
  setWorkOrder: React.Dispatch<React.SetStateAction<WorkOrder>>;
  onPreview: () => void;
}

export const DraftingScreen: React.FC<DraftingScreenProps> = ({ workOrder, setWorkOrder, onPreview }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [newItem, setNewItem] = useState<Partial<LineItem>>({ description: '', quantity: 1, unitPrice: 0 });
  const [isGenerating, setIsGenerating] = useState(false);
  const [customTaxRate, setCustomTaxRate] = useState(workOrder.taxRate * 100);
  const [customTaxAmount, setCustomTaxAmount] = useState(workOrder.taxAmount);
  const [taxMode, setTaxMode] = useState<'preset' | 'percent' | 'amount'>('preset');

  // Recalculate totals whenever line items or tax settings change
  useEffect(() => {
    const subtotal = workOrder.lineItems.reduce((sum, item) => sum + item.total, 0);
    let taxAmount = 0;
    let taxRate = 0;

    if (taxMode === 'amount') {
      taxAmount = customTaxAmount;
      taxRate = subtotal > 0 ? taxAmount / subtotal : 0;
    } else {
      taxRate = customTaxRate / 100;
      taxAmount = subtotal * taxRate;
    }

    const total = subtotal + taxAmount;

    setWorkOrder(prev => ({
      ...prev,
      subtotal,
      taxAmount,
      total,
      taxRate
    }));
  }, [workOrder.lineItems, customTaxRate, customTaxAmount, taxMode]);

  const handleAdd = () => {
    if (newItem.description && newItem.quantity && newItem.unitPrice !== undefined) {
      const item: LineItem = {
        description: newItem.description,
        quantity: Number(newItem.quantity),
        unitPrice: Number(newItem.unitPrice),
        total: Number(newItem.quantity) * Number(newItem.unitPrice)
      };
      setWorkOrder(prev => ({
        ...prev,
        lineItems: [...prev.lineItems, item]
      }));
      setNewItem({ description: '', quantity: 1, unitPrice: 0 });
      setIsAdding(false);
    }
  };

  const handleDelete = (index: number) => {
    setWorkOrder(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter((_, i) => i !== index)
    }));
  };

  const handleEdit = (index: number) => {
    setEditingIdx(index);
    setNewItem(workOrder.lineItems[index]);
  };

  const handleSaveEdit = () => {
    if (editingIdx !== null && newItem.description && newItem.quantity && newItem.unitPrice !== undefined) {
      const updatedItems = [...workOrder.lineItems];
      updatedItems[editingIdx] = {
        description: newItem.description,
        quantity: Number(newItem.quantity),
        unitPrice: Number(newItem.unitPrice),
        total: Number(newItem.quantity) * Number(newItem.unitPrice)
      };
      setWorkOrder(prev => ({
        ...prev,
        lineItems: updatedItems
      }));
      setEditingIdx(null);
      setNewItem({ description: '', quantity: 1, unitPrice: 0 });
    }
  };

  const handleGeneratePDF = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      onPreview();
    }, 1500);
  };

  const taxOptions = [
    { label: 'HST (Ontario) - 13%', value: 13 },
    { label: 'GST only - 5%', value: 5 },
    { label: 'HST (Atlantic) - 15%', value: 15 },
    { label: 'QST (Quebec) - 14.975%', value: 14.975 },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-safety-orange mb-2 block">New Document</span>
          <h2 className="text-4xl font-black text-primary tracking-tight">Work Order Request</h2>
          <p className="text-on-surface-variant text-sm mt-1">Ref ID: {workOrder.id}</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 border-2 border-primary text-primary text-sm font-bold rounded-sm hover:bg-primary/5 transition-colors">
            Save Draft
          </button>
          <button 
            onClick={handleGeneratePDF}
            disabled={isGenerating}
            className="px-6 py-2.5 industrial-gradient text-white text-sm font-bold rounded-sm shadow-lg shadow-primary/10 flex items-center gap-2 active:scale-95 transition-transform disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <FileText size={18} />}
            {isGenerating ? 'Generating...' : 'Generate Quote PDF'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          {/* Client Information */}
          <section className="bg-surface-container-lowest p-8 rounded-sm shadow-sm ring-1 ring-on-surface/[0.03]">
            <div className="flex items-center gap-2 mb-8">
              <User size={20} className="text-safety-orange" />
              <h3 className="text-lg font-bold text-primary">Client Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              <div className="relative">
                <label className="absolute -top-3 left-0 text-[10px] uppercase font-black tracking-widest text-on-surface-variant">Full Name</label>
                <input 
                  className="w-full border-0 border-b-2 border-outline-variant/30 focus:border-safety-orange focus:ring-0 px-0 py-2 bg-transparent text-sm placeholder:text-outline-variant/60 transition-colors" 
                  placeholder="e.g. Toronto Industrial Logistics" 
                  type="text" 
                  value={workOrder.clientName}
                  onChange={(e) => setWorkOrder({ ...workOrder, clientName: e.target.value })}
                />
              </div>
              <div className="relative">
                <label className="absolute -top-3 left-0 text-[10px] uppercase font-black tracking-widest text-on-surface-variant">Contact Email</label>
                <input 
                  className="w-full border-0 border-b-2 border-outline-variant/30 focus:border-safety-orange focus:ring-0 px-0 py-2 bg-transparent text-sm placeholder:text-outline-variant/60 transition-colors" 
                  placeholder="billing@client.com" 
                  type="email" 
                  value={workOrder.clientEmail}
                  onChange={(e) => setWorkOrder({ ...workOrder, clientEmail: e.target.value })}
                />
              </div>
              <div className="relative md:col-span-2">
                <label className="absolute -top-3 left-0 text-[10px] uppercase font-black tracking-widest text-on-surface-variant">Site Address</label>
                <input 
                  className="w-full border-0 border-b-2 border-outline-variant/30 focus:border-safety-orange focus:ring-0 px-0 py-2 bg-transparent text-sm placeholder:text-outline-variant/60 transition-colors" 
                  placeholder="123 Industrial Pkwy, Suite 400, Toronto, ON" 
                  type="text" 
                  value={workOrder.siteAddress}
                  onChange={(e) => setWorkOrder({ ...workOrder, siteAddress: e.target.value })}
                />
              </div>
            </div>
          </section>

          {/* Scope of Work */}
          <section className="bg-surface-container-lowest p-8 rounded-sm shadow-sm ring-1 ring-on-surface/[0.03]">
            <div className="flex items-center gap-2 mb-8">
              <Zap size={20} className="text-safety-orange" />
              <h3 className="text-lg font-bold text-primary">Scope of Work</h3>
            </div>
            <div className="relative">
              <label className="absolute -top-3 left-0 text-[10px] uppercase font-black tracking-widest text-on-surface-variant">Detailed Task Description</label>
              <textarea 
                className="w-full border-0 border-b-2 border-outline-variant/30 focus:border-safety-orange focus:ring-0 px-0 py-4 bg-transparent text-sm placeholder:text-outline-variant/60 transition-colors resize-none" 
                placeholder="Outline technical requirements, phases, and specific hardware to be installed..." 
                rows={5}
                value={workOrder.scopeOfWork}
                onChange={(e) => setWorkOrder({ ...workOrder, scopeOfWork: e.target.value })}
              ></textarea>
            </div>
          </section>

          {/* Materials & Labor */}
          <section className="bg-surface-container-lowest rounded-sm shadow-sm ring-1 ring-on-surface/[0.03] overflow-hidden">
            <div className="p-8 border-b border-surface-container">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package size={20} className="text-safety-orange" />
                  <h3 className="text-lg font-bold text-primary">Materials & Labor</h3>
                </div>
                {!isAdding && editingIdx === null && (
                  <button 
                    onClick={() => setIsAdding(true)}
                    className="text-xs font-bold uppercase tracking-widest text-safety-orange hover:underline flex items-center gap-1"
                  >
                    <Plus size={14} />
                    Add Line Item
                  </button>
                )}
              </div>
            </div>
            
            {(isAdding || editingIdx !== null) && (
              <div className="p-8 bg-surface-container-low/50 border-b border-surface-container animate-in fade-in slide-in-from-top-2 duration-300">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-6">
                  {editingIdx !== null ? 'Edit Line Item' : 'New Line Item'}
                </h4>
                <div className="grid grid-cols-12 gap-6 items-end">
                  <div className="col-span-12 md:col-span-6 relative">
                    <label className="absolute -top-3 left-0 text-[10px] uppercase font-black tracking-widest text-on-surface-variant">Description</label>
                    <input 
                      className="w-full border-0 border-b-2 border-outline-variant/30 focus:border-safety-orange focus:ring-0 px-0 py-2 bg-transparent text-sm transition-colors" 
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      placeholder="Item name or service description"
                      type="text" 
                    />
                  </div>
                  <div className="col-span-4 md:col-span-2 relative">
                    <label className="absolute -top-3 left-0 text-[10px] uppercase font-black tracking-widest text-on-surface-variant">Qty</label>
                    <input 
                      className="w-full border-0 border-b-2 border-outline-variant/30 focus:border-safety-orange focus:ring-0 px-0 py-2 bg-transparent text-sm transition-colors" 
                      value={newItem.quantity}
                      onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
                      type="number" 
                    />
                  </div>
                  <div className="col-span-4 md:col-span-2 relative">
                    <label className="absolute -top-3 left-0 text-[10px] uppercase font-black tracking-widest text-on-surface-variant">Unit Price</label>
                    <input 
                      className="w-full border-0 border-b-2 border-outline-variant/30 focus:border-safety-orange focus:ring-0 px-0 py-2 bg-transparent text-sm transition-colors" 
                      value={newItem.unitPrice}
                      onChange={(e) => setNewItem({ ...newItem, unitPrice: Number(e.target.value) })}
                      type="number" 
                    />
                  </div>
                  <div className="col-span-4 md:col-span-2 flex gap-2">
                    <button 
                      onClick={editingIdx !== null ? handleSaveEdit : handleAdd}
                      className="flex-1 bg-primary text-white p-2 rounded-sm hover:bg-primary-container transition-colors flex justify-center"
                    >
                      <Check size={18} />
                    </button>
                    <button 
                      onClick={() => { setIsAdding(false); setEditingIdx(null); setNewItem({ description: '', quantity: 1, unitPrice: 0 }); }}
                      className="flex-1 border-2 border-outline-variant/30 text-on-surface-variant p-2 rounded-sm hover:bg-surface transition-colors flex justify-center"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="w-full overflow-x-auto">
              <div className="min-w-[600px]">
                <div className="grid grid-cols-12 bg-surface-container-low px-8 py-3 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                  <div className="col-span-5">Description</div>
                  <div className="col-span-2 text-right">Quantity</div>
                  <div className="col-span-2 text-right">Unit Price</div>
                  <div className="col-span-2 text-right">Total</div>
                  <div className="col-span-1"></div>
                </div>
                {workOrder.lineItems.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={cn(
                      "px-8 py-6 grid grid-cols-12 text-sm items-center group hover:bg-surface-container/30 transition-colors",
                      idx % 2 !== 0 && "bg-surface-container-low/20"
                    )}
                  >
                    <div className="col-span-5 font-medium">{item.description}</div>
                    <div className="col-span-2 text-right">{item.quantity}</div>
                    <div className="col-span-2 text-right">${item.unitPrice.toFixed(2)}</div>
                    <div className={cn("col-span-2 text-right font-bold text-primary")}>
                      ${item.total.toFixed(2)}
                    </div>
                    <div className="col-span-1 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(idx)} className="text-on-surface-variant hover:text-primary"><Edit2 size={14} /></button>
                      <button onClick={() => handleDelete(idx)} className="text-on-surface-variant hover:text-red-600"><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
                {workOrder.lineItems.length === 0 && (
                  <div className="px-8 py-12 text-center text-on-surface-variant/40 italic text-sm">
                    No line items added yet. Click "Add Line Item" to begin.
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          {/* Summary Card */}
          <div className="bg-primary text-white p-8 rounded-sm shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <FileText size={96} />
            </div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-on-primary-container mb-6">Financial Summary</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-primary-container">Subtotal</span>
                <span className="font-bold">${workOrder.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              
              <div className="py-4 border-y border-white/10">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-[10px] uppercase font-black tracking-widest text-on-primary-container block">Tax Configuration</label>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setTaxMode('preset')}
                      className={cn("text-[10px] uppercase font-black tracking-widest hover:underline", taxMode === 'preset' ? 'text-safety-orange' : 'text-on-primary-container')}
                    >
                      Presets
                    </button>
                    <button 
                      onClick={() => setTaxMode('percent')}
                      className={cn("text-[10px] uppercase font-black tracking-widest hover:underline", taxMode === 'percent' ? 'text-safety-orange' : 'text-on-primary-container')}
                    >
                      Custom %
                    </button>
                    <button 
                      onClick={() => setTaxMode('amount')}
                      className={cn("text-[10px] uppercase font-black tracking-widest hover:underline", taxMode === 'amount' ? 'text-safety-orange' : 'text-on-primary-container')}
                    >
                      Custom $
                    </button>
                  </div>
                </div>
                
                <div className="relative">
                  {taxMode === 'percent' ? (
                    <div className="flex items-center gap-2 bg-primary-container border border-white/20 rounded-sm px-3 py-1">
                      <Percent size={14} className="text-on-primary-container" />
                      <input 
                        type="number" 
                        step="0.001"
                        className="bg-transparent border-0 focus:ring-0 text-sm w-full p-1"
                        value={customTaxRate}
                        onChange={(e) => setCustomTaxRate(Number(e.target.value))}
                      />
                    </div>
                  ) : taxMode === 'amount' ? (
                    <div className="flex items-center gap-2 bg-primary-container border border-white/20 rounded-sm px-3 py-1">
                      <span className="text-on-primary-container text-sm font-bold">$</span>
                      <input 
                        type="number" 
                        step="0.01"
                        className="bg-transparent border-0 focus:ring-0 text-sm w-full p-1"
                        value={customTaxAmount}
                        onChange={(e) => setCustomTaxAmount(Number(e.target.value))}
                      />
                    </div>
                  ) : (
                    <select 
                      className="w-full bg-primary-container border border-white/20 rounded-sm py-2 px-3 text-sm focus:ring-safety-orange focus:border-safety-orange appearance-none cursor-pointer"
                      value={customTaxRate}
                      onChange={(e) => setCustomTaxRate(Number(e.target.value))}
                    >
                      {taxOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center text-sm pt-2">
                <div className="flex items-center gap-1 text-on-primary-container">
                  <span>Estimated Tax</span>
                  <span className="text-[10px] opacity-60">
                    ({taxMode === 'amount' ? `${((workOrder.taxRate || 0) * 100).toFixed(2)}%` : `${customTaxRate}%`})
                  </span>
                </div>
                <span className="font-bold">${workOrder.taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              
              <div className="flex justify-between items-end pt-6">
                <span className="text-xs uppercase font-black tracking-[0.1em]">Total Due</span>
                <span className="text-3xl font-black tracking-tighter text-safety-orange">${workOrder.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          {/* Technician Checklist */}
          <div className="bg-surface-container p-6 rounded-sm space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Technician Checklist</h4>
            <div className="space-y-3">
              {['ESA Permit verification completed', 'Safety gear (PPE) verified for site', 'Hazard assessment signed'].map((task, i) => (
                <label key={i} className="flex items-start gap-3 cursor-pointer group">
                  <input className="mt-1 rounded-sm border-outline-variant text-safety-orange focus:ring-safety-orange" type="checkbox" />
                  <span className="text-xs text-on-surface-variant group-hover:text-primary transition-colors leading-relaxed">{task}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Action Sidebar Imagery */}
          <div className="rounded-sm overflow-hidden h-48 relative shadow-sm ring-1 ring-on-surface/[0.05]">
            <img 
              alt="Industrial Panel" 
              className="w-full h-full object-cover grayscale-[40%]" 
              src="https://picsum.photos/seed/industrial/800/600"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
            <div className="absolute bottom-4 left-4">
              <span className="text-[10px] font-black text-white uppercase tracking-widest bg-safety-orange px-2 py-1">Precision Guaranteed</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
