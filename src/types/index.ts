export interface Subject {
  id: string;
  name: string;
  icon: string;
  chapters: string[];
  totalQuestions: number;
  xpValue: number;
}

export interface Question {
  id: string;
  subjectId: string;
  chapter: string;
  difficulty: 'novice' | 'intermediate' | 'advanced';
  questionText: string;
  latexContent?: string;
  options: QuestionOption[];
  correctAnswerId: string;
  explanation: ExplanationStep[];
  timeLimit?: number;
  xpValue: number;
}

export interface QuestionOption {
  id: string;
  text: string;
  latexContent?: string;
}

export interface ExplanationStep {
  step: number;
  title: string;
  content: string;
}

export interface QuizConfig {
  subjectId: string | null;
  chapters: string[];
  difficulty: 'novice' | 'intermediate' | 'advanced';
  questionCount: number;
  customQuestionCount?: number;
}

export interface QuizState {
  config: QuizConfig;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, string>;
  flaggedQuestions: Set<string>;
  startTime: number | null;
  endTime: number | null;
  timeRemaining: number;
  status: 'setup' | 'in-progress' | 'completed';
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  skippedQuestions: number;
  timeTaken: number;
  xpEarned: number;
  accuracy: number;
  rank: string;
  streakDays: number;
}

export type ComplexityLevel = 'novice' | 'intermediate' | 'advanced';

export type QuizStatus = 'setup' | 'in-progress' | 'completed';
