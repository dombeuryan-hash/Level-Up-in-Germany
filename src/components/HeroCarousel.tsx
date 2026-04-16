'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeroCarouselProps {
  title?: string;
  tagline?: string;
  subtitle?: string;
  autoplayInterval?: number;
  primaryButton?: { label: string; href: string };
  buttons?: { label: string; href: string }[];
  stats?: { value: number; suffix: string; label: string }[];
}

const images = [
  '/hero-pic/leveluper1.jpg',
  '/hero-pic/leveluper2.jpg',
  '/hero-pic/leveluper3.jpg',
  '/hero-pic/leveluper5.jpg',
  '/hero-pic/leveluper6.jpg',
  '/hero-pic/leveluper7.jpg',
  '/hero-pic/leveluper8.jpeg',
  '/hero-pic/leveluper9.png',
];

export default function HeroCarousel({
  title,
  tagline,
  subtitle,
  autoplayInterval = 4000,
  primaryButton,
  buttons = [],
}: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [dir, setDir] = useState<'next' | 'prev'>('next');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (d: 'next' | 'prev') => {
      setDir(d);
      setLeaving(current);
      setCurrent((c) =>
        d === 'next' ? (c + 1) % images.length : (c - 1 + images.length) % images.length,
      );
    },
    [current],
  );

  /* autoplay */
  useEffect(() => {
    timerRef.current = setInterval(() => go('next'), autoplayInterval);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [autoplayInterval, go]);

  return (
    <section
      className="relative w-full min-h-[88vh] sm:min-h-screen overflow-hidden"
      aria-label="Hero carousel"
    >
      {/* ── Images: zoom + fade + slide transition ── */}
      {images.map((src, i) => {
        const isActive = i === current;
        const isLeaving = i === leaving;
        let cls =
          'absolute inset-0 will-change-[opacity,transform] transition-all duration-[1200ms] ease-[cubic-bezier(.4,0,.2,1)]';
        if (isActive) {
          cls += ' opacity-100 scale-100 translate-x-0 z-[2]';
        } else if (isLeaving) {
          cls +=
            dir === 'next'
              ? ' opacity-0 scale-[1.06] -translate-x-[3%] z-[1]'
              : ' opacity-0 scale-[1.06] translate-x-[3%] z-[1]';
        } else {
          cls += ' opacity-0 scale-110 translate-x-0 z-0';
        }
        return (
          <div key={src} className={cls} aria-hidden={!isActive}>
            <Image
              src={src}
              alt={`Level Up in Germany – event ${i + 1}`}
              fill
              className="object-cover object-center select-none pointer-events-none"
              priority={i === 0}
              unoptimized
              draggable={false}
            />
          </div>
        );
      })}

      {/* ── Overlay: branded cinematic scrim (primary red + accent orange) ── */}
      {/* Base: angled primary-red wash */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        aria-hidden
        style={{
          background: `
            linear-gradient(105deg,
              rgba(60,10,10,0.68) 0%,
              rgba(60,10,10,0.42) 30%,
              rgba(40,8,8,0.18) 55%,
              transparent 78%
            )
          `,
        }}
      />
      {/* Warm accent-orange tint blended softly */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none mix-blend-soft-light"
        aria-hidden
        style={{
          background: `
            linear-gradient(95deg,
              rgba(233,140,11,0.22) 0%,
              rgba(233,140,11,0.10) 35%,
              transparent 58%
            )
          `,
        }}
      />
      {/* Bottom-left vignette: primary red depth */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 0% 100%,
              rgba(40,8,8,0.40) 0%,
              transparent 55%
            )
          `,
        }}
      />
      {/* Bottom edge: soft ground shadow with primary */}
      <div
        className="absolute bottom-0 left-0 right-0 h-56 z-[3] pointer-events-none"
        aria-hidden
        style={{
          background: `
            linear-gradient(to top,
              rgba(40,8,8,0.48) 0%,
              rgba(40,8,8,0.20) 45%,
              transparent 100%
            )
          `,
        }}
      />

      {/* ── Text content — bottom-left, no card ── */}
      <div className="absolute inset-0 z-10 flex items-center pb-0 pt-20 sm:pt-24 px-6 sm:px-10 md:px-16 lg:px-20">
        <div className="max-w-4xl">
          {tagline && (
            <p className="animate-hero-tagline mb-5 text-sm sm:text-base font-semibold uppercase tracking-[0.22em] text-accent drop-shadow-md">
              {tagline}
            </p>
          )}
          {title && (
            <h1 className="animate-hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-5 drop-shadow-xl tracking-tight leading-[1.02] whitespace-nowrap">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="animate-hero-subtitle text-base sm:text-lg md:text-xl text-white/80 mb-10 max-w-xl leading-relaxed drop-shadow-md">
              {subtitle}
            </p>
          )}

          {(primaryButton || buttons.length > 0) && (
            <div className="animate-hero-buttons flex flex-wrap items-center gap-3 sm:gap-4">
              {primaryButton && (() => {
                const isExternal = /^https?:\/\//i.test(primaryButton.href);
                const cls =
                  'group inline-flex items-center justify-center gap-2 h-12 sm:h-14 px-7 rounded-full bg-primary text-white font-semibold shadow-lg hover:bg-primary-light hover:shadow-xl active:scale-[0.97] transition-all duration-200 text-sm sm:text-base';
                const inner = (
                  <>
                    {primaryButton.label}
                    <span aria-hidden className="inline-block group-hover:translate-x-0.5 transition-transform">→</span>
                  </>
                );
                return isExternal ? (
                  <a key="p" href={primaryButton.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
                ) : (
                  <Link key="p" href={primaryButton.href} className={cls}>{inner}</Link>
                );
              })()}
              {buttons[0] && (
                <Link
                  href={buttons[0].href}
                  className="inline-flex items-center justify-center h-12 sm:h-14 px-7 rounded-full bg-white/10 text-white font-semibold backdrop-blur-sm border border-white/30 hover:bg-white hover:text-brand-dark hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 text-sm sm:text-base"
                >
                  {buttons[0].label}
                </Link>
              )}
              {buttons[1] && (
                <Link
                  href={buttons[1].href}
                  className="inline-flex items-center justify-center h-12 sm:h-14 px-7 rounded-full bg-accent text-white font-semibold shadow-lg hover:bg-accent-light hover:shadow-xl active:scale-[0.97] transition-all duration-200 text-sm sm:text-base"
                >
                  {buttons[1].label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
