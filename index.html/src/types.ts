export interface Book {
  id: string;
  title: string;
  category: string;
  description: string;
  estimatedReadingTime: string;
  coverSymbol: string;
}

export interface RuleContent {
  id: string;
  number: number;
  title: string;
  category: string;
  explanation: string;
  realWorldExample: string;
  practicalExercise: string;
  reflectionQuestions: string[];
  commonMistakes: string;
  longTermBenefits: string;
}

export interface StrategicScenario {
  id: string;
  number: number;
  topic: string;
  scenario: string;
  averageReaction: string;
  strategicReaction: string;
  analysis: string;
  psychologicalExplanation: string;
  lessonsLearned: string[];
  practicalApplication: string;
}

export interface UnderstandingChapter {
  id: string;
  title: string;
  category: string;
  deepExplanation: string;
  caseStudy: {
    title: string;
    description: string;
    metrics: string[];
  };
  exercises: string[];
  reflectionQuestions: string[];
  practicalExamples: string[];
  summary: string;
}

export interface UserNote {
  id: string;
  bookId: string;
  itemId: string; // rule number, scenario id, or chapter title
  itemTitle: string;
  text: string;
  createdAt: string;
  excerpt?: string; // quote from the book
}

export interface UserHighlight {
  id: string;
  bookId: string;
  itemId: string;
  text: string;
  createdAt: string;
}

export interface QuizQuestion {
  id: string;
  category: "Discipline" | "Strategy" | "Psychology";
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface LearningRoadmapNode {
  id: string;
  title: string;
  description: string;
  bookId: string;
  targetId: string; // itemId (e.g. rule # or scenario #)
  difficulty: "Beginner" | "Intermediate" | "Expert";
  estimatedMinutes: number;
}

export interface UserProgressData {
  streak: number;
  lastActiveDate: string;
  bookmarks: string[]; // itemIds (e.g., 'rule-3', 'scenario-5')
  completedItems: string[]; // itemIds
  notes: UserNote[];
  highlights: UserHighlight[];
  quizScore: number;
  completedRoadmapIds: string[];
}
