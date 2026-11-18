'use client';

import { useTheme as useNextThemes } from 'next-themes';
import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

function useTheme() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const { resolvedTheme, setTheme } = useNextThemes();

  return {
    theme: mounted ? resolvedTheme : undefined,
    setTheme,
  };
}

export default useTheme;
