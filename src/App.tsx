import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { DraftingScreen } from './screens/DraftingScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { PreviewScreen } from './screens/PreviewScreen';
import { SyncScreen } from './screens/SyncScreen';
import { Screen, WorkOrder } from './types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('drafting');
  const [workOrder, setWorkOrder] = useState<WorkOrder>({
    id: 'WO-2024-001',
    clientName: 'Toronto Industrial Logistics',
    clientEmail: 'billing@client.com',
    siteAddress: '123 Industrial Pkwy, Suite 400, Toronto, ON',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    lineItems: [
      { description: 'Copper Wire, 12/2 NMD90 (150m Roll)', quantity: 2, unitPrice: 145.00, total: 290.00 },
      { description: 'Circuit Breaker, 15A Single Pole', quantity: 4, unitPrice: 12.50, total: 50.00 },
      { description: 'Certified Electrician Labor (Standard Rate)', quantity: 8.5, unitPrice: 95.00, total: 807.50 },
    ],
    subtotal: 1147.50,
    taxRate: 0.13,
    taxAmount: 149.18,
    total: 1296.68,
    status: 'DRAFT',
    syncStatus: 'LOCAL',
    scopeOfWork: 'Industrial electrical maintenance and panel upgrade for secondary distribution unit.'
  });

  const renderScreen = () => {
    switch (currentScreen) {
      case 'drafting':
        return <DraftingScreen 
          workOrder={workOrder} 
          setWorkOrder={setWorkOrder} 
          onPreview={() => setCurrentScreen('preview')} 
        />;
      case 'history':
        return <HistoryScreen />;
      case 'preview':
        return <PreviewScreen 
          workOrder={workOrder} 
          onEdit={() => setCurrentScreen('drafting')}
        />;
      case 'sync':
        return <SyncScreen />;
      default:
        return <DraftingScreen 
          workOrder={workOrder} 
          setWorkOrder={setWorkOrder} 
          onPreview={() => setCurrentScreen('preview')} 
        />;
    }
  };

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar currentScreen={currentScreen} />
        
        <main className="flex-1 p-4 md:p-10 max-w-7xl w-full mx-auto">
          {renderScreen()}
        </main>

        <footer className="w-full border-t border-outline-variant/10 flex justify-between items-center px-8 py-4 bg-surface mt-auto">
          <div className="text-on-surface-variant/40 font-medium text-[10px] uppercase tracking-[0.05em]">
            © 2024 3 Phaze Electricals. Industrial Precision.
          </div>
          <div className="flex gap-6">
            <button className="text-on-surface-variant/40 font-medium text-[10px] uppercase tracking-[0.05em] hover:text-safety-orange transition-colors">Privacy Policy</button>
            <button className="text-on-surface-variant/40 font-medium text-[10px] uppercase tracking-[0.05em] hover:text-safety-orange transition-colors">Terms of Service</button>
            <button className="text-on-surface-variant/40 font-medium text-[10px] uppercase tracking-[0.05em] hover:text-safety-orange transition-colors">Safety Standards</button>
          </div>
        </footer>
      </div>
    </div>
  );
}
