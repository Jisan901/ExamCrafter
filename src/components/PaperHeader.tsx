import { SchoolInfo } from '../types';

interface PaperHeaderProps {
  schoolInfo: SchoolInfo;
}

export default function PaperHeader({ schoolInfo }: PaperHeaderProps) {
  return (
    <>
      <header className="text-center border-b-2 border-slate-900 pb-4 mb-6">
        <h1 className="text-[1.5rem] font-bold uppercase text-slate-900">{schoolInfo.name}</h1>
        <p className="text-[0.9rem] text-slate-500 mt-1 font-medium">{schoolInfo.examName}</p>
        
        <div className="flex justify-between mt-4 text-[0.85rem] font-semibold text-slate-900">
          <span>Grade: ________________</span>
          <span>Time: {schoolInfo.time || '________________'}</span>
          <span>Date: {schoolInfo.date || '________________'}</span>
        </div>
        {schoolInfo.examSet && (
          <div className="mt-2 text-[0.85rem] font-bold text-slate-900">
            Set: {schoolInfo.examSet}
          </div>
        )}
      </header>

      {schoolInfo.instructions && (
        <div className="mb-6 text-[0.9rem] text-slate-700 italic">
          <strong>Instructions:</strong> {schoolInfo.instructions}
        </div>
      )}
    </>
  );
}
