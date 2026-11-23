'use client';

import clsx from 'clsx';
import { AnimatePresence, m } from 'framer-motion';
import NextImage from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import { ChevronRightIcon, XIcon } from '@/components/Icons';
import Portal from '@/components/Portal';

export interface ShowcaseSlide {
  id: string;
  tabLabel: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  title: string;
  caption: string;
  badge?: string;
  surface?: 'light' | 'dark' | 'neutral';
}

interface LightboxModalProps {
  slides: Array<ShowcaseSlide>;
  activeIndex: number;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

function LightboxModal({
  slides,
  activeIndex,
  onClose,
  onChangeIndex,
}: LightboxModalProps) {
  const current = slides[activeIndex];
  const hasMultiple = slides.length > 1;

  const handlePrev = useCallback(() => {
    onChangeIndex((activeIndex - 1 + slides.length) % slides.length);
  }, [activeIndex, onChangeIndex, slides.length]);

  const handleNext = useCallback(() => {
    onChangeIndex((activeIndex + 1) % slides.length);
  }, [activeIndex, onChangeIndex, slides.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (hasMultiple && event.key === 'ArrowLeft') {
        handlePrev();
      } else if (hasMultiple && event.key === 'ArrowRight') {
        handleNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [handleNext, handlePrev, hasMultiple, onClose]);

  if (!current) return null;

  return (
    <Portal selector="body">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={current.title}
        className={clsx(
          'fixed inset-0 z-[1200] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md',
          'sm:p-8'
        )}
        onClick={onClose}
      >
        <m.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.18 }}
          className={clsx(
            'relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900 shadow-2xl'
          )}
          onClick={(event) => event.stopPropagation()}
        >
          <div
            className={clsx(
              'flex items-center justify-between gap-4 border-b border-slate-800 px-4 py-3',
              'sm:px-5'
            )}
          >
            <div className={clsx('flex min-w-0 items-center gap-2.5')}>
              {current.badge && (
                <span
                  className={clsx(
                    'shrink-0 rounded-md bg-accent-400/15 px-2 py-0.5 font-mono text-[11px] font-semibold text-accent-300'
                  )}
                >
                  {current.badge}
                </span>
              )}
              <span
                className={clsx('truncate text-sm font-bold text-slate-100')}
              >
                {current.title}
              </span>
            </div>
            <div className={clsx('flex shrink-0 items-center gap-2')}>
              {hasMultiple && (
                <span className={clsx('font-mono text-xs text-slate-400')}>
                  {activeIndex + 1} / {slides.length}
                </span>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="关闭大图预览"
                className={clsx(
                  'flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 transition',
                  'hover:border-slate-500 hover:text-white'
                )}
              >
                <XIcon className={clsx('h-4 w-4')} />
              </button>
            </div>
          </div>

          <div
            className={clsx(
              'relative flex flex-1 items-center justify-center overflow-auto bg-[#0c1222] p-3',
              'sm:p-5'
            )}
          >
            <NextImage
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              quality={100}
              className={clsx(
                'max-h-[72vh] w-auto rounded-xl object-contain',
                current.surface === 'light' && 'bg-white p-2'
              )}
            />

            {hasMultiple && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="上一张"
                  className={clsx(
                    'absolute left-3 flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 text-slate-200 transition',
                    'hover:border-accent-400 hover:text-accent-300'
                  )}
                >
                  <ChevronRightIcon className={clsx('h-4 w-4 rotate-180')} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="下一张"
                  className={clsx(
                    'absolute right-3 flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 text-slate-200 transition',
                    'hover:border-accent-400 hover:text-accent-300'
                  )}
                >
                  <ChevronRightIcon className={clsx('h-4 w-4')} />
                </button>
              </>
            )}
          </div>

          <div
            className={clsx(
              'border-t border-slate-800 px-4 py-3 text-xs leading-relaxed text-slate-300',
              'sm:px-5'
            )}
          >
            {current.caption}
          </div>
        </m.div>
      </div>
    </Portal>
  );
}

interface ProjectShowcaseProps {
  title: string;
  sourceLabel?: string;
  slides: Array<ShowcaseSlide>;
}

function ProjectShowcase({
  title,
  sourceLabel = '东信智联官方产品实景',
  slides,
}: ProjectShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const current = slides[activeIndex] ?? slides[0];

  if (!current) return null;

  return (
    <figure
      className={clsx(
        'my-7 overflow-hidden rounded-2xl border border-divider-light bg-white',
        'dark:border-divider-dark dark:bg-slate-900'
      )}
    >
      <div
        className={clsx(
          'flex flex-wrap items-center justify-between gap-3 border-b border-divider-light px-4 py-3',
          'sm:px-5',
          'dark:border-divider-dark'
        )}
      >
        <div className={clsx('flex items-center gap-2.5')}>
          <div className={clsx('flex items-center gap-1.5')} aria-hidden="true">
            <span
              className={clsx(
                'h-2.5 w-2.5 rounded-full bg-slate-300',
                'dark:bg-slate-700'
              )}
            />
            <span
              className={clsx(
                'h-2.5 w-2.5 rounded-full bg-slate-300',
                'dark:bg-slate-700'
              )}
            />
            <span
              className={clsx(
                'h-2.5 w-2.5 rounded-full bg-accent-400/70',
                'dark:bg-accent-500/70'
              )}
            />
          </div>
          <span
            className={clsx(
              'text-xs font-bold text-slate-700',
              'dark:text-slate-200'
            )}
          >
            {title}
          </span>
        </div>

        <div className={clsx('flex flex-wrap items-center gap-2')}>
          {slides.length > 1 && (
            <div
              role="tablist"
              aria-label={title}
              className={clsx(
                'inline-flex rounded-lg border border-divider-light bg-slate-50 p-0.5',
                'dark:border-divider-dark dark:bg-slate-800/70'
              )}
            >
              {slides.map((slide, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveIndex(index)}
                    className={clsx(
                      'rounded-md px-2.5 py-1 text-xs font-semibold transition',
                      isActive
                        ? 'bg-white text-accent-600 shadow-xs dark:bg-slate-900 dark:text-accent-400'
                        : 'text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                    )}
                  >
                    {slide.tabLabel}
                  </button>
                );
              })}
            </div>
          )}

          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className={clsx(
              'inline-flex items-center gap-1 rounded-lg border border-divider-light bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 transition',
              'hover:border-accent-400 hover:text-accent-600',
              'dark:border-divider-dark dark:bg-slate-900 dark:text-slate-300 dark:hover:border-accent-500 dark:hover:text-accent-400'
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={clsx('h-3.5 w-3.5')}
              aria-hidden="true"
            >
              <path d="M13.28 7.78l3.22-3.22v2.69a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.69l-3.22 3.22a.75.75 0 001.06 1.06zM2 17.25v-4.5a.75.75 0 011.5 0v2.69l3.22-3.22a.75.75 0 011.06 1.06L4.56 16.5h2.69a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z" />
            </svg>
            大图查看
          </button>
        </div>
      </div>

      <div
        className={clsx(
          'relative overflow-hidden p-3 sm:p-4',
          current.surface === 'dark'
            ? 'bg-[#0c1222]'
            : 'bg-slate-50 dark:bg-[#0c1222]'
        )}
      >
        <AnimatePresence mode="wait">
          <m.button
            key={current.id}
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxOpen(true)}
            aria-label={`放大查看：${current.title}`}
            className={clsx(
              'group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-divider-light/80 text-left',
              'dark:border-divider-dark',
              current.surface === 'light' && 'bg-white p-2 sm:p-3'
            )}
          >
            <NextImage
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              quality={95}
              sizes="(max-width: 1024px) 100vw, 820px"
              className={clsx(
                'h-auto w-full rounded-lg object-cover transition duration-300',
                'group-hover:scale-[1.01]'
              )}
            />
          </m.button>
        </AnimatePresence>
      </div>

      <figcaption
        className={clsx(
          'flex flex-col justify-between gap-2 border-t border-divider-light px-4 py-3.5',
          'sm:flex-row sm:items-center sm:px-5',
          'dark:border-divider-dark'
        )}
      >
        <div className={clsx('flex flex-col gap-0.5')}>
          <div className={clsx('flex flex-wrap items-center gap-2')}>
            {current.badge && (
              <span
                className={clsx(
                  'rounded-md bg-accent-600/[0.08] px-2 py-0.5 font-mono text-[11px] font-semibold text-accent-700',
                  'dark:bg-accent-400/10 dark:text-accent-300'
                )}
              >
                {current.badge}
              </span>
            )}
            <span
              className={clsx(
                'text-xs font-bold text-slate-700',
                'dark:text-slate-200'
              )}
            >
              {current.title}
            </span>
          </div>
          <span
            className={clsx(
              'text-xs leading-relaxed text-slate-500',
              'dark:text-slate-400'
            )}
          >
            {current.caption}
          </span>
        </div>
        <span
          className={clsx(
            'shrink-0 font-mono text-[11px] text-slate-400',
            'dark:text-slate-500'
          )}
        >
          {sourceLabel}
        </span>
      </figcaption>

      <AnimatePresence>
        {lightboxOpen && (
          <LightboxModal
            slides={slides}
            activeIndex={activeIndex}
            onClose={() => setLightboxOpen(false)}
            onChangeIndex={setActiveIndex}
          />
        )}
      </AnimatePresence>
    </figure>
  );
}

interface ProjectPhotoGridProps {
  title: string;
  subtitle?: string;
  photos: Array<ShowcaseSlide>;
}

export function ProjectPhotoGrid({
  title,
  subtitle = '',
  photos,
}: ProjectPhotoGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div
      className={clsx(
        'my-7 overflow-hidden rounded-2xl border border-divider-light bg-white',
        'dark:border-divider-dark dark:bg-slate-900'
      )}
    >
      <div
        className={clsx(
          'flex flex-wrap items-center justify-between gap-2 border-b border-divider-light px-4 py-3',
          'sm:px-5',
          'dark:border-divider-dark'
        )}
      >
        <span
          className={clsx(
            'text-xs font-bold text-slate-700',
            'dark:text-slate-200'
          )}
        >
          {title}
        </span>
        {subtitle && (
          <span
            className={clsx(
              'text-[11px] text-slate-500',
              'dark:text-slate-400'
            )}
          >
            {subtitle}
          </span>
        )}
      </div>

      <div
        className={clsx(
          'grid grid-cols-1 gap-4 bg-slate-50/70 p-4',
          'sm:grid-cols-2',
          'dark:bg-[#0c1222]'
        )}
      >
        {photos.map((photo, index) => (
          <figure
            key={photo.id}
            className={clsx(
              'flex flex-col overflow-hidden rounded-xl border border-divider-light bg-white',
              'dark:border-divider-dark dark:bg-slate-900'
            )}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(index)}
              aria-label={`放大查看：${photo.title}`}
              className={clsx(
                'group relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden bg-slate-100',
                'dark:bg-slate-800'
              )}
            >
              <NextImage
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                quality={90}
                sizes="(max-width: 640px) 100vw, 400px"
                className={clsx(
                  'h-full w-full object-cover transition duration-300',
                  'group-hover:scale-[1.03]'
                )}
              />
            </button>
            <figcaption className={clsx('flex flex-col gap-1 px-3.5 py-3')}>
              <span
                className={clsx(
                  'text-xs font-bold text-slate-700',
                  'dark:text-slate-200'
                )}
              >
                {photo.title}
              </span>
              <span
                className={clsx(
                  'text-[11px] leading-relaxed text-slate-500',
                  'dark:text-slate-400'
                )}
              >
                {photo.caption}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <LightboxModal
            slides={photos}
            activeIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onChangeIndex={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProjectShowcase;
