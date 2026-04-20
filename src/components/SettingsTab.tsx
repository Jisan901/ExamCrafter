import { SchoolInfo } from '../types';

interface SettingsTabProps {
  schoolInfo: SchoolInfo;
  setSchoolInfo: (info: SchoolInfo) => void;
}

export default function SettingsTab({ schoolInfo, setSchoolInfo }: SettingsTabProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">School Name</label>
        <input
          type="text"
          className="w-full px-2 py-1.5 border border-transparent hover:border-slate-200 hover:bg-[#fafafa] focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded text-sm bg-slate-50 transition-colors outline-none"
          value={schoolInfo.name}
          onChange={(e) => setSchoolInfo({ ...schoolInfo, name: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Exam Name</label>
        <input
          type="text"
          className="w-full px-2 py-1.5 border border-transparent hover:border-slate-200 hover:bg-[#fafafa] focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded text-sm bg-slate-50 transition-colors outline-none"
          value={schoolInfo.examName}
          onChange={(e) => setSchoolInfo({ ...schoolInfo, examName: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Date</label>
          <input
            type="text"
            className="w-full px-2 py-1.5 border border-transparent hover:border-slate-200 hover:bg-[#fafafa] focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded text-sm bg-slate-50 transition-colors outline-none"
            value={schoolInfo.date}
            onChange={(e) => setSchoolInfo({ ...schoolInfo, date: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Time</label>
          <input
            type="text"
            className="w-full px-2 py-1.5 border border-transparent hover:border-slate-200 hover:bg-[#fafafa] focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded text-sm bg-slate-50 transition-colors outline-none"
            value={schoolInfo.time}
            onChange={(e) => setSchoolInfo({ ...schoolInfo, time: e.target.value })}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Set (Optional)</label>
          <input
            type="text"
            className="w-full px-2 py-1.5 border border-transparent hover:border-slate-200 hover:bg-[#fafafa] focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded text-sm bg-slate-50 transition-colors outline-none"
            value={schoolInfo.examSet}
            onChange={(e) => setSchoolInfo({ ...schoolInfo, examSet: e.target.value })}
            placeholder="e.g. A, B, 1"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Language</label>
          <select
            className="w-full px-2 py-1.5 border border-transparent hover:border-slate-200 hover:bg-[#fafafa] focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded text-sm bg-slate-50 transition-colors outline-none"
            value={schoolInfo.language}
            onChange={(e) => setSchoolInfo({ ...schoolInfo, language: e.target.value })}
          >
            <option value="en">English</option>
            <option value="bn">Bengali</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Class / Grade</label>
          <input
            type="text"
            className="w-full px-2 py-1.5 border border-transparent hover:border-slate-200 hover:bg-[#fafafa] focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded text-sm bg-slate-50 transition-colors outline-none"
            value={schoolInfo.className || ''}
            onChange={(e) => setSchoolInfo({ ...schoolInfo, className: e.target.value })}
            placeholder="e.g. 10, IX, etc."
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Subject</label>
          <input
            type="text"
            className="w-full px-2 py-1.5 border border-transparent hover:border-slate-200 hover:bg-[#fafafa] focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded text-sm bg-slate-50 transition-colors outline-none"
            value={schoolInfo.subject || ''}
            onChange={(e) => setSchoolInfo({ ...schoolInfo, subject: e.target.value })}
            placeholder="e.g. Mathematics"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Marks</label>
        <input
          type="number"
          className="w-full px-2 py-1.5 border border-transparent hover:border-slate-200 hover:bg-[#fafafa] focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded text-sm bg-slate-50 transition-colors outline-none"
          value={schoolInfo.totalMarks}
          onChange={(e) => setSchoolInfo({ ...schoolInfo, totalMarks: parseInt(e.target.value) || 0 })}
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Instructions</label>
        <textarea
          className="w-full px-2 py-1.5 border border-transparent hover:border-slate-200 hover:bg-[#fafafa] focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded text-sm h-24 resize-none bg-slate-50 transition-colors outline-none"
          value={schoolInfo.instructions}
          onChange={(e) => setSchoolInfo({ ...schoolInfo, instructions: e.target.value })}
        />
      </div>
    </div>
  );
}
