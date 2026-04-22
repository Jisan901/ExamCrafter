import { SchoolInfo } from '../types';
import langData from '../lang.json';
import { formatNumber } from '../utils';

interface PaperHeaderProps {
  schoolInfo: SchoolInfo;
}

export default function PaperHeader({ schoolInfo }: PaperHeaderProps) {
  const langConf = (langData as any)[schoolInfo.language] || langData.en;

  return (
    <>
      <header className="text-center border-b-2 border-slate-900 pb-4 mb-6">
        <h1 className="text-[1.5em] font-bold uppercase text-slate-900">{schoolInfo.name}</h1>
        {schoolInfo.address && (
          <p className="text-[1.05em] font-semibold text-slate-700 mt-1">{schoolInfo.address}</p>
        )}
        <p className="text-[0.9em] text-slate-500 mt-1 font-medium">{schoolInfo.examName}</p>
        
        <div className="flex justify-between mt-4 text-[0.85em] font-semibold text-slate-900">
          <span>{langConf.class}: {schoolInfo.className || '________________'}</span>
          <span>{langConf.subject}: {schoolInfo.subject || '________________'}</span>
          <span>{langConf.totalMarks}: {schoolInfo.totalMarks ? formatNumber(schoolInfo.totalMarks, schoolInfo.language) : '________________'}</span>
          <span>{langConf.time}: {schoolInfo.time || '________________'}</span>
          {schoolInfo.date ? <span>{langConf.date}: {schoolInfo.date}</span> : null}
        </div>
        {schoolInfo.examSet && (
          <div className="mt-2 text-[0.85em] font-bold text-slate-900">
            {langConf.set}: {schoolInfo.examSet}
          </div>
        )}
      </header>

      {schoolInfo.instructions && (
        <div className="mb-6 text-[0.9em] text-slate-700 italic">
          <strong>{langConf.instructions}:</strong> {schoolInfo.instructions}
        </div>
      )}
    </>
  );
}
