'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Brain, Grid3X3, TrendingUp, BarChart3, Binary, Atom,
  Rocket, Check, Zap, Flame, ChevronDown
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { 
  Card, CardHeader, CardTitle, CardContent,
  Button, Slider, SegmentedControl, CircularProgress
} from '@/components/ui';
import { useQuizStore } from '@/store/quizStore';
import { subjects, generateMockQuestions } from '@/mock';
import { cn, calculateXP } from '@/utils/cn';
import type { Subject, ComplexityLevel } from '@/types';

const iconMap: Record<string, React.ElementType> = {
  Grid3X3,
  Brain,
  TrendingUp,
  BarChart3,
  Binary,
  Atom,
};

export default function QuizSetupPage() {
  const router = useRouter();
  const { 
    config, 
    setConfig, 
    setQuestions, 
    startQuiz,
    resetQuiz 
  } = useQuizStore();
  
  const [selectedSubject, setSelectedSubject] = React.useState<Subject | null>(null);
  const [showChapterSelector, setShowChapterSelector] = React.useState(false);
  const [complexity, setComplexity] = React.useState<ComplexityLevel>('intermediate');
  const [questionCount, setQuestionCount] = React.useState(20);
  const [customCount, setCustomCount] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubjectSelect = (subject: Subject) => {
    if (selectedSubject?.id === subject.id) {
      setSelectedSubject(null);
      setConfig({ subjectId: null, chapters: [] });
    } else {
      setSelectedSubject(subject);
      setConfig({ subjectId: subject.id, chapters: subject.chapters });
    }
  };

  const handleChapterToggle = (chapter: string) => {
    const newChapters = config.chapters.includes(chapter)
      ? config.chapters.filter(c => c !== chapter)
      : [...config.chapters, chapter];
    setConfig({ chapters: newChapters });
  };

  const handleStartQuiz = async () => {
    if (!selectedSubject) return;
    
    setIsLoading(true);
    setConfig({ difficulty: complexity, questionCount });
    
    const questions = generateMockQuestions(questionCount, selectedSubject.id);
    setQuestions(questions);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const duration = questionCount * 90;
    startQuiz(duration);
    
    router.push('/quiz/assessment');
  };

  const complexityValue = complexity === 'novice' ? 0 : complexity === 'intermediate' ? 1 : 2;
  const xpValue = calculateXP(questionCount, complexity);
  const streakImpact = selectedSubject ? Math.ceil(questionCount / 10) : 0;

  React.useEffect(() => {
    resetQuiz();
  }, [resetQuiz]);

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid lg:grid-cols-[1fr_400px] gap-8"
        >
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-heading mb-2">
                Configure Your Session
              </h1>
              <p className="text-muted">
                Select your subject, difficulty, and question count to begin your assessment.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Select Subject</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {subjects.map((subject) => {
                    const Icon = iconMap[subject.icon] || Brain;
                    const isSelected = selectedSubject?.id === subject.id;
                    
                    return (
                      <Card
                        key={subject.id}
                        hoverable
                        selected={isSelected}
                        onClick={() => handleSubjectSelect(subject)}
                        className="p-4"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className={cn(
                            'p-2 rounded-lg transition-colors',
                            isSelected ? 'bg-primary text-white' : 'bg-primary-soft text-primary'
                          )}>
                            <Icon className="w-5 h-5" />
                          </div>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                            >
                              <Check className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </div>
                        <h3 className="font-semibold text-heading mb-1">{subject.name}</h3>
                        <p className="text-xs text-muted">
                          {subject.totalQuestions} questions • +{subject.xpValue} XP
                        </p>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <AnimatePresence>
              {selectedSubject && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        Select Chapters
                        <button
                          onClick={() => setShowChapterSelector(!showChapterSelector)}
                          className="text-sm font-normal text-primary flex items-center gap-1"
                        >
                          {showChapterSelector ? 'Hide' : 'Show'}
                          <ChevronDown className={cn(
                            'w-4 h-4 transition-transform',
                            showChapterSelector && 'rotate-180'
                          )} />
                        </button>
                      </CardTitle>
                    </CardHeader>
                    {showChapterSelector && (
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {selectedSubject.chapters.map((chapter) => {
                            const isSelected = config.chapters.includes(chapter);
                            return (
                              <button
                                key={chapter}
                                onClick={() => handleChapterToggle(chapter)}
                                className={cn(
                                  'px-3 py-1.5 rounded-full text-sm font-medium transition-all',
                                  isSelected
                                    ? 'bg-primary text-white shadow-glow-primary'
                                    : 'bg-slate-100 text-muted hover:bg-slate-200'
                                )}
                              >
                                {chapter}
                              </button>
                            );
                          })}
                        </div>
                        {config.chapters.length > 0 && (
                          <p className="text-xs text-muted mt-3">
                            {config.chapters.length} of {selectedSubject.chapters.length} chapters selected
                          </p>
                        )}
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <Card>
              <CardHeader>
                <CardTitle>Complexity Level</CardTitle>
              </CardHeader>
              <CardContent>
                <Slider
                  value={complexityValue}
                  min={0}
                  max={2}
                  step={1}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setComplexity(val === 0 ? 'novice' : val === 1 ? 'intermediate' : 'advanced');
                  }}
                  labels={['Novice', 'Intermediate', 'Advanced']}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Question Count</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <SegmentedControl
                  options={[
                    { value: 10, label: '10' },
                    { value: 20, label: '20' },
                    { value: 30, label: '30' },
                    { value: 50, label: '50' },
                  ]}
                  value={questionCount}
                  onChange={(val) => setQuestionCount(Number(val))}
                />
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted">Or custom:</span>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={customCount}
                    onChange={(e) => setCustomCount(e.target.value)}
                    className="w-24 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Count"
                  />
                  {customCount && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        const count = Math.min(100, Math.max(1, parseInt(customCount) || 20));
                        setQuestionCount(count);
                        setCustomCount('');
                      }}
                    >
                      Apply
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:sticky lg:top-8 h-fit">
            <Card className="overflow-visible">
              <CardContent className="pt-8">
                <div className="flex flex-col items-center text-center mb-8">
                  <motion.div
                    animate={{ 
                      scale: selectedSubject ? [1, 1.05, 1] : 1,
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: selectedSubject ? Infinity : 0,
                      repeatDelay: 1
                    }}
                    className="relative"
                  >
                    <CircularProgress
                      value={selectedSubject ? 100 : 0}
                      size={140}
                      strokeWidth={6}
                      variant="default"
                    >
                      <motion.div
                        animate={selectedSubject ? {
                          y: [0, -5, 0],
                        } : {}}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className={cn(
                          'p-4 rounded-full transition-colors',
                          selectedSubject ? 'bg-primary text-white' : 'bg-slate-100 text-muted'
                        )}
                      >
                        <Rocket className="w-8 h-8" />
                      </motion.div>
                    </CircularProgress>
                    
                    {selectedSubject && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 p-1.5 rounded-full bg-success text-white shadow-lg"
                      >
                        <Check className="w-4 h-4" />
                      </motion.div>
                    )}
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-heading mt-4 mb-1">
                    Launchpad
                  </h3>
                  <p className="text-sm text-muted">
                    {selectedSubject 
                      ? `Ready to launch ${questionCount} questions` 
                      : 'Select a subject to begin'}
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-primary-soft">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      <span className="font-medium text-heading">XP Value</span>
                    </div>
                    <span className="text-lg font-bold glow-text text-success">
                      +{xpValue}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-xl bg-success-soft">
                    <div className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-success" />
                      <span className="font-medium text-heading">Streak Impact</span>
                    </div>
                    <span className="text-lg font-bold text-success">
                      +{streakImpact} Day{streakImpact !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={!selectedSubject}
                  isLoading={isLoading}
                  onClick={handleStartQuiz}
                >
                  <Rocket className="w-5 h-5" />
                  Begin Assessment
                </Button>
                
                {!selectedSubject && (
                  <p className="text-xs text-muted text-center mt-3">
                    Select a subject to enable the launch button
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}
