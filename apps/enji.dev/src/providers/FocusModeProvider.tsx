'use client';

import { useEffect } from 'react';

import useFocusMode from '@/hooks/useFocusMode';

import type { ReactNode } from 'react';

interface FocusModeProviderProps {
  children: ReactNode;
}

function FocusModeProvider({ children }: FocusModeProviderProps) {
  const { focusMode } = useFocusMode();

  useEffect(() => {
    if (focusMode) {
      document.documentElement.classList.add('fm');
    } else {
      document.documentElement.classList.remove('fm');
    }
  }, [focusMode]);

  return <>{children}</>;
}

export default FocusModeProvider;
