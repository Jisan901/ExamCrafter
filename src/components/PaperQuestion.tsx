import { Question, SectionHeader } from '../types';
import langData from '../lang.json';
import { formatNumber, formatListLetter } from '../utils';

interface PaperQuestionProps {
  key?: string;
  q: Question;
  currentNum?: number;
  language?: string;
}

export default function PaperQuestion({ q, currentNum, language = 'en' }: PaperQuestionProps) {
  const langConf = (langData as any)[language] || langData.en;
  if (q.type === 'section') {
    const section = q as SectionHeader;
    return (
      <div className="mt-8 mb-4 border-b-2 border-slate-200 pb-2">
        <h3 className="text-[1.125em] font-bold uppercase text-slate-900">{section.text}</h3>
        {section.instructions && (
          <p className="text-[0.9em] text-slate-700 italic mt-1">{section.instructions}</p>
        )}
      </div>
    );
  }

  if (q.type === 'page_break') {
    return (
      <div className="print:break-before-page my-12 border-b-2 border-dashed border-slate-300 print:border-none print:my-0 relative">
        <span className="absolute right-0 top-[-10px] bg-white text-slate-400 text-[0.75em] px-2 print:hidden">{langConf.pageBreak}</span>
      </div>
    );
  }

  let displayPoints = '';
  if (q.manualPoints) {
    if (q.itemCount && q.itemCount > 1 && q.subItems) {
      const sum = q.subItems.reduce((acc, sub) => acc + (sub.points || 0), 0);
      displayPoints = formatNumber(sum, language);
    } else {
      displayPoints = formatNumber(q.points, language);
    }
  } else {
    displayPoints = (q.itemCount && q.itemCount > 1) 
      ? `${formatNumber(q.itemCount, language)} × ${formatNumber(q.points, language)} = ${formatNumber(q.itemCount * q.points, language)}` 
      : formatNumber(q.points, language);
  }

  return (
    <div className={`mb-6 relative ${q.itemCount && q.itemCount > 1 ? '' : 'print:break-inside-avoid'}`}>
      <div className="flex justify-between items-start mb-2">
        <pre className="font-semibold text-[1em] text-slate-900 flex-1 whitespace-pre-wrap font-sans">
          {currentNum && `${formatNumber(currentNum, language)}.`} {q.text || <span className="text-slate-400 italic font-normal">{langConf.emptyQuestion}</span>}
        </pre>
        <span className="text-[0.85em] font-bold ml-3 whitespace-nowrap text-slate-900">
          {displayPoints}
        </span>
      </div>

      {q.itemCount && q.itemCount > 1 && q.subItems ? (
        <div className="mt-4 space-y-4 ml-5">
          {q.subItems.map((sub, idx) => (
            <div key={sub.id} className="mb-3 print:break-inside-avoid">
              <div className="flex justify-between items-start">
                <pre className="text-[0.95em] text-slate-800 mb-2 whitespace-pre-wrap font-sans">
                  <span className="font-medium mr-2">{formatListLetter(idx, language)})</span>
                  {sub.text || <span className="text-slate-400 italic font-normal">{langConf.empty}</span>}
                </pre>
                {q.manualPoints && sub.points !== undefined && (
                  <span className="text-[0.85em] font-bold ml-2 text-slate-600">[{formatNumber(sub.points, language)}]</span>
                )}
              </div>
              
              {q.type === 'mcq' && sub.options && (
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 ml-6 mt-2">
                  {sub.options.map((opt, i) => (
                    <div key={i} className="text-[0.9em] text-slate-700">
                      <span className="font-medium mr-1">{formatListLetter(i, language, true)})</span> {opt || '________________'}
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
                <div key={i} className="text-[0.9em] text-slate-700">
                  <span className="font-medium mr-1">{formatListLetter(i, language, true)})</span> {opt || '________________'}
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
            <div className="mt-2 text-[0.75em] text-slate-400 italic print:hidden ml-5">
              {langConf.gapFillingHelp}
            </div>
          )}

          {q.type === 'matching' && 'pairs' in q && (
            <div className="mt-4 ml-5">
              <table className="w-full max-w-2xl border-collapse border border-slate-300">
                <thead>
                  <tr>
                    <th className="border border-slate-300 p-2 text-left bg-slate-50 font-semibold">{langConf.columnA}</th>
                    <th className="border border-slate-300 p-2 text-left bg-slate-50 font-semibold">{langConf.columnB}</th>
                  </tr>
                </thead>
                <tbody>
                  {q.pairs.map((pair) => (
                    <tr key={pair.id}>
                      <td className="border border-slate-300 p-3 text-[0.95em]">{pair.left || <span className="text-slate-300 italic">{langConf.empty}</span>}</td>
                      <td className="border border-slate-300 p-3 text-[0.95em]">{pair.right || <span className="text-slate-300 italic">{langConf.empty}</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
