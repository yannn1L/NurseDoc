import React from 'react';
import { Search, Bell, HeartHandshake } from 'lucide-react';
import { CURRENT_USER } from '../constants/user';
import { APP_CONFIG } from '../constants/app';

interface TopbarProps {
  onOpenSearch: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenSearch }) => {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-md shadow-teal-500/25">
            <HeartHandshake className="w-5 h-5 text-white" />
          </div>
          <div className="leading-tight">
            <div className="font-bold text-slate-900 tracking-tight text-[17px]">
              {APP_CONFIG.name}
            </div>
            <div className="text-[11px] text-slate-500 -mt-0.5">{APP_CONFIG.title}</div>
          </div>
        </div>

        {/* Search bar: flex-1 filling available width */}
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="globalSearch"
            type="text"
            readOnly
            onClick={onOpenSearch}
            placeholder={APP_CONFIG.searchPlaceholder}
            className="topbar-search"
          />
          <kbd className="topbar-kbd">⌘K</kbd>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            className="icon-btn"
            title="Notifikasi"
            onClick={() => {}}
          >
            <Bell className="w-[18px] h-[18px]" />
          </button>
          <div className="flex items-center gap-3 pl-3 ml-1 border-l border-slate-200">
            <div className="text-right leading-tight hidden lg:block">
              <div className="text-[13px] font-semibold text-slate-800">
                {CURRENT_USER.name}
              </div>
              <div className="text-[11px] text-slate-500">
                {CURRENT_USER.title} · {CURRENT_USER.institution}
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-white grid place-items-center font-semibold text-sm">
              {CURRENT_USER.avatarText}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
