import clsx from 'clsx';
import Link from 'next/link';

import { ExternalLink, GitHubIcon, MailIcon } from '@/components/Icons';

import dayjs from '@/utils/dayjs';

function LastUpdate() {
  return (
    <a
      href="https://github.com/sunnaobobo/portfolio"
      target="_blank"
      rel="noreferrer nofollow"
      className={clsx('hover:underline')}
    >
      <span>在 GitHub 查看本站源码</span>
    </a>
  );
}

interface FooterLinkProps {
  title: string;
  href: string;
  label?: 'new' | 'soon';
  isInternal?: boolean;
}

const footerLabelText: Record<'new' | 'soon', string> = {
  new: '新',
  soon: '敬请期待',
};

function FooterLink({
  title,
  href,
  label = undefined,
  isInternal = true,
}: FooterLinkProps) {
  if (label === 'soon') {
    return (
      <span className={clsx('footer-link footer-link--soon')}>
        {title}
        <span className={clsx('footer-link__label')}>
          {footerLabelText[label]}
        </span>
      </span>
    );
  }

  if (isInternal) {
    return (
      <Link href={href} className={clsx('footer-link')}>
        {title}
        {label && (
          <span className={clsx('footer-link__label')}>
            {footerLabelText[label]}
          </span>
        )}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer nofollow"
      className={clsx('footer-link')}
    >
      {title}
      <ExternalLink className={clsx('h-3.5 w-3.5')} />
      {label && (
        <span className={clsx('footer-link__label')}>
          {footerLabelText[label]}
        </span>
      )}
    </a>
  );
}

interface FooterGroupProps {
  title: string;
  links: Array<FooterLinkProps>;
}

function FooterGroup({ title, links }: FooterGroupProps) {
  return (
    <div className={clsx('flex-1')}>
      <div
        className={clsx(
          'mb-2 px-2 text-[13px] text-slate-600',
          'dark:text-slate-400'
        )}
      >
        {title}
      </div>
      <ul className={clsx('flex flex-col')}>
        {links.map(({ title: linkTitle, href, label, isInternal }) => (
          <li key={href}>
            <FooterLink
              title={linkTitle}
              href={href}
              label={label}
              isInternal={isInternal}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterDescription() {
  return (
    <div className={clsx('max-w-[380px]')}>
      <div
        className={clsx(
          'mb-3 text-[13px] font-medium text-slate-600',
          'dark:text-slate-400'
        )}
      >
        关于我
      </div>
      <p className={clsx('mb-4 leading-7 font-normal')}>
        我是孙靖，一名专注于 <strong>AI 智能体工程化与高可用全栈架构</strong>{' '}
        的开发者，热衷用确定性的工程体系解决复杂业务问题。
      </p>
      <ul className={clsx('-ml-2 flex gap-1')}>
        <li>
          <a
            href="https://github.com/florianjsun"
            target="_blank"
            rel="noreferrer nofollow"
            className={clsx('flex h-9 w-9 items-center justify-center')}
            aria-label="我的 GitHub 主页"
            title="我的 GitHub 主页"
          >
            <GitHubIcon className={clsx('h-5 w-5')} />
          </a>
        </li>
        <li>
          <a
            href="mailto:florianjsun@gmail.com"
            className={clsx('flex h-9 w-9 items-center justify-center')}
            aria-label="发送电子邮件"
            title="florianjsun@gmail.com"
          >
            <MailIcon className={clsx('h-5 w-5')} />
          </a>
        </li>
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <footer
      className={clsx(
        'background-grid background-grid--fade-in mt-24 border-divider-light pt-16 text-sm text-slate-900',
        'dark:border-divider-dark dark:text-slate-200'
      )}
    >
      <div className={clsx('content-wrapper')}>
        <div className={clsx('py-10 font-medium')}>
          <div className={clsx('flex flex-col-reverse gap-16', 'lg:flex-row')}>
            <div className={clsx('flex-1')}>
              <FooterDescription />
            </div>
            <div
              className={clsx(
                '-mx-2 flex flex-1 flex-col gap-8',
                'sm:flex-row sm:gap-12 lg:mx-0'
              )}
            >
              <div className={clsx('flex gap-8', 'sm:gap-12')}>
                <FooterGroup
                  title="工作与履历"
                  links={[
                    { title: '工作经历', href: '/work/experience' },
                    {
                      title: '技能与工具',
                      href: '/work/skills-and-tools',
                    },
                    { title: '工作台', href: '/work/studio' },
                    { title: '联系方式', href: '/work/contact' },
                  ]}
                />
                <FooterGroup
                  title="项目与笔记"
                  links={[
                    {
                      title: '项目展示',
                      href: '/projects',
                    },
                    {
                      title: '技术博客',
                      href: '/blog',
                    },
                    {
                      title: '今日所学',
                      href: '/today-i-learned',
                      label: 'new',
                    },
                  ]}
                />
              </div>
              <div className={clsx('flex gap-8', 'sm:gap-12')}>
                <FooterGroup
                  title="关于本站"
                  links={[
                    {
                      title: 'GitHub 主页',
                      href: 'https://github.com/florianjsun',
                      isInternal: false,
                    },
                    {
                      title: '本站源码',
                      href: 'https://github.com/sunnaobobo/portfolio',
                      isInternal: false,
                    },
                    {
                      title: '致谢说明',
                      href: '/credits',
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className={clsx(
            'flex flex-col gap-2 border-t border-divider-light py-6 text-xs',
            'sm:flex-row sm:items-center sm:justify-between',
            'dark:border-divider-dark'
          )}
        >
          <div className={clsx('font-semibold')}>
            &copy; {dayjs().format('YYYY')} 孙靖 (Sun Jing)
          </div>
          <div className={clsx('text-slate-500', 'dark:text-slate-400')}>
            <LastUpdate />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
