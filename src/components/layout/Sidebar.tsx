'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';
import {
  LayoutDashboard,
  FileText,
  Users,
  FileCheck,
  Settings,
  PlusCircle,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'RFPs', href: '/rfp', icon: FileText },
  { name: 'Vendors', href: '/vendors', icon: Users },
  { name: 'Proposals', href: '/proposals', icon: FileCheck },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col fixed h-full">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold">RFP Manager</h1>
        <p className="text-sm text-gray-400 mt-1">Procurement Platform</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              )}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <Link
          href="/rfp/create"
          className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Create RFP
        </Link>
      </div>
    </div>
  );
}
