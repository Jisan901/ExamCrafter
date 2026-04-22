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
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Address (Optional)</label>
        <input
          type="text"
          className="w-full px-2 py-1.5 border border-transparent hover:border-slate-200 hover:bg-[#fafafa] focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded text-sm bg-slate-50 transition-colors outline-none"
          value={schoolInfo.address || ''}
          onChange={(e) => setSchoolInfo({ ...schoolInfo, address: e.target.value })}
          placeholder="e.g. 123 Education Lane"
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
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Date (Optional)</label>
          <input
            type="text"
            className="w-full px-2 py-1.5 border border-transparent hover:border-slate-200 hover:bg-[#fafafa] focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded text-sm bg-slate-50 transition-colors outline-none"
            value={schoolInfo.date || ''}
            onChange={(e) => setSchoolInfo({ ...schoolInfo, date: e.target.value })}
            placeholder="e.g. 2026-05-15"
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
      <div>
        <label className="flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          <span>Font Size (Factor)</span>
          <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{schoolInfo.fontSizeFactor || 1}x</span>
        </label>
        <input
          type="range"
          min="0.5"
          max="2.0"
          step="0.05"
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          value={schoolInfo.fontSizeFactor || 1}
          onChange={(e) => setSchoolInfo({ ...schoolInfo, fontSizeFactor: parseFloat(e.target.value) })}
        />
        <div className="flex justify-between text-[0.65rem] text-slate-400 mt-1 font-medium">
          <span>Small (0.5x)</span>
          <span>Normal (1x)</span>
          <span>Large (2x)</span>
        </div>
      </div>
      <div>
        <label className="flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          <span>Font Weight (Factor)</span>
          <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{schoolInfo.fontWeightFactor || 1}x</span>
        </label>
        <input
          type="range"
          min="0.5"
          max="1.5"
          step="0.05"
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          value={schoolInfo.fontWeightFactor || 1}
          onChange={(e) => setSchoolInfo({ ...schoolInfo, fontWeightFactor: parseFloat(e.target.value) })}
        />
        <div className="flex justify-between text-[0.65rem] text-slate-400 mt-1 font-medium">
          <span>Light (0.5x)</span>
          <span>Normal (1x)</span>
          <span>Bold (1.5x)</span>
        </div>
      </div>
      <div>
        <label className="flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          <span>Spacing (Factor)</span>
          <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{schoolInfo.spacingFactor || 1}x</span>
        </label>
        <input
          type="range"
          min="0.5"
          max="2.5"
          step="0.1"
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          value={schoolInfo.spacingFactor || 1}
          onChange={(e) => setSchoolInfo({ ...schoolInfo, spacingFactor: parseFloat(e.target.value) })}
        />
        <div className="flex justify-between text-[0.65rem] text-slate-400 mt-1 font-medium">
          <span>Compact (0.5x)</span>
          <span>Normal (1x)</span>
          <span>Spacious (2.5x)</span>
        </div>
      </div>
    </div>
  );
}
