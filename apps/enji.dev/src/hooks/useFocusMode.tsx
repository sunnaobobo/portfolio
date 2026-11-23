import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import useLocalStorageState from 'use-local-storage-state';

import Toast from '@/components/Toast';

const LOCAL_STORAGE_KEY = 'ng-focus-mode';

function useFocusMode() {
  const [focusMode, setStoredFocusMode] = useLocalStorageState(
    LOCAL_STORAGE_KEY,
    {
      defaultValue: false,
    }
  );

  const setFocusMode = useCallback(
    (enabled: boolean) => {
      setStoredFocusMode(enabled);
      toast.custom(
        (t) => (
          <Toast
            title={`专注模式已${enabled ? '开启' : '关闭'}`}
            message="开启专注模式后，将隐藏顶部导航栏与悬浮互动栏，减少阅读干扰。"
            t={t}
          />
        ),
        { id: 'focus-mode' }
      );
    },
    [setStoredFocusMode]
  );

  return {
    focusMode,
    setFocusMode,
  };
}

export default useFocusMode;
