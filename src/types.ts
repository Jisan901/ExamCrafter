export type QuestionType = 'mcq' | 'subjective' | 'short_answer' | 'gap_filling' | 'section' | 'page_break' | 'matching';

export interface SubItem {
  id: string;
  text: string;
  options?: string[];
  points?: number;
}

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  points: number;
  itemCount?: number;
  text: string;
  subItems?: SubItem[];
  manualPoints?: boolean;
}

export interface MCQQuestion extends BaseQuestion {
  type: 'mcq';
  options: string[];
}

export interface SubjectiveQuestion extends BaseQuestion {
  type: 'subjective';
  lines: number;
}

export interface ShortAnswerQuestion extends BaseQuestion {
  type: 'short_answer';
  lines: number;
}

export interface GapFillingQuestion extends BaseQuestion {
  type: 'gap_filling';
}

export interface SectionHeader extends BaseQuestion {
  type: 'section';
  instructions: string;
  restartNumbering?: boolean;
}

export interface PageBreak extends BaseQuestion {
  type: 'page_break';
}

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

export interface MatchingQuestion extends BaseQuestion {
  type: 'matching';
  pairs: MatchingPair[];
}

export type Question = MCQQuestion | SubjectiveQuestion | ShortAnswerQuestion | GapFillingQuestion | SectionHeader | PageBreak | MatchingQuestion;

export interface SchoolInfo {
  name: string;
  address?: string;
  examName: string;
  date?: string;
  time: string;
  totalMarks: number;
  instructions: string;
  examSet: string;
  language: string;
  className?: string;
  subject?: string;
  fontSizeFactor?: number;
  fontWeightFactor?: number;
  spacingFactor?: number;
}

export interface ExamDocument {
  id: string;
  name: string;
  schoolInfo: SchoolInfo;
  questions: Question[];
  updatedAt: number;
}
