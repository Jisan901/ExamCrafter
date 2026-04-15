import { Question, SectionHeader } from '../types';

interface PaperQuestionProps {
  key?: string;
  q: Question;
  currentNum?: number;
}

export default function PaperQuestion({ q, currentNum }: PaperQuestionProps) {
  if (q.type === 'section') {
    const section = q as SectionHeader;
    return (
      <div className="mt-8 mb-4 border-b-2 border-slate-200 pb-2">
        <h3 className="text-lg font-bold uppercase text-slate-900">{section.text}</h3>
        {section.instructions && (
          <p className="text-[0.9rem] text-slate-700 italic mt-1">{section.instructions}</p>
        )}
      </div>
    );
  }

  if (q.type === 'page_break') {
    return (
      <div className="print:break-before-page my-12 border-b-2 border-dashed border-slate-300 print:border-none print:my-0 relative">
        <span className="absolute right-0 top-[-10px] bg-white text-slate-400 text-xs px-2 print:hidden">Page Break</span>
      </div>
    );
  }

  return (
    <div className="mb-6 relative print:break-inside-avoid">
      <div className="flex justify-between items-start mb-2">
        <p className="font-semibold text-[1rem] text-slate-900 flex-1">
          {currentNum}. {q.text || <span className="text-slate-400 italic font-normal">[Empty Question]</span>}
          {q.itemCount === 1 && q.type === 'gap_filling' && <span className="border-b border-dashed border-slate-500 inline-block w-20 ml-2"></span>}
        </p>
        <span className="text-[0.85rem] font-bold ml-3 whitespace-nowrap text-slate-900">
          {(q.itemCount && q.itemCount > 1) ? `${q.itemCount} × ${q.points} = ${q.itemCount * q.points}` : q.points}
        </span>
      </div>

      {q.itemCount && q.itemCount > 1 && q.subItems ? (
        <div className="mt-4 space-y-4 ml-5">
          {q.subItems.map((sub, idx) => (
            <div key={sub.id} className="mb-3">
              <p className="text-[0.95rem] text-slate-800 mb-2">
                <span className="font-medium mr-2">{String.fromCharCode(97 + idx)})</span>
                {sub.text || <span className="text-slate-400 italic font-normal">[Empty]</span>}
                {q.type === 'gap_filling' && <span className="border-b border-dashed border-slate-500 inline-block w-20 ml-2"></span>}
              </p>
              
              {q.type === 'mcq' && sub.options && (
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 ml-6 mt-2">
                  {sub.options.map((opt, i) => (
                    <div key={i} className="text-[0.9rem] text-slate-700">
                      <span className="font-medium mr-1">{String.fromCharCode(65 + i)})</span> {opt || '________________'}
                    </div>
                  ))}
                </div>
              )}

              {(q.type === 'subjective' || q.type === 'short_answer') && (
                <div className="mt-3 space-y-6 ml-6">
                  {Array.from({ length: q.lines }).map((_, i) => (
                    <div key={i} className="w-full h-4"></div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <>
          {q.type === 'mcq' && (
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 ml-5 mt-3">
              {q.options.map((opt, i) => (
                <div key={i} className="text-[0.9rem] text-slate-700">
                  <span className="font-medium mr-1">{String.fromCharCode(65 + i)})</span> {opt || '________________'}
                </div>
              ))}
            </div>
          )}

          {(q.type === 'subjective' || q.type === 'short_answer') && (
            <div className="mt-4 space-y-6 ml-5">
              {Array.from({ length: q.lines }).map((_, i) => (
                <div key={i} className="w-full h-4"></div>
              ))}
            </div>
          )}
          
          {q.type === 'gap_filling' && (
            <div className="mt-2 text-xs text-slate-400 italic print:hidden ml-5">
              (Ensure your text contains blanks like "_____" for students to fill)
            </div>
          )}
        </>
      )}
    </div>
  );
}
