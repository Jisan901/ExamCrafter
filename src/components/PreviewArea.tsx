import { Printer } from 'lucide-react';
import { Question, SchoolInfo } from '../types';
import PaperHeader from './PaperHeader';
import PaperQuestion from './PaperQuestion';

interface PreviewAreaProps {
  schoolInfo: SchoolInfo;
  questions: Question[];
  totalPoints: number;
  handlePrint: () => void;
}

export default function PreviewArea({ schoolInfo, questions, totalPoints, handlePrint }: PreviewAreaProps) {
  return (
    <div className="flex-1 overflow-y-auto p-10 bg-slate-100 print:p-0 print:bg-white flex justify-center" dir={['ar', 'he'].includes(schoolInfo.language) ? 'rtl' : 'ltr'}>
      <div className="bg-white w-full max-w-[210mm] min-h-[297mm] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] rounded flex flex-col p-10 print:shadow-none print:rounded-none print:max-w-none print:p-0">
        
        {/* Paper Header */}
        <PaperHeader schoolInfo={schoolInfo} />

        {/* Questions List */}
        <div className="flex-1 space-y-6">
          {(() => {
            let questionCounter = 1;
            return questions.map((q) => {
              if (q.type === 'section' || q.type === 'page_break') {
                return <PaperQuestion key={q.id} q={q} />;
              }

              const currentNum = questionCounter++;
              return <PaperQuestion key={q.id} q={q} currentNum={currentNum} />;
            });
          })()}
        </div>

        {/* Paper Footer */}
        <footer className="mt-auto pt-6 border-t border-slate-200 flex justify-between items-center print:hidden">
          <div className="text-[0.9rem] font-bold text-slate-900">
            Total: {totalPoints} / {schoolInfo.totalMarks} Points
          </div>
          <div className="flex gap-3">
            <button className="bg-white text-slate-900 border border-slate-200 py-2 px-6 rounded-md font-semibold hover:bg-slate-50 transition-colors text-[0.9rem]">
              Preview Draft
            </button>
            <button onClick={handlePrint} className="bg-blue-600 text-white border-none py-2 px-6 rounded-md font-semibold hover:bg-blue-700 flex items-center gap-2 transition-colors text-[0.9rem]">
              <Printer className="w-4 h-4" /> Print Examination
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
