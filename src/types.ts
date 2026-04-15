export type QuestionType = 'mcq' | 'subjective' | 'short_answer' | 'gap_filling' | 'section' | 'page_break';

export interface SubItem {
  id: string;
  text: string;
  options?: string[];
}

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  points: number;
  itemCount?: number;
  text: string;
  subItems?: SubItem[];
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
}

export interface PageBreak extends BaseQuestion {
  type: 'page_break';
}

export type Question = MCQQuestion | SubjectiveQuestion | ShortAnswerQuestion | GapFillingQuestion | SectionHeader | PageBreak;

export interface SchoolInfo {
  name: string;
  examName: string;
  date: string;
  time: string;
  totalMarks: number;
  instructions: string;
  examSet: string;
  language: string;
}
