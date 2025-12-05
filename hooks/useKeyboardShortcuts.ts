import { useEffect } from 'react';

interface UseKeyboardShortcutsProps {
  onSearchFocus: () => void;
}

export function useKeyboardShortcuts({ onSearchFocus }: UseKeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+K 或 Cmd+K (Mac)
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        onSearchFocus();
        return;
      }
      
      // / 键快速搜索
      if (event.key === '/' && !isInputFocused()) {
        event.preventDefault();
        onSearchFocus();
        return;
      }
    };

    // 检查当前是否有输入框聚焦
    const isInputFocused = (): boolean => {
      const activeElement = document.activeElement;
      return activeElement instanceof HTMLInputElement || 
             activeElement instanceof HTMLTextAreaElement ||
             activeElement?.getAttribute('contenteditable') === 'true';
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onSearchFocus]);
}
