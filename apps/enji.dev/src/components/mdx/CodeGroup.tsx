'use client';

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import clsx from 'clsx';
import { Children, isValidElement } from 'react';

import { Pre } from '@/components/mdx/custom-components/Pre';

import { formatLang } from '@/helpers/mdx';

import type { PreProps } from '@/components/mdx/custom-components/Pre';
import type { PropsWithChildren, ReactElement, ReactNode } from 'react';

function CodeGroupFile({ children = null }: PropsWithChildren) {
  return (
    <Tab className={clsx('mdx-code-group__file')}>
      {({ selected }) => (
        <div className={clsx('mdx-code-group__file-content')}>
          {selected && (
            <>
              <div className={clsx('mdx-code-group__file-bl')} />
              <div className={clsx('mdx-code-group__file-br')} />
            </>
          )}
          {children}
        </div>
      )}
    </Tab>
  );
}

function CodeGroupTab({ children = null }: PropsWithChildren) {
  return <Tab className={clsx('mdx-code-group__tab')}>{children}</Tab>;
}

interface CodeGroupProps {
  children: ReactNode;
  variant?: 'tab' | 'files';
}

function CodeGroup({ variant = 'tab', children }: CodeGroupProps) {
  const tab: Array<{
    icon: ReactElement;
    title: string;
    panel: ReactElement<PreProps>;
  }> = [];

  Children.forEach(children, (child) => {
    if (!isValidElement<PreProps>(child)) {
      return;
    }

    const childProps = (child.props || {}) as PreProps;
    const isCodeBlock =
      child.type === Pre ||
      typeof childProps['data-language'] !== 'undefined' ||
      typeof childProps['data-lines'] !== 'undefined' ||
      typeof childProps['data-title'] !== 'undefined';

    if (isCodeBlock) {
      const title = childProps['data-title'] || '';
      const language = childProps['data-language'] || '';

      const { icon } = formatLang(language, title);

      tab.push({
        icon,
        title,
        panel: child,
      });
    }
  });

  return (
    <div
      className={clsx('mdx-code-group', [
        variant === 'tab' ? 'mdx-code-group--tab' : 'mdx-code-group--files',
      ])}
    >
      <TabGroup manual>
        <div className={clsx('mdx-code-group__header-wrapper')}>
          <TabList className={clsx('mdx-code-group__header')}>
            {tab.map(({ title, icon }, idx) =>
              variant === 'tab' ? (
                <CodeGroupTab key={`${title}-${idx}`}>
                  {icon}
                  {title}
                </CodeGroupTab>
              ) : (
                <CodeGroupFile key={`${title}-${idx}`}>
                  {icon}
                  {title}
                </CodeGroupFile>
              )
            )}
          </TabList>
        </div>
        <TabPanels className={clsx('mdx-code-group__content')}>
          {tab.map(({ title, panel }, idx) => (
            <TabPanel key={`${title}-${idx}`}>{panel}</TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
}

export default CodeGroup;
