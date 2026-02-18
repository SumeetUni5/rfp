import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Student Assessment Portal',
  description: 'A high-fidelity, production-ready Student Assessment Portal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
