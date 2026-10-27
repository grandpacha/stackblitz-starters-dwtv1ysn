'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const columns = [
  {
    title: 'Pages',
    links: [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/expertise', label: 'Expertise' },
      { href: '/projects', label: 'Projects' },
      { href: '/blog', label: 'Blog' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Expertise',
    links: [
      { href: '/expertise#branding', label: 'Branding' },
      { href: '/expertise#mobile-apps', label: 'Mobile Apps' },
      { href: '/expertise#social-media', label: 'Social Media' },
      { href: '/expertise#web-development', label: 'Web Development' },
    ],
  },
];

const bottomLinks = [
  { href: 'https://maps.google.com/?q=146+Franklin+Street+Brooklyn+NY+11222', label: '146 Franklin Street, Brooklyn, NY 11222', external: true },
  { href: '#', label: 'Twitter', external: true },
  { href: '#', label: 'Dribbble', external: true },
  { href: '#', label: 'Behance', external: true },
];

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="bg-surface border-t border-border">
      <div className="container-x pt-24 md:pt-32">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 pb-20 md:pb-28">
          <div className="col-span-12 md:col-span-3">
            <p className="mono-label flex items-center gap-3">
              <span className="text-gold">{'//'}</span>Start a project
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <p className="text-h1 max-w-4xl">
              Let&apos;s build something <span className="text-muted">worth remembering.</span>
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <Link href="/contact" className="link-underline text-xl md:text-2xl">
                Contact us <span className="arrow">&rarr;</span>
              </Link>
              <a href="mailto:hello@chartfoster.co" className="text-muted hover:text-white transition-colors">
                hello@chartfoster.co
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 lg:col-span-4 border-t border-border-light pt-6">
            <Image src="/logo.svg" alt="Chart+Foster" width={200} height={24} />
            <p className="text-muted text-sm mt-6 leading-relaxed max-w-xs">
              A brand and business strategy firm for companies with $10M+ in revenue. Positioning, identity and growth strategy, built to last.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="col-span-6 md:col-span-4 lg:col-span-2 border-t border-border-light pt-6">
              <p className="mono-label mb-5">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/80 hover:text-gold transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-12 md:col-span-4 lg:col-span-4 border-t border-border-light pt-6">
            <p className="mono-label mb-5">Newsletter</p>
            <p className="text-sm text-muted mb-5 leading-relaxed">One considered note a month on brand, positioning and growth.</p>
            {subscribed ? (
              <p className="text-sm text-gold" role="status">Thanks. You&apos;re on the list.</p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubscribed(true);
                }}
                className="flex items-stretch border-b border-border-light focus-within:border-white transition-colors"
              >
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  placeholder="Your email"
                  className="flex-1 !bg-transparent !border-0 !rounded-none !px-0 !py-3 text-sm"
                />
                <button type="submit" className="mono-label !text-white hover:!text-gold transition-colors pl-4">
                  Subscribe &rarr;
                </button>
              </form>
            )}
            <div className="mt-8 space-y-1 text-sm">
              <a href="tel:+13475550146" className="block text-white/80 hover:text-white">+1 (347) 555-0146</a>
              <a href="mailto:hello@chartfoster.co" className="block text-white/80 hover:text-white">hello@chartfoster.co</a>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] border-t border-white/80">
          {bottomLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external && link.href !== '#' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className={`flex items-center justify-between gap-4 py-5 text-sm font-semibold hover:text-gold transition-colors border-b md:border-b-0 border-border ${
                i > 0 ? 'md:pl-6 md:border-l' : 'md:pr-6'
              }`}
            >
              <span className="truncate">{link.label}</span>
              <span aria-hidden>&#9656;</span>
            </a>
          ))}
        </div>

        <div className="py-8 flex flex-col md:flex-row justify-between gap-4 border-t border-border">
          <p className="mono-label !tracking-[0.12em]">&copy; 2005&ndash;2025 Chart+Foster Co. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="mono-label !tracking-[0.12em] hover:!text-white">Privacy Policy</a>
            <a href="#" className="mono-label !tracking-[0.12em] hover:!text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
