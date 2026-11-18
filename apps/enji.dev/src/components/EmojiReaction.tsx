'use client';

import clsx from 'clsx';
import { m } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { preload } from 'react-dom';

type AnimationValue = {
  key: number;
  x: number | Array<number>;
  y: number | Array<number>;
  duration: number;
};

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function getRandomAnimationValue(): AnimationValue {
  const key = randomBetween(0, 1000);
  const x = randomBetween(-40, 40);
  const y = randomBetween(-230, -170);
  const duration = randomBetween(1.6, 1.9) + y / 1000;

  return {
    x: [0, x - randomBetween(-10, 10), x],
    y,
    duration,
    key,
  };
}

const emojiMotion = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
  },
  tap: {
    scale: 0.8,
  },
};

interface EmojiReactionProps {
  title: string;
  disabled?: boolean;
  defaultImage: string;
  animatedImage: string;
  disabledImage: string;
  onClick?: () => void;
}

function EmojiReaction({
  title,
  disabled = false,
  defaultImage,
  animatedImage,
  disabledImage,
  onClick = () => {},
}: EmojiReactionProps) {
  const [history, setHistory] = useState<Array<AnimationValue>>([]);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  preload(animatedImage, { as: 'image' });
  preload(disabledImage, { as: 'image' });

  let src = defaultImage;
  if (disabled) {
    src = disabledImage;
  } else if (isHovered) {
    src = animatedImage;
  }

  const handleClick = () => {
    if (disabled) return;

    setHistory((current) => [...current, getRandomAnimationValue()]);
    onClick();
  };

  return (
    <m.button
      disabled={disabled}
      title={title}
      aria-label={title}
      className={clsx('relative cursor-pointer select-none', [
        disabled && 'cursor-not-allowed',
      ])}
      whileTap={!disabled ? 'tap' : undefined}
      whileHover="hover"
      onHoverStart={() => {
        setIsHovered(true);
      }}
      onHoverEnd={() => {
        setIsHovered(false);
      }}
      onClick={handleClick}
    >
      {history.map(({ x, y, duration, key }) => (
        <m.div
          key={key}
          className="pointer-events-none absolute h-10 w-10 select-none"
          initial={{ y: 0, x: 0, opacity: 1 }}
          animate={{
            x,
            y,
            opacity: [1, 1, 0],
          }}
          transition={{
            ease: 'easeOut',
            duration,
          }}
          onAnimationComplete={() => {
            setHistory((current) => current.filter((el) => el.key !== key));
          }}
        >
          <Image
            className={clsx('h-full w-full')}
            alt={title}
            src={animatedImage}
            width={48}
            height={48}
            unoptimized
            priority
          />
        </m.div>
      ))}

      <m.div className={clsx('h-10 w-10')} variants={emojiMotion}>
        <Image
          className={clsx('pointer-events-none h-full w-full')}
          alt={title}
          src={src}
          width={48}
          height={48}
          unoptimized
          priority
        />
      </m.div>
    </m.button>
  );
}

export default EmojiReaction;
