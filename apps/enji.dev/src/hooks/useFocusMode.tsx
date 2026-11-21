import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import useLocalStorageState from 'use-local-storage-state';

import Toast from '@/components/Toast';

const LOCAL_STORAGE_KEY = 'ng-focus-mode';

function useFocusMode() {
  const [focusMode, setStoredFocusMode] = useLocalStorageState(LOCAL_STORAGE_KEY, {
    defaultValue: false,
  });

  const setFocusMode = useCallback(
    (enabled: boolean) => {
      setStoredFocusMode(enabled);
      toast.custom(
        (t) => (
          <Toast
            title={`Focus Turned ${enabled ? 'On' : 'Off'}`}
            message="Focus helps reduce distractions by hiding floating components, like navigation and reactions."
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
