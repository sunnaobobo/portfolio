'use client';

import { useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

import Toast from '@/components/Toast';

import useFocusMode from '@/hooks/useFocusMode';
import useGlobal from '@/hooks/useGlobal';
import useShortcut from '@/hooks/useShortcut';
import useTheme from '@/hooks/useTheme';

const focusToast = {
  title: '专注模式已{STATUS}',
  message: '开启专注模式后，将隐藏顶部导航栏与悬浮互动栏，减少阅读干扰。',
};

function Shortcuts() {
  const toastRef = useRef<string | null>(null);
  const { theme, setTheme } = useTheme();
  const { isQuickAccessOpen, setQuickAccessOpen } = useGlobal();
  const { focusMode, setFocusMode } = useFocusMode();
  const prevFocusMode = useRef(focusMode);

  useShortcut('KeyD', () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  });

  useShortcut('KeyQ', () => {
    setQuickAccessOpen(!isQuickAccessOpen);
  });

  useShortcut('KeyF', () => {
    setFocusMode(!focusMode);
  });

  useEffect(() => {
    if (prevFocusMode.current === focusMode) {
      return;
    }

    prevFocusMode.current = focusMode;

    if (toastRef.current) {
      toast.remove(toastRef.current);
    }

    toastRef.current = toast.custom((t) => (
      <Toast
        title={focusToast.title.replace(
          '{STATUS}',
          focusMode ? '开启' : '关闭'
        )}
        message={focusToast.message}
        t={t}
      />
    ));
  }, [focusMode]);

  return null;
}

export default Shortcuts;
