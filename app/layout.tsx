import './globals.css';
import type { Metadata } from 'next';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'Chart+Foster Co. | Brand & Business Strategy',
  description: 'A brand and business strategy firm that consults with small and medium-sized businesses with revenue of $10 million and above.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
