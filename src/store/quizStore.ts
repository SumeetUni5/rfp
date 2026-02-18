'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { QuizConfig, Question, QuizStatus } from '@/types';

interface QuizStore {
  config: QuizConfig;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, string>;
  flaggedQuestions: string[];
  startTime: number | null;
  endTime: number | null;
  timeRemaining: number;
  status: QuizStatus;

  setConfig: (config: Partial<QuizConfig>) => void;
  setQuestions: (questions: Question[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  setAnswer: (questionId: string, answerId: string) => void;
  toggleFlagged: (questionId: string) => void;
  startQuiz: (duration: number) => void;
  endQuiz: () => void;
  updateTimeRemaining: (time: number) => void;
  resetQuiz: () => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
}

const defaultConfig: QuizConfig = {
  subjectId: null,
  chapters: [],
  difficulty: 'intermediate',
  questionCount: 20,
};

export const useQuizStore = create<QuizStore>()(
  persist(
    (set) => ({
      config: defaultConfig,
      questions: [],
      currentQuestionIndex: 0,
      answers: {},
      flaggedQuestions: [],
      startTime: null,
      endTime: null,
      timeRemaining: 0,
      status: 'setup',

      setConfig: (newConfig) =>
        set((state) => ({
          config: { ...state.config, ...newConfig },
        })),

      setQuestions: (questions) => set({ questions }),

      setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),

      setAnswer: (questionId, answerId) =>
        set((state) => ({
          answers: { ...state.answers, [questionId]: answerId },
        })),

      toggleFlagged: (questionId) =>
        set((state) => {
          const flagged = [...state.flaggedQuestions];
          const index = flagged.indexOf(questionId);
          if (index > -1) {
            flagged.splice(index, 1);
          } else {
            flagged.push(questionId);
          }
          return { flaggedQuestions: flagged };
        }),

      startQuiz: (duration) =>
        set({
          startTime: Date.now(),
          timeRemaining: duration,
          status: 'in-progress',
          currentQuestionIndex: 0,
        }),

      endQuiz: () =>
        set({
          endTime: Date.now(),
          status: 'completed',
        }),

      updateTimeRemaining: (time) => set({ timeRemaining: time }),

      resetQuiz: () =>
        set({
          config: defaultConfig,
          questions: [],
          currentQuestionIndex: 0,
          answers: {},
          flaggedQuestions: [],
          startTime: null,
          endTime: null,
          timeRemaining: 0,
          status: 'setup',
        }),

      nextQuestion: () =>
        set((state) => ({
          currentQuestionIndex: Math.min(
            state.currentQuestionIndex + 1,
            state.questions.length - 1
          ),
        })),

      previousQuestion: () =>
        set((state) => ({
          currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
        })),
    }),
    {
      name: 'quiz-storage',
      partialize: (state) => ({
        config: state.config,
        questions: state.questions,
        answers: state.answers,
        flaggedQuestions: state.flaggedQuestions,
        startTime: state.startTime,
        endTime: state.endTime,
        status: state.status,
      }),
    }
  )
);
