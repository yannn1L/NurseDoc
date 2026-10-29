import { useState, useEffect, useMemo, useCallback } from 'react';
import { UserProfile, DEFAULT_USER_PROFILE, generateAvatarInitials } from '../constants/user';
import { NurseDocument, CoverBlock } from '../types';

const STORAGE_KEY = 'nursedoc_user_profile';

export function applyProfileToDocument(
  doc: NurseDocument,
  profile: UserProfile
): NurseDocument {
  const newSections = doc.sections.map((section) => {
    if (!section.blocks || section.blocks.length === 0) return section;

    const newBlocks = section.blocks.map((block) => {
      if (block.type === 'cover') {
        const coverBlock = block as CoverBlock;
        const headerText = [profile.institution, profile.faculty]
          .filter(Boolean)
          .join('\n');

        let hasNim = false;
        let newPenyusun = (coverBlock.penyusun || []).map((p) => {
          const lbl = p.label.toLowerCase();
          if (lbl.includes('nama') || lbl.includes('disusun')) {
            return { ...p, value: profile.name };
          }
          if (lbl.includes('nim') || lbl.includes('nirm')) {
            hasNim = true;
            return { ...p, value: profile.nim };
          }
          return p;
        });

        // If NIM was not in penyusun list and profile has nim, add it after Nama
        if (!hasNim && profile.nim && newPenyusun.length > 0) {
          const namaIdx = newPenyusun.findIndex((p) =>
            p.label.toLowerCase().includes('nama')
          );
          if (namaIdx !== -1) {
            newPenyusun.splice(namaIdx + 1, 0, {
              label: 'NIM',
              value: profile.nim,
            });
          } else {
            newPenyusun.push({ label: 'NIM', value: profile.nim });
          }
        }

        return {
          ...coverBlock,
          header: headerText || coverBlock.header,
          penyusun: newPenyusun,
        };
      }
      return block;
    });

    return {
      ...section,
      blocks: newBlocks,
    };
  });

  return {
    ...doc,
    author: profile.name || doc.author,
    sections: newSections,
  };
}

export function useProfile(initialDocuments: NurseDocument[], activeId: string | null) {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_USER_PROFILE,
          ...parsed,
          avatarText: generateAvatarInitials(parsed.name || DEFAULT_USER_PROFILE.name),
        };
      }
    } catch (e) {
      console.warn('[useProfile] Failed reading from localStorage', e);
    }
    return DEFAULT_USER_PROFILE;
  });

  const updateProfile = useCallback((newProfile: Partial<UserProfile>) => {
    setProfile((prev) => {
      const updated: UserProfile = {
        ...prev,
        ...newProfile,
      };
      // Auto-compute avatarText if name changed
      if (newProfile.name) {
        updated.avatarText = generateAvatarInitials(newProfile.name);
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('[useProfile] Failed writing to localStorage', e);
      }
      return updated;
    });
  }, []);

  const resetProfile = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('[useProfile] Failed removing from localStorage', e);
    }
    setProfile(DEFAULT_USER_PROFILE);
  }, []);

  const enrichedDocuments = useMemo(() => {
    return initialDocuments.map((doc) => applyProfileToDocument(doc, profile));
  }, [initialDocuments, profile]);

  const activeEnrichedDoc = useMemo(() => {
    if (!enrichedDocuments || enrichedDocuments.length === 0) return null;
    return enrichedDocuments.find((d) => d.id === activeId) || enrichedDocuments[0];
  }, [enrichedDocuments, activeId]);

  return {
    profile,
    updateProfile,
    resetProfile,
    enrichedDocuments,
    activeEnrichedDoc,
  };
}
