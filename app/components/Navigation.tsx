'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/expertise', label: 'Expertise' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const isActive = (pathname: string, href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
          scrolled || mobileOpen ? 'bg-primary/80 backdrop-blur-lg border-border' : 'bg-transparent border-transparent'
        }`}
      >
        <div className="container-x h-[72px] grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center gap-6">
          <Link href="/" className="flex items-center" aria-label="Chart+Foster home">
            <Image src="/logo.svg" alt="Chart+Foster" width={168} height={20} priority />
          </Link>

          <div className="hidden lg:flex items-center gap-1 rounded-btn border border-border bg-surface/60 p-1">
            {links.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-btn font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 ${
                    active ? 'bg-surface-light text-white' : 'text-muted hover:text-white'
                  }`}
                >
                  {active && <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-gold" />}
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex justify-end">
            <Link href="/contact" className="btn-primary !py-2.5 !px-5 !text-[13px]">
              Start a project <span aria-hidden>&rarr;</span>
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden justify-self-end w-11 h-11 rounded-btn border border-border-light flex flex-col items-center justify-center gap-1.5"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span className={`block w-4 h-px bg-white transition-transform duration-300 ${mobileOpen ? 'translate-y-[3.5px] rotate-45' : ''}`} />
            <span className={`block w-4 h-px bg-white transition-transform duration-300 ${mobileOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-primary lg:hidden transition-opacity duration-500 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="container-x h-full pt-28 pb-10 flex flex-col">
          <ul className="border-t border-border">
            {links.map((link, i) => (
              <li
                key={link.href}
                className="border-b border-border transition-all duration-500"
                style={{
                  transform: mobileOpen ? 'translateY(0)' : 'translateY(16px)',
                  opacity: mobileOpen ? 1 : 0,
                  transitionDelay: mobileOpen ? `${100 + i * 50}ms` : '0ms',
                }}
              >
                <Link href={link.href} className="flex items-baseline gap-5 py-4 group">
                  <span className="mono-label w-6">{String(i + 1).padStart(2, '0')}</span>
                  <span className={`text-4xl font-bold tracking-tight ${isActive(pathname, link.href) ? 'text-white' : 'text-muted group-hover:text-white'}`}>
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10 grid grid-cols-2 gap-6 text-sm text-muted">
            <div>
              <p className="mono-label mb-2">Email</p>
              <a href="mailto:hello@chartfoster.co" className="text-white">hello@chartfoster.co</a>
            </div>
            <div>
              <p className="mono-label mb-2">Phone</p>
              <a href="tel:+13475550146" className="text-white">+1 (347) 555-0146</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
