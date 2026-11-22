import clsx from 'clsx';

function Error500Contents() {
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
            500
          </div>
          <div
            className={clsx(
              'text-2xl font-bold text-slate-700 dark:text-slate-200'
            )}
          >
            服务器开小差了
          </div>
          <p
            className={clsx('mt-3 text-sm text-slate-500 dark:text-slate-400')}
          >
            页面加载遇到意外错误，请稍后刷新页面重试。
          </p>
        </h1>
      </div>
    </div>
  );
}

export default Error500Contents;
