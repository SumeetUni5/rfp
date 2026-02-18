'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Trophy, Brain, Zap, Clock, Flame, CheckCircle, XCircle, 
  HelpCircle, ChevronDown, RotateCcw, Home, Award, LucideIcon
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { 
  Card, CardContent,
  Button, Badge, 
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  CircularProgress, KaTeX
} from '@/components/ui';
import { useQuizStore } from '@/store/quizStore';
import { cn, formatTimeDetailed, calculateAccuracy, getRank, calculateXP } from '@/utils/cn';

const RANK_ICONS: Record<string, LucideIcon> = {
  Grandmaster: Trophy,
  Expert: Trophy,
  Adept: Brain,
  Apprentice: Award,
  Novice: Award,
  Beginner: Award,
};

function RankIconComponent({ rank, className }: { rank: string; className?: string }) {
  const Icon = RANK_ICONS[rank] || Award;
  return <Icon className={className} />;
}

export default function ResultsPage() {
  const router = useRouter();
  const {
    questions,
    answers,
    startTime,
    endTime,
    status,
    resetQuiz,
    config,
  } = useQuizStore();

  const [showDetails, setShowDetails] = React.useState(true);

  React.useEffect(() => {
    if (status !== 'completed') {
      router.push('/quiz/setup');
    }
  }, [status, router]);

  if (status !== 'completed' || questions.length === 0) {
    return (
      <div className="min-h-screen bg-body flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted">Loading results...</p>
        </div>
      </div>
    );
  }

  const correctAnswers = questions.filter(q => answers[q.id] === q.correctAnswerId).length;
  const incorrectAnswers = questions.filter(q => answers[q.id] && answers[q.id] !== q.correctAnswerId).length;
  const skippedQuestions = questions.filter(q => !answers[q.id]).length;
  const accuracy = calculateAccuracy(correctAnswers, questions.length);
  const rank = getRank(accuracy);
  const xpEarned = calculateXP(correctAnswers, config.difficulty);
  const timeTaken = endTime && startTime ? Math.floor((endTime - startTime) / 1000) : 0;
  const isFast = timeTaken < questions.length * 60;

  const handleRetake = () => {
    resetQuiz();
    router.push('/quiz/setup');
  };

  const handleHome = () => {
    resetQuiz();
    router.push('/quiz/setup');
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="relative inline-flex items-center justify-center mb-6">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <CircularProgress
                value={accuracy}
                size={160}
                strokeWidth={8}
                variant={accuracy >= 80 ? 'success' : accuracy >= 60 ? 'default' : 'warning'}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="p-5 rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-glow-primary"
                >
                  <RankIconComponent rank={rank} className="w-10 h-10 text-white" />
                </motion.div>
              </CircularProgress>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-2 px-4 py-1.5 rounded-full bg-white shadow-floating border border-slate-100"
            >
              <span className="text-sm font-semibold text-primary">{rank}</span>
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-heading mb-2"
          >
            Mastery Unlocked
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted"
          >
            You&apos;ve completed the assessment with impressive results!
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
        >
          <Card className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="text-sm text-muted">Score</span>
            </div>
            <div className="text-3xl font-bold text-heading">
              {correctAnswers}<span className="text-lg text-muted">/{questions.length}</span>
            </div>
          </Card>

          <Card className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted">Accuracy</span>
            </div>
            <div className="text-3xl font-bold text-heading">{accuracy}%</div>
          </Card>

          <Card className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-muted" />
              <span className="text-sm text-muted">Time</span>
            </div>
            <div className="text-3xl font-bold text-heading">
              {formatTimeDetailed(timeTaken)}
            </div>
            {isFast && (
              <Badge variant="success" size="sm" className="mt-1">Fast</Badge>
            )}
          </Card>

          <Card className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-warning" />
              <span className="text-sm text-muted">XP Earned</span>
            </div>
            <div className="text-3xl font-bold glow-text text-success">
              +{xpEarned}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-4 mb-8"
        >
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-success" />
            <span className="text-sm text-muted">Correct ({correctAnswers})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-danger" />
            <span className="text-sm text-muted">Incorrect ({incorrectAnswers})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-300" />
            <span className="text-sm text-muted">Skipped ({skippedQuestions})</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-heading">Question Review</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetails(!showDetails)}
                  className="gap-2"
                >
                  {showDetails ? 'Hide' : 'Show'} Details
                  <ChevronDown className={cn(
                    'w-4 h-4 transition-transform',
                    showDetails && 'rotate-180'
                  )} />
                </Button>
              </div>

              <Accordion type="multiple" className="space-y-3">
                {questions.map((question, index) => {
                  const userAnswer = answers[question.id];
                  const isCorrect = userAnswer === question.correctAnswerId;
                  const isSkipped = !userAnswer;

                  return (
                    <AccordionItem key={question.id} id={question.id}>
                      <AccordionTrigger className="rounded-xl px-4">
                        <div className="flex items-center gap-3 text-left">
                          <span className={cn(
                            'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center',
                            isCorrect && 'bg-success-soft text-success',
                            isSkipped && 'bg-slate-100 text-muted',
                            !isCorrect && !isSkipped && 'bg-danger-soft text-danger'
                          )}>
                            {isCorrect ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : isSkipped ? (
                              <HelpCircle className="w-4 h-4" />
                            ) : (
                              <XCircle className="w-4 h-4" />
                            )}
                          </span>
                          <span className="text-sm text-heading">
                            Question {index + 1}
                          </span>
                          {showDetails && (
                            <Badge
                              variant={isCorrect ? 'success' : isSkipped ? 'outline' : 'danger'}
                              size="sm"
                            >
                              {isCorrect ? 'Correct' : isSkipped ? 'Skipped' : 'Incorrect'}
                            </Badge>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-4 border-t border-slate-100 mt-2">
                          <p className="text-heading">{question.questionText}</p>
                          
                          {question.latexContent && (
                            <div className="p-3 bg-slate-50 rounded-lg overflow-x-auto">
                              <KaTeX displayMode>{question.latexContent}</KaTeX>
                            </div>
                          )}

                          <div className="space-y-2">
                            {question.options.map((option) => {
                              const isUserAnswer = userAnswer === option.id;
                              const isCorrectAnswer = question.correctAnswerId === option.id;
                              
                              return (
                                <div
                                  key={option.id}
                                  className={cn(
                                    'p-3 rounded-lg border-2 flex items-start gap-2',
                                    isCorrectAnswer && 'border-success bg-success-soft',
                                    isUserAnswer && !isCorrectAnswer && 'border-danger bg-danger-soft',
                                    !isUserAnswer && !isCorrectAnswer && 'border-slate-200'
                                  )}
                                >
                                  <span className="font-medium text-heading">
                                    {option.id.toUpperCase()}.
                                  </span>
                                  {option.latexContent ? (
                                    <KaTeX displayMode={false}>{option.latexContent}</KaTeX>
                                  ) : (
                                    <span>{option.text}</span>
                                  )}
                                  {isCorrectAnswer && (
                                    <CheckCircle className="w-4 h-4 text-success ml-auto flex-shrink-0" />
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {showDetails && question.explanation.length > 0 && (
                            <div className="mt-4 p-4 bg-primary-soft rounded-xl">
                              <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                                <Brain className="w-4 h-4" />
                                Logical Decomposition
                              </h4>
                              <div className="space-y-3">
                                {question.explanation.map((step) => (
                                  <div key={step.step} className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-medium">
                                      {step.step}
                                    </span>
                                    <div>
                                      <p className="font-medium text-heading text-sm">{step.title}</p>
                                      <p className="text-sm text-muted">{step.content}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button variant="outline" onClick={handleRetake} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Retake Quiz
          </Button>
          <Button variant="primary" onClick={handleHome} className="gap-2">
            <Home className="w-4 h-4" />
            New Session
          </Button>
        </motion.div>
      </motion.div>
    </Layout>
  );
}
