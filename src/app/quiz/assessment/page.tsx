'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Flag, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { AssessmentLayout } from '@/components/layout/AssessmentLayout';
import { Button, RadioCard, KaTeX } from '@/components/ui';
import { useQuizStore } from '@/store/quizStore';

export default function AssessmentPage() {
  const router = useRouter();
  const {
    questions,
    currentQuestionIndex,
    answers,
    flaggedQuestions,
    timeRemaining,
    setAnswer,
    toggleFlagged,
    nextQuestion,
    previousQuestion,
    endQuiz,
    updateTimeRemaining,
    status,
  } = useQuizStore();

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : null;
  const isFlagged = currentQuestion ? flaggedQuestions.includes(currentQuestion.id) : false;

  React.useEffect(() => {
    if (status !== 'in-progress') {
      router.push('/quiz/setup');
      return;
    }
  }, [status, router]);

  React.useEffect(() => {
    if (timeRemaining <= 0) {
      endQuiz();
      router.push('/quiz/results');
      return;
    }

    const interval = setInterval(() => {
      updateTimeRemaining(timeRemaining - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining, updateTimeRemaining, endQuiz, router]);

  const handleExit = () => {
    if (confirm('Are you sure you want to exit? Your progress will be saved.')) {
      router.push('/quiz/setup');
    }
  };

  const handleSubmit = () => {
    const unanswered = questions.filter(q => !answers[q.id]).length;
    if (unanswered > 0) {
      if (!confirm(`You have ${unanswered} unanswered question${unanswered > 1 ? 's' : ''}. Submit anyway?`)) {
        return;
      }
    }
    endQuiz();
    router.push('/quiz/results');
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-body flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted">Loading question...</p>
        </div>
      </div>
    );
  }

  return (
    <AssessmentLayout onExit={handleExit}>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <div className="flex items-center gap-2">
              {isFlagged && (
                <span className="flex items-center gap-1 text-sm text-warning">
                  <Flag className="w-4 h-4" />
                  Flagged
                </span>
              )}
            </div>
          </div>
          
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-surface rounded-2xl border border-slate-100 shadow-card p-6 sm:p-8 mb-6">
            <div className="flex items-start gap-3 mb-6">
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-soft text-primary flex items-center justify-center font-semibold text-sm">
                {currentQuestionIndex + 1}
              </span>
              <div className="flex-1">
                <p className="text-lg font-medium text-heading leading-relaxed">
                  {currentQuestion.questionText}
                </p>
              </div>
            </div>

            {currentQuestion.latexContent && (
              <div className="my-6 p-4 bg-slate-50 rounded-xl overflow-x-auto">
                <KaTeX displayMode>{currentQuestion.latexContent}</KaTeX>
              </div>
            )}

            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <RadioCard
                  key={option.id}
                  id={option.id}
                  label={`Option ${option.id.toUpperCase()}`}
                  latexContent={option.latexContent}
                  selected={currentAnswer === option.id}
                  onSelect={() => setAnswer(currentQuestion.id, option.id)}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant={isFlagged ? 'secondary' : 'outline'}
              onClick={() => toggleFlagged(currentQuestion.id)}
              className="gap-2"
            >
              <Flag className={cn('w-4 h-4', isFlagged && 'fill-current')} />
              {isFlagged ? 'Unflag' : 'Flag for Review'}
            </Button>

            {currentQuestionIndex === questions.length - 1 ? (
              <Button variant="success" onClick={handleSubmit} className="gap-2">
                <AlertCircle className="w-4 h-4" />
                Submit Quiz
              </Button>
            ) : (
              <Button variant="primary" onClick={nextQuestion} className="gap-2">
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {Object.keys(answers).length === questions.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 rounded-xl bg-success-soft border border-success/20 text-center"
          >
            <p className="text-sm text-success font-medium">
              🎉 All questions answered! You can submit your quiz anytime.
            </p>
          </motion.div>
        )}
      </div>
    </AssessmentLayout>
  );
}

function cn(...args: (string | undefined | null | false)[]) {
  return args.filter(Boolean).join(' ');
}
