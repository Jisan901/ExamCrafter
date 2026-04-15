import { Question, SchoolInfo, QuestionType } from '../types';
import SettingsTab from './SettingsTab';
import QuestionEditor from './QuestionEditor';

interface SidebarProps {
  schoolInfo: SchoolInfo;
  setSchoolInfo: (info: SchoolInfo) => void;
  questions: Question[];
  activeTab: 'info' | 'questions';
  setActiveTab: (tab: 'info' | 'questions') => void;
  addQuestion: (type: QuestionType) => void;
  updateQuestion: (id: string, updates: Partial<Question>) => void;
  updateSubItem: (qId: string, subId: string, text: string) => void;
  updateSubItemOption: (qId: string, subId: string, optIndex: number, value: string) => void;
  updateMCQOption: (id: string, index: number, value: string) => void;
  removeQuestion: (id: string) => void;
  totalPoints: number;
}

export default function Sidebar({
  schoolInfo,
  setSchoolInfo,
  questions,
  activeTab,
  setActiveTab,
  addQuestion,
  updateQuestion,
  updateSubItem,
  updateSubItemOption,
  updateMCQOption,
  removeQuestion,
  totalPoints
}: SidebarProps) {
  return (
    <div className="w-[280px] bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 print:hidden">
      <div className="p-6 pb-4">
        <div className="text-xl font-extrabold text-blue-600 mb-8 flex items-center gap-2">
          <span className="bg-blue-600 text-white rounded w-7 h-7 flex items-center justify-center text-sm">Q</span>
          ExamBuilder
        </div>

        <div className="flex border-b border-slate-200 mb-4">
          <button
            className={`flex-1 pb-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab === 'info' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab('info')}
          >
            Settings
          </button>
          <button
            className={`flex-1 pb-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab === 'questions' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab('questions')}
          >
            Questions
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {activeTab === 'info' ? (
          <SettingsTab schoolInfo={schoolInfo} setSchoolInfo={setSchoolInfo} />
        ) : (
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3">Add Component</p>
              <button
                onClick={() => addQuestion('mcq')}
                className="w-full flex items-center px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg mb-2 cursor-pointer text-[0.9rem] font-medium transition-colors hover:bg-slate-200 text-slate-900"
              >
                <span className="mr-3 text-lg font-normal">📝</span> Multiple Choice
              </button>
              <button
                onClick={() => addQuestion('subjective')}
                className="w-full flex items-center px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg mb-2 cursor-pointer text-[0.9rem] font-medium transition-colors hover:bg-slate-200 text-slate-900"
              >
                <span className="mr-3 text-lg font-normal">✍️</span> Open Question
              </button>
              <button
                onClick={() => addQuestion('short_answer')}
                className="w-full flex items-center px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg mb-2 cursor-pointer text-[0.9rem] font-medium transition-colors hover:bg-slate-200 text-slate-900"
              >
                <span className="mr-3 text-lg font-normal">➖</span> Short Question
              </button>
              <button
                onClick={() => addQuestion('gap_filling')}
                className="w-full flex items-center px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg mb-2 cursor-pointer text-[0.9rem] font-medium transition-colors hover:bg-slate-200 text-slate-900"
              >
                <span className="mr-3 text-lg font-normal">🔤</span> Gap Filling
              </button>
              <button
                onClick={() => addQuestion('section')}
                className="w-full flex items-center px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg mb-2 cursor-pointer text-[0.9rem] font-medium transition-colors hover:bg-blue-100 text-blue-900 mt-4"
              >
                <span className="mr-3 text-lg font-normal">📁</span> Add Section
              </button>
              <button
                onClick={() => addQuestion('page_break')}
                className="w-full flex items-center px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg mb-2 cursor-pointer text-[0.9rem] font-medium transition-colors hover:bg-slate-200 text-slate-900"
              >
                <span className="mr-3 text-lg font-normal">📄</span> Page Break
              </button>
            </div>

            <div className="space-y-4">
              {questions.map((q, index) => (
                <QuestionEditor
                  key={q.id}
                  q={q}
                  updateQuestion={updateQuestion}
                  updateSubItem={updateSubItem}
                  updateSubItemOption={updateSubItemOption}
                  updateMCQOption={updateMCQOption}
                  removeQuestion={removeQuestion}
                />
              ))}
              {questions.length === 0 && (
                <div className="text-center py-8 text-sm text-slate-500 border-2 border-dashed border-slate-200 rounded-lg">
                  No questions added yet.<br/>Click a button above to start.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-auto p-6 border-t border-slate-200 bg-white">
        <div className="bg-[#f0fdf4] p-4 rounded-lg border border-[#dcfce7] mb-6">
          <p className="text-xs text-[#166534] font-semibold uppercase tracking-wider mb-1">Total Exam Score</p>
          <p className="text-2xl font-extrabold text-[#166534]">{totalPoints} / {schoolInfo.totalMarks}</p>
        </div>
      </div>
    </div>
  );
}
