import React from 'react';
import { Bell, Settings, Search, Menu } from 'lucide-react';
import { Screen } from '@/src/types';

interface TopBarProps {
  currentScreen: Screen;
}

export const TopBar: React.FC<TopBarProps> = ({ currentScreen }) => {
  return (
    <header className="w-full sticky top-0 z-40 glass-nav flex justify-between items-center px-6 py-3">
      <div className="flex items-center gap-4 flex-1">
        <div className="md:hidden">
          <Menu className="text-primary" size={24} />
        </div>
        <div className="flex items-center gap-8">
          <div className="text-xl font-black text-primary tracking-tighter">3 Phaze Electricals</div>
          
          {currentScreen === 'history' || currentScreen === 'sync' ? (
            <div className="hidden lg:flex items-center bg-surface-container-low px-4 py-2 rounded-sm border-b-2 border-outline-variant/30 focus-within:border-safety-orange transition-all">
              <Search className="text-on-surface-variant" size={16} />
              <input 
                className="bg-transparent border-none focus:ring-0 text-sm font-medium w-64 placeholder:text-on-surface-variant/50 ml-2" 
                placeholder={currentScreen === 'sync' ? "Search sync logs..." : "Search Work Orders..."}
                type="text"
              />
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-6 ml-10">
              <span className={currentScreen === 'drafting' ? "text-safety-orange font-bold text-sm" : "text-on-surface-variant text-sm"}>Drafting</span>
              <span className={currentScreen === 'preview' ? "text-safety-orange font-bold text-sm" : "text-on-surface-variant text-sm"}>Review</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex gap-2 mr-4">
          <button className="p-2 text-on-surface-variant hover:bg-surface-container transition-colors rounded-full relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-safety-orange rounded-full"></span>
          </button>
          <button className="p-2 text-on-surface-variant hover:bg-surface-container transition-colors rounded-full">
            <Settings size={20} />
          </button>
        </div>
        
        <div className="flex items-center gap-3 pl-4 border-l border-outline-variant/30">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-primary">J. Harrison</p>
            <p className="text-[10px] text-on-surface-variant uppercase font-semibold">Lead Technician</p>
          </div>
          <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-surface-container-highest bg-surface-container-high">
            <img 
              alt="Technician Profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-jzCPzuzJ8pRewDLfchgPttOLEoflYBxmmcPntmUSLgEwEYE9KBgOrmifmmEw4f0RGmeNAJQYxYlq1Irb-rct2ZrYYlBTATclPISnmNSwfb77MUGcgsi3P2FOR88dmWXQecRW76RLC6b0N3xbb3Ejwh6JizL5YZFydYZZOmg4j8qISXRaI4LVzrcQB2w_ioks9T7pW5KWbk89hzNH46t1kElgG2Mj9Qzp5upLEg_NbfAQtUvOs89PXREsCHMUbIjp-Q4cLxwuXcmM"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
