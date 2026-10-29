import { useState } from 'react';
import { DocumentType } from '../types';

const NS = 'nursefolio:';
const memoryFallback = new Map<string, any>();

function getStoredValue<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(NS + key);
    if (raw === null) {
      return memoryFallback.has(key) ? memoryFallback.get(key) : defaultValue;
    }
    return JSON.parse(raw);
  } catch {
    return memoryFallback.has(key) ? memoryFallback.get(key) : defaultValue;
  }
}

function setStoredValue<T>(key: string, value: T): void {
  try {
    localStorage.setItem(NS + key, JSON.stringify(value));
  } catch {
    memoryFallback.set(key, value);
  }
}

export function usePreferences(defaultDocId: string) {
  const [activeId, setActiveIdState] = useState<string>(() =>
    getStoredValue<string>('activeId', defaultDocId)
  );

  const [filter, setFilterState] = useState<string>(() =>
    getStoredValue<string>('filter', 'all')
  );

  const [viewMode, setViewModeState] = useState<'web' | 'document'>(() =>
    getStoredValue<'web' | 'document'>('viewMode', 'web')
  );

  const setActiveId = (id: string) => {
    setActiveIdState(id);
    setStoredValue('activeId', id);
  };

  const setFilter = (newFilter: string) => {
    setFilterState(newFilter);
    setStoredValue('filter', newFilter);
  };

  const setViewMode = (mode: 'web' | 'document') => {
    setViewModeState(mode);
    setStoredValue('viewMode', mode);
  };

  return {
    activeId,
    setActiveId,
    filter,
    setFilter,
    viewMode,
    setViewMode,
  };
}
