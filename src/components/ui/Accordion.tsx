'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

interface AccordionContextValue {
  openItems: string[];
  toggleItem: (id: string) => void;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

interface AccordionProps {
  children: React.ReactNode;
  type?: 'single' | 'multiple';
  defaultValue?: string[];
  className?: string;
}

export function Accordion({ children, type = 'single', defaultValue = [], className }: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<string[]>(defaultValue);

  const toggleItem = React.useCallback(
    (id: string) => {
      setOpenItems((prev) => {
        if (type === 'single') {
          return prev.includes(id) ? [] : [id];
        }
        return prev.includes(id)
          ? prev.filter((item) => item !== id)
          : [...prev, id];
      });
    },
    [type]
  );

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={cn('space-y-2', className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function AccordionItem({ id, children, className }: AccordionItemProps) {
  return (
    <div className={cn('border border-slate-200 rounded-xl overflow-hidden', className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<{ itemId?: string }>, { itemId: id });
        }
        return child;
      })}
    </div>
  );
}

interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  itemId?: string;
}

export function AccordionTrigger({ children, itemId, className, ...props }: AccordionTriggerProps) {
  const context = React.useContext(AccordionContext);
  if (!context || !itemId) return null;

  const isOpen = context.openItems.includes(itemId);

  return (
    <button
      type="button"
      onClick={() => context.toggleItem(itemId)}
      className={cn(
        'flex w-full items-center justify-between p-4 text-left font-medium transition-colors',
        'hover:bg-slate-50',
        isOpen && 'bg-slate-50',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn(
          'h-4 w-4 shrink-0 text-muted transition-transform duration-200',
          isOpen && 'rotate-180'
        )}
      />
    </button>
  );
}

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  itemId?: string;
}

export function AccordionContent({ children, itemId, className, ...props }: AccordionContentProps) {
  const context = React.useContext(AccordionContext);
  if (!context || !itemId) return null;

  const isOpen = context.openItems.includes(itemId);

  if (!isOpen) return null;

  return (
    <div className={cn('px-4 pb-4 pt-0', className)} {...props}>
      {children}
    </div>
  );
}
