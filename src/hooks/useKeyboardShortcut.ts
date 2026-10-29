import { useEffect } from 'react';

interface ShortcutOptions {
  key: string;
  ctrlOrMeta?: boolean;
  onTrigger: () => void;
}

export function useKeyboardShortcut({ key, ctrlOrMeta = true, onTrigger }: ShortcutOptions) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const matchCtrlOrMeta = ctrlOrMeta ? e.metaKey || e.ctrlKey : true;
      if (matchCtrlOrMeta && e.key.toLowerCase() === key.toLowerCase()) {
        e.preventDefault();
        onTrigger();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [key, ctrlOrMeta, onTrigger]);
}
