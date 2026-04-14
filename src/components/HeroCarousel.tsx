'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeroCarouselProps {
  title?: string;
  tagline?: string;
  subtitle?: string;
  autoplayInterval?: number;
  primaryButton?: { label: string; href: string };
  buttons?: { label: string; href: string }[];
}

const images = [
  '/_DSC8917.JPG',
  '/_DSC8964.JPG',
  '/_DSC8987.JPG',
  '/_DSC9047.JPG',
  '/_DSC9106.JPG',
  '/_DSC9111.JPG',
  '/_DSC9121.JPG',
  '/_DSC9136.JPG',
  '/_DSC9141.JPG',
];

export default function HeroCarousel({
  title,
  tagline,
  subtitle,
  autoplayInterval = 5000,
  primaryButton,
  buttons = [],
}: HeroCarouselProps) {
  const [current, setCurrent] = useState(images.length - 2);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const next = useCallback(() => setCurrent((p) => (p + 1) % images.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + images.length) % images.length), []);

  useEffect(() => {
    const t = setInterval(next, autoplayInterval);
    return () => clearInterval(t);
  }, [autoplayInterval, next]);

  const onTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.touches[0].clientX);
  const onTouchEnd = () => {
    if (touchStart == null || touchEnd == null) return;
    if (touchStart - touchEnd > 50) next();
    else if (touchEnd - touchStart > 50) prev();
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section
      className="relative w-full min-h-[88vh] sm:min-h-screen overflow-hidden"
      aria-label="Hero carousel"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Images with fade transition */}
      {images.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={i !== current}
        >
          <Image
            src={src}
            alt={`Level Up in Germany – événement ${i + 1}`}
            fill
            className="object-cover object-center"
            priority={i === 0}
            unoptimized
          />
        </div>
      ))}

      {/* Brand overlay: deep dark-red + gold ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background: `
            linear-gradient(110deg,
              rgba(17,8,8,0.88) 0%,
              rgba(30,10,10,0.6) 35%,
              rgba(0,0,0,0.28) 62%,
              transparent 88%
            ),
            radial-gradient(ellipse 60% 80% at 0% 50%, rgba(140,26,26,0.45), transparent 65%),
            radial-gradient(ellipse 45% 45% at 15% 10%, rgba(233,140,11,0.2), transparent 55%)
          `,
        }}
      />
      {/* Bottom gradient for grounding */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
        aria-hidden
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)' }}
      />

      {/* Text content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end sm:justify-center px-6 sm:px-12 md:px-16 pb-20 sm:pb-0">
        <div className="max-w-2xl">
          {tagline && (
            <p className="animate-hero-tagline mb-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-accent drop-shadow-md">
              {tagline}
            </p>
          )}
          {title && (
            <h1 className="animate-hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-xl tracking-tight text-balance leading-tight">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="animate-hero-subtitle text-base sm:text-lg md:text-xl text-white/90 mb-8 drop-shadow-md max-w-xl leading-relaxed">
              {subtitle}
            </p>
          )}

          {/* CTAs */}
          {(primaryButton || buttons.length > 0) && (
            <div className="animate-hero-buttons flex flex-wrap gap-3 sm:gap-4">
              {primaryButton && (() => {
                const isExternal = /^https?:\/\//i.test(primaryButton.href);
                const cls = 'group hero-cta-glow inline-flex items-center justify-center gap-2 min-w-[200px] h-12 sm:h-14 px-6 rounded-full bg-primary text-white font-semibold shadow-xl border-2 border-primary/80 hover:bg-primary-light hover:border-primary-light hover:scale-[1.03] active:scale-[0.98] transition-all duration-300';
                const inner = <>{primaryButton.label} <span aria-hidden className="group-hover:translate-x-0.5 transition-transform">→</span></>;
                return isExternal
                  ? <a key="p" href={primaryButton.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
                  : <Link key="p" href={primaryButton.href} className={cls}>{inner}</Link>;
              })()}
              {buttons[0] && (
                <Link
                  href={buttons[0].href}
                  className="inline-flex items-center justify-center gap-2 min-w-[200px] h-12 sm:h-14 px-6 rounded-full bg-white/10 text-white font-semibold backdrop-blur-sm border-2 border-white/60 hover:bg-white hover:text-brand-dark hover:border-white hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-lg"
                >
                  {buttons[0].label}
                </Link>
              )}
              {buttons[1] && (
                <Link
                  href={buttons[1].href}
                  className="inline-flex items-center justify-center gap-2 min-w-[200px] h-12 sm:h-14 px-6 rounded-full bg-accent text-white font-semibold shadow-xl border-2 border-accent/90 hover:bg-accent-light hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
                >
                  {buttons[1].label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Slide dots — bottom center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            aria-current={i === current ? 'true' : undefined}
            className={`rounded-full transition-all duration-300 ${
              i === current ? 'w-6 h-2 bg-accent' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Left / Right arrows — desktop */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-10 h-10 rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm transition"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-10 h-10 rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm transition"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
}
