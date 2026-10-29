import React, { useEffect, useMemo, useState } from 'react';
import { DOCUMENTS } from './data/documents';
import { NurseDocument } from './types';
import { paging } from './utils/paging';
import { searchEngine } from './utils/search';
import { printDocument } from './utils/printExport';
import { exportToDocx } from './utils/docxExport';
import { APP_CONFIG } from './constants/app';
import { usePreferences } from './hooks/usePreferences';
import { useToast } from './hooks/useToast';
import { useKeyboardShortcut } from './hooks/useKeyboardShortcut';
import { Topbar } from './components/Topbar';
import { Sidebar } from './components/Sidebar';
import { ViewToggle } from './components/ViewToggle';
import { ThumbnailStrip } from './components/ThumbnailStrip';
import { WebView } from './components/WebView';
import { DocumentView } from './components/DocumentView';
import { RightSidebar } from './components/RightSidebar';
import { SearchOverlay } from './components/SearchOverlay';
import { Toast } from './components/Toast';

export const App: React.FC = () => {
  const initialDocId = DOCUMENTS[0]?.id || '';
  const {
    activeId,
    setActiveId,
    filter,
    setFilter,
    viewMode,
    setViewMode,
  } = usePreferences(initialDocId);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { toast, showToast } = useToast();

  // Initialize search index once
  useEffect(() => {
    searchEngine.build(DOCUMENTS);
  }, []);

  // Keyboard shortcut: ⌘K or Ctrl+K to open search
  useKeyboardShortcut({
    key: 'k',
    ctrlOrMeta: true,
    onTrigger: () => setIsSearchOpen(true),
  });

  const activeDoc: NurseDocument = useMemo(() => {
    return DOCUMENTS.find((d) => d.id === activeId) || DOCUMENTS[0];
  }, [activeId]);

  const pages = useMemo(() => {
    if (!activeDoc) return [];
    return paging.paginate(activeDoc);
  }, [activeDoc]);

  const handlePrint = () => {
    if (!activeDoc) return;
    printDocument(activeDoc);
  };

  const handleDownloadPdf = () => {
    if (!activeDoc) return;
    showToast('Pada dialog cetak, pilih "Save as PDF".', 'file-down');
    printDocument(activeDoc);
  };

  const handleDownloadDocx = async () => {
    if (!activeDoc) return;
    try {
      showToast('Menyusun berkas DOCX…', 'file-text');
      await exportToDocx(activeDoc);
      showToast('Berkas DOCX berhasil diunduh.', 'file-type-2');
    } catch (err: any) {
      console.error('[docx error]', err);
      showToast('Gagal membuat DOCX: ' + (err?.message || 'Error'), 'alert-circle');
    }
  };

  const handleSelectSearchResult = (docId: string, sectionId: string) => {
    setIsSearchOpen(false);
    if (docId !== activeId) {
      setActiveId(docId);
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 260);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Topbar onOpenSearch={() => setIsSearchOpen(true)} />

      <div className="app-grid flex-1">
        <Sidebar
          documents={DOCUMENTS}
          activeId={activeDoc?.id || null}
          currentFilter={filter}
          onSelectDoc={setActiveId}
          onSetFilter={setFilter}
        />

        <main className="col-span-12 lg:col-span-6">
          <article id="docViewer" data-region="viewer">
            {activeDoc ? (
              <>
                <ViewToggle viewMode={viewMode} onChangeViewMode={setViewMode} />

                {viewMode === 'document' && <ThumbnailStrip pages={pages} />}

                {viewMode === 'web' ? (
                  <WebView document={activeDoc} />
                ) : (
                  <DocumentView document={activeDoc} pages={pages} />
                )}
              </>
            ) : (
              <div className="empty-state">Belum ada dokumen dipilih.</div>
            )}
          </article>
        </main>

        {activeDoc && (
          <RightSidebar
            document={activeDoc}
            onPrint={handlePrint}
            onDownloadPdf={handleDownloadPdf}
            onDownloadDocx={handleDownloadDocx}
          />
        )}
      </div>

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSelectSearchResult}
      />

      <footer className="app-footer">
        <div>
          <p>{APP_CONFIG.copyrightText}</p>
          <p>
            v{APP_CONFIG.version} · {APP_CONFIG.systemTag}
          </p>
        </div>
      </footer>

      <Toast toast={toast} />
    </div>
  );
};

export default App;
