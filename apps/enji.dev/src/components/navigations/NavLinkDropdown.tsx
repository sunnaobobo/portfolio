'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import clsx from 'clsx';
import { m } from 'framer-motion';
import Link from 'next/link';
import { forwardRef } from 'react';

import { ChevronRightIcon } from '@/components/Icons';

import type { HTMLAttributes, Ref } from 'react';
import type { UrlObject } from 'url';

const animation = {
  hide: { opacity: 0, y: -16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.18 } },
};

type LinkRefProps = HTMLAttributes<HTMLAnchorElement> & {
  href: string | UrlObject;
};

const LinkRef = forwardRef(
  ({ href, children, ...rest }: LinkRefProps, ref: Ref<HTMLAnchorElement>) => (
    <Link href={href} ref={ref} {...rest}>
      {children}
    </Link>
  )
);

LinkRef.displayName = 'LinkRef';

type NavLink = {
  href: string;
  title: string;
};

interface NavLinkDropdownProps {
  title: string;
  items: Array<NavLink>;
}

function NavLinkDropdown({ title, items }: NavLinkDropdownProps) {
  return (
    <div className="relative">
      <Menu>
        {({ open }) => (
          <>
            <MenuButton className={clsx('nav-link nav-link--label ml-2')}>
              {title}
              <ChevronRightIcon
                className={clsx('h-3 w-3 rotate-90', [open && '-rotate-90'])}
              />
            </MenuButton>
            {open && (
              <MenuItems
                static
                as={m.div}
                variants={animation}
                initial="hide"
                animate="show"
                className={clsx(
                  'absolute top-11 flex w-40 flex-col rounded-2xl border border-divider-light bg-white/70 p-2 backdrop-blur',
                  'dark:border-divider-dark dark:bg-slate-900/80'
                )}
              >
                {items.map((item) => (
                  <MenuItem key={item.href}>
                    {({ focus }) => (
                      <LinkRef
                        href={item.href}
                        className={clsx('nav-link h-8 text-xs', [
                          focus && 'nav-link--focus',
                        ])}
                      >
                        {item.title}
                      </LinkRef>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            )}
          </>
        )}
      </Menu>
    </div>
  );
}

export default NavLinkDropdown;
