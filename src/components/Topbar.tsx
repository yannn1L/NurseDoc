import React from 'react';
import { Search, Bell, HeartHandshake, UserPen } from 'lucide-react';
import { UserProfile } from '../constants/user';
import { APP_CONFIG } from '../constants/app';

interface TopbarProps {
  onOpenSearch: () => void;
  userProfile: UserProfile;
  onOpenEditProfile: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  onOpenSearch,
  userProfile,
  onOpenEditProfile,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto h-14 sm:h-16 px-3.5 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-6">
        {/* Brand Zone */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-md shadow-teal-500/20 shrink-0">
            <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="leading-tight">
            <div className="font-bold text-slate-900 tracking-tight text-[15px] sm:text-[17px]">
              {APP_CONFIG.name}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 -mt-0.5 hidden xs:block">
              {APP_CONFIG.title}
            </div>
          </div>
        </div>

        {/* Global Search Bar (Responsive Clickable Trigger) */}
        <div className="flex-1 max-w-xl mx-2 sm:mx-0">
          <button
            type="button"
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-100/80 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all text-left text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30 group"
          >
            <div className="flex items-center gap-2.5 truncate">
              <Search className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors shrink-0" />
              <span className="text-xs sm:text-[13px] text-slate-500 group-hover:text-slate-800 truncate">
                {APP_CONFIG.searchPlaceholder}
              </span>
            </div>
            <kbd className="hidden sm:inline-flex items-center font-mono text-[10.5px] text-slate-400 bg-white border border-slate-200 rounded px-1.5 py-0.5 shadow-2xs">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* User Profile & Actions Zone */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            type="button"
            className="w-9 h-9 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center transition-colors"
            title="Notifikasi"
            onClick={() => {}}
          >
            <Bell className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
          </button>

          {/* Interactive User Profile Trigger */}
          <button
            type="button"
            onClick={onOpenEditProfile}
            className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 border-l border-slate-200 text-left hover:opacity-90 active:scale-98 transition-all p-1 rounded-xl group focus:outline-none focus:ring-2 focus:ring-teal-500/30"
            title="Klik untuk mengubah nama, NIM, dan universitas"
          >
            <div className="text-right leading-tight hidden xl:block">
              <div className="text-[12.5px] font-bold text-slate-800 group-hover:text-teal-700 transition-colors flex items-center justify-end gap-1.5">
                <span>{userProfile.name}</span>
                <UserPen className="w-3 h-3 text-slate-400 group-hover:text-teal-600 transition-colors" />
              </div>
              <div className="text-[10.5px] text-slate-500 truncate max-w-[170px]">
                {userProfile.nim ? `NIM: ${userProfile.nim} · ` : ''}{userProfile.institution}
              </div>
            </div>
            <div className="relative">
              <div
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-white grid place-items-center font-bold text-xs sm:text-sm shadow-sm group-hover:ring-2 group-hover:ring-teal-400 transition-all"
              >
                {userProfile.avatarText}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-teal-500 text-white rounded-full grid place-items-center border-2 border-white">
                <UserPen className="w-2 h-2" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
