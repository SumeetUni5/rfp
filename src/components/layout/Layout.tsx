'use client';

import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64 pt-16">
        <Header />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
