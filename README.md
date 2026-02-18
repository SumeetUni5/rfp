# Student Assessment Portal

A high-fidelity, production-ready Student Assessment Portal built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. This application features an "Isomorphic" aesthetic - clean, sophisticated, professional, and minimalist.

## Features

### Design System
- **Color Palette**: Deep indigo/violet primary, emerald success, amber warning
- **Custom Shadows**: Subtle card shadows with primary glow effects
- **Glassmorphism Utilities**: Backdrop blur with semi-transparent backgrounds
- **Responsive Design**: Mobile-first approach with collapsible sidebars

### Pages

1. **Quiz Configuration (`/quiz/setup`)**
   - Split-view layout with session parameters and launchpad sidebar
   - Subject selection with hover lift effects
   - Chapter selector with pill inputs
   - Complexity slider (Novice, Intermediate, Advanced)
   - Question count segmented control with custom input
   - Animated rocket launch button with XP/streak preview

2. **Assessment Interface (`/quiz/assessment`)**
   - Distraction-free "Zen Mode" interface
   - Real-time countdown timer (amber when < 5 mins)
   - Question navigation sidebar with status indicators:
     - Solid Primary: Current Question
     - Green Ring: Answered
     - Orange Dot: Flagged for Review
     - Gray: Unvisited
   - KaTeX rendering for mathematical formulas
   - Large, accessible radio cards with glow effects
   - Flag for review functionality

3. **Results Dashboard (`/quiz/results`)**
   - "Mastery Unlocked" banner with animated badge
   - Rank system (Beginner to Grandmaster)
   - Grid stats: Score, Accuracy, Time, XP Earned
   - Accordion question review with:
     - Logical Decomposition explanations
     - Step-by-step answer analysis

### Technical Stack
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS 4** for styling
- **Framer Motion** for animations
- **Zustand** for state management
- **KaTeX** for math rendering
- **Lucide React** for icons

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page with redirect
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   └── quiz/
│       ├── setup/         # Quiz configuration
│       ├── assessment/    # Quiz taking interface
│       └── results/       # Results dashboard
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Slider.tsx
│   │   ├── SegmentedControl.tsx
│   │   ├── RadioCard.tsx
│   │   ├── Accordion.tsx
│   │   ├── Progress.tsx
│   │   └── KaTeX.tsx
│   └── layout/            # Layout components
│       ├── Layout.tsx
│       └── AssessmentLayout.tsx
├── store/
│   └── quizStore.ts       # Zustand state management
├── types/
│   └── index.ts           # TypeScript interfaces
├── mock/
│   ├── subjects.ts        # Mock subjects & questions
│   └── index.ts
└── utils/
    └── cn.ts              # Utility functions
```

## State Management

The application uses Zustand with persistence for quiz state:

- `config`: Quiz configuration (subject, chapters, difficulty, count)
- `questions`: Array of question objects
- `answers`: User's answers keyed by question ID
- `flaggedQuestions`: Questions marked for review
- `timeRemaining`: Countdown timer
- `status`: Quiz status (setup, in-progress, completed)

## Design Tokens

### Colors
```css
--primary: #4F46E5 (Indigo-600)
--primary-dark: #3730A3 (Indigo-800)
--primary-soft: #EEF2FF (Indigo-50)
--success: #10B981 (Emerald-500)
--success-soft: #D1FAE5 (Emerald-100)
--warning: #F59E0B (Amber-500)
--warning-soft: #FEF3C7 (Amber-100)
```

### Shadows
```css
--shadow-card: 0 4px 6px -1px rgba(0, 0, 0, 0.05)
--shadow-floating: 0 20px 25px -5px rgba(0, 0, 0, 0.05)
--shadow-glow-primary: 0 0 20px rgba(79, 70, 229, 0.15)
```

## License

MIT
