import { Printer } from 'lucide-react';
import { Question, SchoolInfo } from '../types';
import PaperHeader from './PaperHeader';
import PaperQuestion from './PaperQuestion';
import langData from '../lang.json';
import { formatNumber } from '../utils';

interface PreviewAreaProps {
  schoolInfo: SchoolInfo;
  questions: Question[];
  totalPoints: number;
  handlePrint: () => void;
}

export default function PreviewArea({ schoolInfo, questions, totalPoints, handlePrint }: PreviewAreaProps) {
  const langConf = (langData as any)[schoolInfo.language] || langData.en;
  const isA5 = schoolInfo.paperFormat === 'A5';

  return (
    <div className="flex-1 overflow-y-auto p-10 bg-slate-100 flex flex-col justify-start items-center print:p-0 print:bg-transparent print:flex-none print:w-full print:flex-row print:justify-center" dir={['ar', 'he'].includes(schoolInfo.language) ? 'rtl' : 'ltr'}>
      {isA5 ? (
        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            @page { size: A4 landscape; margin: 0; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; margin: 0; }
            .preview-container { box-shadow: none !important; min-height: auto !important; }
          }
        `}} />
      ) : (
        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            @page { 
              size: A4 portrait; 
              margin: ${15 * (schoolInfo.paperMarginTopFactor ?? schoolInfo.paperPaddingFactor ?? 1)}mm ${15 * (schoolInfo.paperPaddingFactor || 1)}mm ${15 * (schoolInfo.paperPaddingFactor || 1)}mm ${15 * (schoolInfo.paperPaddingFactor || 1)}mm;
            }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; margin: 0; }
            .preview-container { padding: 0 !important; max-width: none !important; box-shadow: none !important; min-height: auto !important; }
          }
        `}} />
      )}

      <div 
        className={`preview-container bg-white w-full shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] rounded print:rounded-none print:block block ${
          isA5 
            ? 'max-w-[210mm] print:w-[148.5mm] print:max-w-[148.5mm] min-h-[297mm] print:min-h-[210mm]'
            : 'max-w-[210mm] min-h-[297mm]'
        }`}
        style={{ 
          fontSize: isA5 ? `calc(${(schoolInfo.fontSizeFactor || 1)}rem * 0.707)` : `${(schoolInfo.fontSizeFactor || 1)}rem`,
          padding: isA5 ? `calc(10mm * ${schoolInfo.paperPaddingFactor || 1})` : `calc(2.5rem * ${schoolInfo.paperPaddingFactor || 1})`,
          paddingTop: `calc(${isA5 ? '10mm' : '2.5rem'} * ${schoolInfo.paperMarginTopFactor ?? schoolInfo.paperPaddingFactor ?? 1})`,
          '--fw-factor': schoolInfo.fontWeightFactor || 1,
          '--sp-factor': schoolInfo.spacingFactor || 1,
          '--qm-factor': schoolInfo.questionMarginFactor || 1
        } as React.CSSProperties}
      >
        
        {/* Paper Header */}
        <div className={isA5 ? 'break-inside-avoid' : ''}>
          <PaperHeader schoolInfo={schoolInfo} />
        </div>

        {/* Questions List */}
        <div className={`print:block ${!isA5 ? 'flex-1' : 'w-full'} space-y-6`}>
          {(() => {
            let questionCounter = 1;
            return questions.map((q) => {
              if (q.type === 'section') {
                if ((q as any).restartNumbering) {
                   questionCounter = 1;
                }
                return <PaperQuestion key={q.id} q={q} language={schoolInfo.language} paperFormat={schoolInfo.paperFormat} />;
              }
              if (q.type === 'page_break') {
                return <PaperQuestion key={q.id} q={q} language={schoolInfo.language} paperFormat={schoolInfo.paperFormat} />;
              }

              const currentNum = questionCounter++;
              return <PaperQuestion key={q.id} q={q} currentNum={currentNum} language={schoolInfo.language} paperFormat={schoolInfo.paperFormat} />;
            });
          })()}
        </div>

        {/* Padding for space at bottom when single column flex layout */}
        {!isA5 && <div className="mt-8"></div>}
      </div>

      {isA5 && (
        <div 
          className="preview-container bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] rounded print:rounded-none hidden print:block w-full print:w-[148.5mm] max-w-[148.5mm] min-h-[210mm] block mt-0"
          style={{ 
            fontSize: `calc(${(schoolInfo.fontSizeFactor || 1)}rem * 0.707)`,
            padding: `calc(10mm * ${schoolInfo.paperPaddingFactor || 1})`,
            paddingTop: `calc(10mm * ${schoolInfo.paperMarginTopFactor ?? schoolInfo.paperPaddingFactor ?? 1})`,
            '--fw-factor': schoolInfo.fontWeightFactor || 1,
            '--sp-factor': schoolInfo.spacingFactor || 1,
            '--qm-factor': schoolInfo.questionMarginFactor || 1,
            pageBreakInside: 'avoid'
          } as React.CSSProperties}
        >
          {/* Paper Header Clone */}
          <div>
            <PaperHeader schoolInfo={schoolInfo} />
          </div>

          {/* Questions List Clone */}
          <div className="flex-1 space-y-6">
            {(() => {
              let questionCounter = 1;
              return questions.map((q) => {
                if (q.type === 'section') {
                  if ((q as any).restartNumbering) {
                     questionCounter = 1;
                  }
                  return <PaperQuestion key={q.id} q={q} language={schoolInfo.language} paperFormat="A4" />;
                }
                if (q.type === 'page_break') {
                  return <PaperQuestion key={q.id} q={q} language={schoolInfo.language} paperFormat="A4" />;
                }

                const currentNum = questionCounter++;
                return <PaperQuestion key={q.id} q={q} currentNum={currentNum} language={schoolInfo.language} paperFormat="A4" />;
              });
            })()}
          </div>
        </div>
      )}

      {/* Paper Footer */}
      <footer className={`w-full mt-6 flex justify-between items-center print:hidden ${isA5 ? 'max-w-[297mm]' : 'max-w-[210mm]'}`}>
        <div className="text-[0.9rem] font-bold text-slate-500">
          {langConf.totalPoints}: {formatNumber(totalPoints, schoolInfo.language)} / {formatNumber(schoolInfo.totalMarks, schoolInfo.language)}
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
  );
}
