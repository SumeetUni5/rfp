import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function formatTimeDetailed(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function calculateAccuracy(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

export function getRank(accuracy: number): string {
  if (accuracy >= 95) return 'Grandmaster';
  if (accuracy >= 90) return 'Expert';
  if (accuracy >= 80) return 'Adept';
  if (accuracy >= 70) return 'Apprentice';
  if (accuracy >= 60) return 'Novice';
  return 'Beginner';
}

export function calculateXP(correctAnswers: number, difficulty: string): number {
  const multiplier = {
    novice: 1,
    intermediate: 1.5,
    advanced: 2,
  }[difficulty] || 1;
  
  return Math.round(correctAnswers * 25 * multiplier);
}
