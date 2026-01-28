'use client';

import { User, LogOut } from 'lucide-react';
import { mockUser } from '@/mock/user';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 h-16 px-8 flex items-center justify-between fixed top-0 right-0 left-64 z-10">
      <div className="text-sm text-gray-500">
        Welcome back, <span className="font-medium text-gray-900">{mockUser.name}</span>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
            {mockUser.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900">{mockUser.name}</p>
            <p className="text-xs text-gray-500">{mockUser.role}</p>
          </div>
        </div>

        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
