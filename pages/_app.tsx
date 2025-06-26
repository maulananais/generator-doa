import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { useEffect } from 'react';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Content protection setup
    const handleCopy = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('input') && !target.closest('textarea')) {
        e.preventDefault();
        console.warn('Copy disabled for content protection');
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      console.warn('Right-click disabled for content protection');
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInputField = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';
      
      // Allow shortcuts in input fields
      if (isInputField) return;
      
      // Disable common shortcuts
      if ((e.ctrlKey || e.metaKey) && ['c', 'x', 'u', 's', 'a'].includes(e.key.toLowerCase())) {
        e.preventDefault();
        console.warn('Keyboard shortcuts disabled for content protection');
      }
      
      // Disable F12 and developer tools shortcuts
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
        console.warn('Developer tools disabled');
      }
    };

    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('.protected-content')) {
        e.preventDefault();
      }
    };

    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    // Add event listeners
    document.addEventListener('copy', handleCopy);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);

    // Cleanup
    return () => {
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
