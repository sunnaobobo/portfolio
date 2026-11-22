import clsx from 'clsx';
import Link from 'next/link';

function Error404Contents() {
  return (
    <div
      className={clsx(
        'background-grid flex h-full items-center justify-center'
      )}
    >
      <div
        className={clsx(
          'content-wrapper text-center text-slate-600',
          'dark:text-slate-400'
        )}
      >
        <h1 className={clsx('py-12 text-center')}>
          <div className={clsx('mb-4 font-mono text-8xl font-extrabold')}>
            404
          </div>
          <div
            className={clsx(
              'text-2xl font-bold text-slate-700 dark:text-slate-200'
            )}
          >
            找不到该页面
          </div>
          <p
            className={clsx('mt-3 text-sm text-slate-500 dark:text-slate-400')}
          >
            你访问的链接可能已移动或不存在，请检查网址或返回首页继续浏览。
          </p>
        </h1>
        <Link href="/" className={clsx('button button--soft')}>
          返回首页
        </Link>
      </div>
    </div>
  );
}

export default Error404Contents;
