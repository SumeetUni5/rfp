import type { Subject, Question } from '@/types';

export const subjects: Subject[] = [
  {
    id: 'linear-algebra',
    name: 'Linear Algebra',
    icon: 'Grid3X3',
    chapters: ['Vectors & Spaces', 'Matrix Operations', 'Eigenvalues', 'Linear Transformations'],
    totalQuestions: 245,
    xpValue: 120,
  },
  {
    id: 'logic',
    name: 'Logic & Reasoning',
    icon: 'Brain',
    chapters: ['Propositional Logic', 'Predicate Logic', 'Proofs', 'Logical Fallacies'],
    totalQuestions: 180,
    xpValue: 100,
  },
  {
    id: 'calculus',
    name: 'Calculus',
    icon: 'TrendingUp',
    chapters: ['Limits', 'Derivatives', 'Integrals', 'Series'],
    totalQuestions: 320,
    xpValue: 150,
  },
  {
    id: 'statistics',
    name: 'Statistics',
    icon: 'BarChart3',
    chapters: ['Probability', 'Distributions', 'Hypothesis Testing', 'Regression'],
    totalQuestions: 210,
    xpValue: 110,
  },
  {
    id: 'discrete-math',
    name: 'Discrete Mathematics',
    icon: 'Binary',
    chapters: ['Set Theory', 'Combinatorics', 'Graph Theory', 'Number Theory'],
    totalQuestions: 195,
    xpValue: 105,
  },
  {
    id: 'physics',
    name: 'Physics',
    icon: 'Atom',
    chapters: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Quantum'],
    totalQuestions: 280,
    xpValue: 140,
  },
];

