import React from 'react';
import { Eye, LayoutDashboard, FileText } from 'lucide-react';

interface ViewToggleProps {
  viewMode: 'web' | 'document';
  onChangeViewMode: (mode: 'web' | 'document') => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onChangeViewMode }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm px-5 py-3 mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2 text-[12px] text-slate-500">
        <Eye className="w-3.5 h-3.5" />
        <span>Mode tampilan:</span>
      </div>
      <div className="seg-toggle">
        <button
          type="button"
          onClick={() => onChangeViewMode('web')}
          className={viewMode === 'web' ? 'active' : ''}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Web View</span>
        </button>
        <button
          type="button"
          onClick={() => onChangeViewMode('document')}
          className={viewMode === 'document' ? 'active' : ''}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Dokumen</span>
        </button>
      </div>
    </div>
  );
};
