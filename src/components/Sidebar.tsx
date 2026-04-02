import React from 'react';
import { 
  LayoutDashboard, 
  History, 
  BarChart3, 
  TableProperties, 
  Plus, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Screen } from '@/src/types';

interface SidebarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentScreen, onNavigate }) => {
  const navItems = [
    { id: 'drafting', label: 'Work Orders', icon: LayoutDashboard },
    { id: 'history', label: 'Past History', icon: History },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'sync', label: 'Sheets Sync', icon: TableProperties },
  ];

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 bg-surface-container-low py-6 pl-4 pr-0 sticky top-0">
      <div className="px-4 mb-10">
        <h1 className="text-lg font-bold text-primary uppercase tracking-wider">3 Phaze Admin</h1>
        <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-[0.1em]">Industrial Portal</p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id || (item.id === 'drafting' && currentScreen === 'preview');
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as Screen)}
              className={cn(
                "flex items-center w-full gap-3 px-4 py-3 transition-all text-left",
                isActive 
                  ? "bg-surface-container-lowest text-primary font-bold rounded-l-lg shadow-sm" 
                  : "text-on-surface-variant hover:text-primary hover:bg-surface-container/50"
              )}
            >
              <Icon size={20} />
              <span className="text-sm font-medium tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto px-4 space-y-4">
        <button 
          onClick={() => onNavigate('drafting')}
          className="w-full industrial-gradient text-white py-3 rounded-sm text-xs font-bold uppercase tracking-widest active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <Plus size={16} />
          New Work Order
        </button>

        <div className="pt-6 border-t border-outline-variant/20 space-y-1">
          <button className="flex items-center gap-3 px-4 py-2 text-on-surface-variant text-sm hover:text-primary transition-colors w-full text-left">
            <HelpCircle size={18} />
            Support
          </button>
          <button className="flex items-center gap-3 px-4 py-2 text-on-surface-variant text-sm hover:text-primary transition-colors w-full text-left">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};