export const questions: Question[] = [
  {
    id: 'q1',
    subjectId: 'linear-algebra',
    chapter: 'Matrix Operations',
    difficulty: 'intermediate',
    questionText: 'Find the determinant of the following matrix:',
    latexContent: '\\begin{pmatrix} 2 & 3 & 1 \\\\ 4 & 1 & 2 \\\\ 3 & 2 & 3 \\end{pmatrix}',
    options: [
      { id: 'a', text: 'Answer A', latexContent: '-7' },
      { id: 'b', text: 'Answer B', latexContent: '7' },
      { id: 'c', text: 'Answer C', latexContent: '-14' },
      { id: 'd', text: 'Answer D', latexContent: '14' },
    ],
    correctAnswerId: 'a',
    explanation: [
      { step: 1, title: 'Apply cofactor expansion', content: 'Expand along the first row: det(A) = 2·det(M₁₁) - 3·det(M₁₂) + 1·det(M₁₃)' },
      { step: 2, title: 'Calculate 2x2 determinants', content: 'det(M₁₁) = (1·3 - 2·2) = -1, det(M₁₂) = (4·3 - 2·3) = 6, det(M₁₃) = (4·2 - 1·3) = 5' },
      { step: 3, title: 'Combine results', content: 'det(A) = 2·(-1) - 3·(6) + 1·(5) = -2 - 18 + 5 = -15' },
    ],
    xpValue: 25,
  },
  {
    id: 'q2',
    subjectId: 'linear-algebra',
    chapter: 'Eigenvalues',
    difficulty: 'advanced',
    questionText: 'Find the eigenvalues of the matrix:',
    latexContent: '\\begin{pmatrix} 4 & 2 \\\\ 1 & 3 \\end{pmatrix}',
    options: [
      { id: 'a', text: 'Answer A', latexContent: '\\lambda = 5, 2' },
      { id: 'b', text: 'Answer B', latexContent: '\\lambda = 4, 3' },
      { id: 'c', text: 'Answer C', latexContent: '\\lambda = 6, 1' },
      { id: 'd', text: 'Answer D', latexContent: '\\lambda = 7, 0' },
    ],
    correctAnswerId: 'a',
    explanation: [
      { step: 1, title: 'Set up characteristic equation', content: 'det(A - λI) = 0' },
      { step: 2, title: 'Compute determinant', content: '(4-λ)(3-λ) - 2·1 = λ² - 7λ + 10 = 0' },
      { step: 3, title: 'Solve quadratic', content: 'λ = (7 ± √9)/2 = 5, 2' },
    ],
    xpValue: 30,
  },
  {
    id: 'q3',
    subjectId: 'logic',
    chapter: 'Propositional Logic',
    difficulty: 'novice',
    questionText: 'What is the truth value of (P ∧ Q) → P?',
    options: [
      { id: 'a', text: 'Answer A', latexContent: 'Tautology (always true)' },
      { id: 'b', text: 'Answer B', latexContent: 'Contradiction (always false)' },
      { id: 'c', text: 'Answer C', latexContent: 'Contingent (depends on P, Q)' },
      { id: 'd', text: 'Answer D', latexContent: 'Cannot be determined' },
    ],
    correctAnswerId: 'a',
    explanation: [
      { step: 1, title: 'Identify the premise', content: 'P ∧ Q means both P and Q are true' },
      { step: 2, title: 'Analyze implication', content: 'If (P ∧ Q) is true, then P must be true since P ∧ Q requires P to be true' },
      { step: 3, title: 'Verify truth table', content: 'When premise is false, implication is true. When premise is true, P is true, so implication is true' },
    ],
    xpValue: 15,
  },
  {
    id: 'q4',
    subjectId: 'calculus',
    chapter: 'Integrals',
    difficulty: 'intermediate',
    questionText: 'Evaluate the integral:',
    latexContent: '\\int_0^1 x^2 e^x dx',
    options: [
      { id: 'a', text: 'Answer A', latexContent: 'e - 2' },
      { id: 'b', text: 'Answer B', latexContent: 'e - 1' },
      { id: 'c', text: 'Answer C', latexContent: 'e/2 - 1' },
      { id: 'd', text: 'Answer D', latexContent: 'e - 3' },
    ],
    correctAnswerId: 'a',
    explanation: [
      { step: 1, title: 'Apply integration by parts', content: 'Let u = x², dv = eˣdx. Then du = 2x dx, v = eˣ' },
      { step: 2, title: 'First iteration', content: 'x²eˣ - ∫2xeˣdx. Apply parts again for the integral' },
      { step: 3, title: 'Evaluate bounds', content: '[x²eˣ - 2xeˣ + 2eˣ]₀¹ = e - 2' },
    ],
    xpValue: 25,
  },
  {
    id: 'q5',
    subjectId: 'statistics',
    chapter: 'Probability',
    difficulty: 'intermediate',
    questionText: 'In a standard normal distribution, what is P(-1 < Z < 1)?',
    options: [
      { id: 'a', text: 'Answer A', latexContent: '≈ 0.6827 (68.27%)' },
      { id: 'b', text: 'Answer B', latexContent: '≈ 0.9545 (95.45%)' },
      { id: 'c', text: 'Answer C', latexContent: '≈ 0.9973 (99.73%)' },
      { id: 'd', text: 'Answer D', latexContent: '≈ 0.5000 (50%)' },
    ],
    correctAnswerId: 'a',
    explanation: [
      { step: 1, title: 'Recall empirical rule', content: 'For normal distribution, ~68% of data falls within 1 standard deviation' },
      { step: 2, title: 'Verify with z-table', content: 'P(Z < 1) ≈ 0.8413, P(Z < -1) ≈ 0.1587' },
      { step: 3, title: 'Calculate interval', content: 'P(-1 < Z < 1) = 0.8413 - 0.1587 ≈ 0.6827' },
    ],
    xpValue: 20,
  },
];

export const generateMockQuestions = (count: number, subjectId?: string): Question[] => {
  const filtered = subjectId 
    ? questions.filter(q => q.subjectId === subjectId) 
    : questions;
  
  const result: Question[] = [];
  for (let i = 0; i < count; i++) {
    const base = filtered[i % filtered.length];
    result.push({
      ...base,
      id: `q-${i + 1}`,
    });
  }
  return result;
};
