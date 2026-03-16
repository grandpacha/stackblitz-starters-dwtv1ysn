'use client';

import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/expertise', label: 'Expertise' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const expertiseLinks = [
  { href: '/expertise#branding', label: 'Branding' },
  { href: '/expertise#mobile-apps', label: 'Mobile Apps' },
  { href: '/expertise#social-media', label: 'Social Media' },
  { href: '/expertise#web-development', label: 'Web Development' },
];

const socials = [
  { href: '#', label: 'Twitter' },
  { href: '#', label: 'Dribbble' },
  { href: '#', label: 'Behance' },
];

export default function Footer() {
  return (
    <footer className="bg-surface pt-20 pb-8">
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-border">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              Chart+Foster
            </Link>
            <p className="text-muted text-sm mt-4 leading-relaxed max-w-xs">
              A brand and business strategy firm helping ambitious companies craft iconic, unforgettable brand experiences.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Pages</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted text-sm hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Expertise */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Expertise</h4>
            <ul className="space-y-3">
              {expertiseLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted text-sm hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-sm font-semibold mb-4 mt-8 uppercase tracking-wider">Social</h4>
            <ul className="space-y-3">
              {socials.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-muted text-sm hover:text-white transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Newsletter</h4>
            <p className="text-muted text-sm mb-4">Stay updated with our latest insights and projects.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 !py-2.5 !px-3 !text-sm !rounded-lg"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-white text-primary text-sm font-medium rounded-lg hover:bg-cream transition-colors duration-200 flex-shrink-0"
              >
                Subscribe
              </button>
            </form>

            <h4 className="text-sm font-semibold mb-4 mt-8 uppercase tracking-wider">Contact</h4>
            <div className="space-y-2 text-muted text-sm">
              <p>146 Franklin Street<br />Brooklyn, NY 11222</p>
              <p>hello@chartfoster.co</p>
              <p>+1 (347) 555-0146</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
          <p className="text-muted text-xs">
            &copy; 2005&ndash;2025 Chart+Foster Co. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted text-xs hover:text-white transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-muted text-xs hover:text-white transition-colors duration-200">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
