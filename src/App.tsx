import React, { useEffect, useMemo, useState } from 'react';
import { DOCUMENTS } from './data/documents';
import { paging } from './utils/paging';
import { searchEngine } from './utils/search';
import { printDocument } from './utils/printExport';
import { exportToDocx } from './utils/docxExport';
import { APP_CONFIG } from './constants/app';
import { usePreferences } from './hooks/usePreferences';
import { useToast } from './hooks/useToast';
import { useKeyboardShortcut } from './hooks/useKeyboardShortcut';
import { useProfile } from './hooks/useProfile';
import { UserProfile } from './constants/user';
import { Topbar } from './components/Topbar';
import { Sidebar } from './components/Sidebar';
import { ViewToggle } from './components/ViewToggle';
import { ThumbnailStrip } from './components/ThumbnailStrip';
import { WebView } from './components/WebView';
import { DocumentView } from './components/DocumentView';
import { RightSidebar } from './components/RightSidebar';
import { SearchOverlay } from './components/SearchOverlay';
import { MobileNav } from './components/MobileNav';
import { EditProfileModal } from './components/EditProfileModal';
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
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [mobileLibraryOpenTrigger, setMobileLibraryOpenTrigger] = useState(0);
  const { toast, showToast } = useToast();

  // Dynamic Profile state & document auto-synchronization
  const {
    profile,
    updateProfile,
    resetProfile,
    enrichedDocuments,
    activeEnrichedDoc,
  } = useProfile(DOCUMENTS, activeId);

  // Initialize search index with profile-enriched documents
  useEffect(() => {
    searchEngine.build(enrichedDocuments);
  }, [enrichedDocuments]);

  // Keyboard shortcut: ⌘K or Ctrl+K to open search
  useKeyboardShortcut({
    key: 'k',
    ctrlOrMeta: true,
    onTrigger: () => setIsSearchOpen(true),
  });

  const activeDoc = activeEnrichedDoc;

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
    showToast('Pada dialog cetak, pilih opsi "Save as PDF".', 'file-down');
    printDocument(activeDoc);
  };

  const handleDownloadDocx = async () => {
    if (!activeDoc) return;
    try {
      showToast('Menyusun berkas Word DOCX…', 'file-text');
      await exportToDocx(activeDoc);
      showToast('Berkas DOCX berhasil diunduh.', 'file-type-2');
    } catch (err: any) {
      console.error('[docx error]', err);
      showToast('Gagal membuat DOCX: ' + (err?.message || 'Error'), 'alert-circle');
    }
  };

  const handleSaveProfile = (updated: Partial<UserProfile>) => {
    updateProfile(updated);
    showToast('Profil & seluruh dokumen berhasil diperbarui!', 'check-circle');
  };

  const handleResetProfile = () => {
    resetProfile();
    showToast('Profil dikembalikan ke pengaturan awal.', 'rotate-ccw');
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
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased selection:bg-teal-100 selection:text-teal-900 pb-16 lg:pb-0">
      {/* Top Bar Header with Interactive Profile Trigger */}
      <Topbar
        onOpenSearch={() => setIsSearchOpen(true)}
        userProfile={profile}
        onOpenEditProfile={() => setIsProfileModalOpen(true)}
      />

      {/* Main Responsive Grid Layout */}
      <div className="app-grid flex-1 w-full">
        {/* Desktop Left Sidebar: Document Library */}
        <Sidebar
          documents={enrichedDocuments}
          activeId={activeDoc?.id || null}
          currentFilter={filter}
          onSelectDoc={setActiveId}
          onSetFilter={setFilter}
        />

        {/* Center Main Article: Document Viewer */}
        <main className="col-span-12 lg:col-span-6 w-full min-w-0">
          <article id="docViewer" data-region="viewer" className="w-full">
            {activeDoc ? (
              <>
                <ViewToggle
                  viewMode={viewMode}
                  onChangeViewMode={setViewMode}
                  activeDoc={activeDoc}
                  onOpenMobileLibrary={() => setMobileLibraryOpenTrigger((c) => c + 1)}
                />

                {viewMode === 'document' && (
                  <div className="mb-4">
                    <ThumbnailStrip pages={pages} />
                  </div>
                )}

                {viewMode === 'web' ? (
                  <WebView document={activeDoc} />
                ) : (
                  <DocumentView document={activeDoc} pages={pages} />
                )}
              </>
            ) : (
              <div className="empty-state bg-white border border-slate-200 rounded-2xl p-12">
                Belum ada dokumen yang dipilih.
              </div>
            )}
          </article>
        </main>

        {/* Desktop Right Sidebar: Table of Contents & Info */}
        {activeDoc && (
          <RightSidebar
            document={activeDoc}
            onPrint={handlePrint}
            onDownloadPdf={handleDownloadPdf}
            onDownloadDocx={handleDownloadDocx}
          />
        )}
      </div>

      {/* Mobile Bottom Navigation & Action Sheets (Visible on screens < 1024px) */}
      {activeDoc && (
        <MobileNav
          key={mobileLibraryOpenTrigger}
          documents={enrichedDocuments}
          activeDoc={activeDoc}
          filter={filter}
          onSelectDoc={setActiveId}
          onSetFilter={setFilter}
          onOpenSearch={() => setIsSearchOpen(true)}
          onPrint={handlePrint}
          onDownloadPdf={handleDownloadPdf}
          onDownloadDocx={handleDownloadDocx}
          userProfile={profile}
          onOpenEditProfile={() => setIsProfileModalOpen(true)}
        />
      )}

      {/* Profile Editing Modal Dialog */}
      <EditProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentProfile={profile}
        onSave={handleSaveProfile}
        onReset={handleResetProfile}
      />

      {/* Global Search Overlay (⌘K) */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSelectSearchResult}
      />

      {/* Footer */}
      <footer className="app-footer">
        <div>
          <p>{APP_CONFIG.copyrightText}</p>
          <p>
            v{APP_CONFIG.version} · {APP_CONFIG.systemTag}
          </p>
        </div>
      </footer>

      {/* Toast Notification */}
      <Toast toast={toast} />
    </div>
  );
};

export default App;
