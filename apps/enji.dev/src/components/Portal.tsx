'use client';

import { memo, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

import type { PropsWithChildren } from 'react';

const emptySubscribe = () => () => {};

interface PortalProps {
  selector: string;
}

function Portal({ selector, children = null }: PropsWithChildren<PortalProps>) {
  const container = useSyncExternalStore(
    emptySubscribe,
    () => document.querySelector(selector),
    () => null
  );

  return container ? createPortal(children, container) : null;
}

export default memo(Portal);
