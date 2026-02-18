'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Save } from 'lucide-react';
import { cn, formatTimeDetailed } from '@/utils/cn';
import { Button } from '@/components/ui';
import { useQuizStore } from '@/store/quizStore';

interface AssessmentLayoutProps {
  children: React.ReactNode;
  onExit: () => void;
}

export function AssessmentLayout({ children, onExit }: AssessmentLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { questions, currentQuestionIndex, answers, flaggedQuestions, timeRemaining, setCurrentQuestionIndex } = useQuizStore();
  
  const isLowTime = timeRemaining < 300;
  const timerColor = isLowTime ? 'text-warning' : 'text-heading';
  
  return (
    <div className="min-h-screen bg-body flex flex-col">
      <header className="sticky top-0 z-50 bg-surface border-b border-slate-100 shadow-card">
        <div className="flex items-center justify-between px-4 sm:px-6 h-16">
          <Button variant="ghost" onClick={onExit} className="gap-2">
            <Save className="h-4 w-4" />
            <span className="hidden sm:inline">Save & Exit</span>
          </Button>
          
          <div className="flex items-center gap-4">
            <div className={cn('font-mono text-lg font-semibold', timerColor)}>
              {formatTimeDetailed(timeRemaining)}
            </div>
            
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>
      
      <div className="flex-1 flex">
        <aside
          className={cn(
            'fixed lg:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] w-72 bg-surface border-r border-slate-100 transition-transform duration-300 lg:translate-x-0',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="p-4 h-full overflow-y-auto">
            <h3 className="text-sm font-medium text-muted mb-4">Questions</h3>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, index) => {
                const isAnswered = !!answers[q.id];
                const isFlagged = flaggedQuestions.includes(q.id);
                const isCurrent = index === currentQuestionIndex;
                
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentQuestionIndex(index);
                      setSidebarOpen(false);
                    }}
                    className={cn(
                      'relative w-10 h-10 rounded-lg font-medium text-sm transition-all',
                      isCurrent && 'bg-primary text-white shadow-glow-primary',
                      isAnswered && !isCurrent && 'ring-2 ring-success bg-success-soft text-success',
                      isFlagged && !isCurrent && !isAnswered && 'ring-2 ring-warning bg-warning-soft text-warning',
                      !isCurrent && !isAnswered && !isFlagged && 'bg-slate-100 text-muted hover:bg-slate-200'
                    )}
                  >
                    {index + 1}
                    {isFlagged && !isCurrent && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-warning" />
                    )}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="w-4 h-4 rounded bg-primary" />
                <span className="text-muted">Current</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-4 h-4 rounded ring-2 ring-success bg-success-soft" />
                <span className="text-muted">Answered</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="relative w-4 h-4 rounded ring-2 ring-warning bg-warning-soft">
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-warning" />
                </span>
                <span className="text-muted">Flagged</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-4 h-4 rounded bg-slate-100" />
                <span className="text-muted">Unvisited</span>
              </div>
            </div>
          </div>
        </aside>
        
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
