'use client';

import * as React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface KaTeXProps {
  children: string;
  displayMode?: boolean;
  className?: string;
}

export function KaTeX({ children, displayMode = true, className }: KaTeXProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(children, containerRef.current, {
          displayMode,
          throwOnError: false,
          trust: true,
        });
      } catch (error) {
        console.error('KaTeX rendering error:', error);
        containerRef.current.textContent = children;
      }
    }
  }, [children, displayMode]);

  return <div ref={containerRef} className={className} />;
}

export function MathBlock({ content, className }: { content: string; className?: string }) {
  if (!content) return null;
  
  return (
    <div className={cn('my-4 p-4 bg-slate-50 rounded-xl overflow-x-auto', className)}>
      <KaTeX displayMode>{content}</KaTeX>
    </div>
  );
}

function cn(...args: (string | undefined | null | false)[]) {
  return args.filter(Boolean).join(' ');
}
