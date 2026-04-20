import { Trash2 } from 'lucide-react';
import { Question, SectionHeader } from '../types';

interface QuestionEditorProps {
  key?: string;
  q: Question;
  updateQuestion: (id: string, updates: Partial<Question>) => void;
  updateSubItem: (qId: string, subId: string, text: string) => void;
  updateSubItemOption: (qId: string, subId: string, optIndex: number, value: string) => void;
  updateMCQOption: (id: string, index: number, value: string) => void;
  removeQuestion: (id: string) => void;
}

export default function QuestionEditor({
  q,
  updateQuestion,
  updateSubItem,
  updateSubItemOption,
  updateMCQOption,
  removeQuestion
}: QuestionEditorProps) {
  return (
    <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm relative group">
      <button
        onClick={() => removeQuestion(q.id)}
        className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
        title="Remove Question"
      >
        <Trash2 className="w-4 h-4" />
      </button>
      
      <div className="flex justify-between items-center mb-3">
        {/* Question Type Badge */}
        <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded uppercase border border-slate-200">
          {q.type === 'section' ? 'Section Header' : q.type === 'page_break' ? 'Page Break' : `Q • ${q.type.replace('_', ' ')}`}
        </span>

        {q.type !== 'section' && q.type !== 'page_break' && (
          <div className="flex items-center gap-1 mr-6 bg-slate-50 border border-slate-200 rounded p-1">
            <span className="text-xs text-slate-500 font-medium px-1">Items:</span>
            <input
              type="number"
              className="w-10 px-1 py-0.5 text-sm border-none bg-transparent outline-none text-center hover:bg-slate-200 rounded transition-colors"
              value={q.itemCount || 1}
              onChange={(e) => updateQuestion(q.id, { itemCount: parseInt(e.target.value) || 1 })}
              title="Number of items"
            />
            {(!q.manualPoints) && (
              <>
                <span className="text-xs text-slate-500 font-medium px-1 text-slate-300">×</span>
                <input
                  type="number"
                  className="w-10 px-1 py-0.5 text-sm border-none bg-transparent outline-none text-center hover:bg-slate-200 rounded transition-colors"
                  value={q.points}
                  onChange={(e) => updateQuestion(q.id, { points: parseInt(e.target.value) || 0 })}
                  title="Points per item"
                />
              </>
            )}
            <div className="h-4 w-px bg-slate-300 mx-1"></div>
            <label className="flex items-center gap-1.5 cursor-pointer px-1" title="Set Points Manually">
              <input 
                type="checkbox" 
                checked={!!q.manualPoints}
                onChange={(e) => updateQuestion(q.id, { manualPoints: e.target.checked })}
                className="w-3 h-3 cursor-pointer"
              />
              <span className="text-[0.65rem] uppercase font-bold text-slate-500 tracking-wider">Manual Pts</span>
            </label>
          </div>
        )}
      </div>

      {q.type === 'section' ? (
        <>
          <input
            type="text"
            className="w-full px-2 py-1.5 border border-transparent hover:border-slate-200 focus:border-slate-300 rounded text-sm font-bold mb-2 bg-slate-50 focus:bg-white outline-none transition-colors"
            placeholder="Section Title (e.g., Section A: Objective)"
            value={q.text}
            onChange={(e) => updateQuestion(q.id, { text: e.target.value })}
          />
          <textarea
            className="w-full px-2 py-1.5 border border-transparent hover:border-slate-200 focus:border-slate-300 rounded text-sm resize-none mb-2 bg-slate-50 focus:bg-white outline-none transition-colors"
            placeholder="Section Instructions (optional)"
            value={(q as SectionHeader).instructions || ''}
            onChange={(e) => updateQuestion(q.id, { instructions: e.target.value })}
            rows={2}
          />
          <label className="flex items-center gap-2 mt-2 cursor-pointer">
             <input
               type="checkbox"
               checked={!!(q as SectionHeader).restartNumbering}
               onChange={(e) => updateQuestion(q.id, { restartNumbering: e.target.checked })}
               className="cursor-pointer"
             />
             <span className="text-xs text-slate-600 font-medium">Restart question numbering from 1</span>
          </label>
        </>
      ) : q.type === 'page_break' ? (
        <div className="text-sm text-slate-400 italic text-center py-2">
          --- Page Break ---
        </div>
      ) : (
        <>
          <textarea
            className="w-full px-2 py-1.5 border border-transparent hover:border-slate-200 focus:border-slate-300 rounded text-sm resize-none mb-2 bg-slate-50 focus:bg-white outline-none transition-colors"
            placeholder={q.itemCount && q.itemCount > 1 ? "Group Instruction (e.g., Answer the following:)" : (q.type === 'gap_filling' ? "Enter text with blanks (e.g., The capital of France is _____.)" : "Enter question text")}
            value={q.text}
            onChange={(e) => updateQuestion(q.id, { text: e.target.value })}
            rows={q.itemCount && q.itemCount > 1 ? 2 : 3}
          />
          
          {q.itemCount && q.itemCount > 1 && q.subItems && (
            <div className="mt-3 space-y-3 border-t border-slate-100 pt-3">
              {q.subItems.map((sub, idx) => (
                <div key={sub.id} className="pl-3 border-l-2 border-blue-200">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs font-semibold text-slate-400">Item {idx + 1}</div>
                    {q.manualPoints && (
                       <div className="flex items-center gap-1">
                         <span className="text-xs text-slate-400 font-medium">Pts:</span>
                         <input 
                           type="number" 
                           className="w-12 px-1 py-0.5 text-xs border border-slate-200 rounded outline-none"
                           value={sub.points === undefined ? q.points : sub.points}
                           onChange={(e) => {
                             const newSubItems = [...(q.subItems || [])];
                             newSubItems[idx] = { ...sub, points: parseInt(e.target.value) || 0 };
                             updateQuestion(q.id, { subItems: newSubItems });
                           }}
                         />
                       </div>
                    )}
                  </div>
                  <textarea
                    className="w-full px-2 py-1.5 border border-transparent hover:border-slate-200 focus:border-slate-300 rounded text-sm resize-none mb-2 bg-slate-50 focus:bg-white outline-none transition-colors"
                    placeholder={q.type === 'gap_filling' ? "Enter text with blanks" : "Enter question text"}
                    value={sub.text}
                    onChange={(e) => updateSubItem(q.id, sub.id, e.target.value)}
                    rows={2}
                  />
                  {q.type === 'mcq' && sub.options && (
                    <div className="grid grid-cols-2 gap-2">
                      {sub.options.map((opt, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-xs font-medium text-slate-500">{String.fromCharCode(65 + i)}.</span>
                          <input
                            type="text"
                            className="flex-1 px-2 py-1 border border-transparent hover:border-slate-200 focus:border-slate-300 rounded text-sm bg-slate-50 focus:bg-white outline-none transition-colors"
                            placeholder={`Option ${i + 1}`}
                            value={opt}
                            onChange={(e) => updateSubItemOption(q.id, sub.id, i, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {q.itemCount === 1 && q.type === 'mcq' && (
            <div className="grid grid-cols-2 gap-2">
              {q.options.map((opt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-500">{String.fromCharCode(65 + i)}.</span>
                  <input
                    type="text"
                    className="flex-1 px-2 py-1 border border-transparent hover:border-slate-200 focus:border-slate-300 rounded text-sm bg-slate-50 focus:bg-white outline-none transition-colors"
                    placeholder={`Option ${i + 1}`}
                    value={opt}
                    onChange={(e) => updateMCQOption(q.id, i, e.target.value)}
                  />
                </div>
              ))}
            </div>
          )}

          {q.type === 'matching' && (
            <div className="mt-3 space-y-2 border-t border-slate-100 pt-3">
              <div className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center text-xs font-semibold text-slate-500 mb-1">
                <span>Column A</span>
                <span>Column B</span>
                <span></span>
              </div>
              {q.pairs.map((pair, idx) => (
                <div key={pair.id} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                  <input
                    type="text"
                    className="px-2 py-1.5 border border-transparent hover:border-slate-200 focus:border-slate-300 rounded text-sm bg-slate-50 focus:bg-white outline-none transition-colors"
                    placeholder={`Left item ${idx + 1}`}
                    value={pair.left}
                    onChange={(e) => {
                      const newPairs = [...q.pairs];
                      newPairs[idx] = { ...pair, left: e.target.value };
                      updateQuestion(q.id, { pairs: newPairs });
                    }}
                  />
                  <input
                    type="text"
                    className="px-2 py-1.5 border border-transparent hover:border-slate-200 focus:border-slate-300 rounded text-sm bg-slate-50 focus:bg-white outline-none transition-colors"
                    placeholder={`Right item ${idx + 1}`}
                    value={pair.right}
                    onChange={(e) => {
                      const newPairs = [...q.pairs];
                      newPairs[idx] = { ...pair, right: e.target.value };
                      updateQuestion(q.id, { pairs: newPairs });
                    }}
                  />
                  <button
                    onClick={() => {
                      if (q.pairs.length > 2) {
                        const newPairs = q.pairs.filter((_, i) => i !== idx);
                        updateQuestion(q.id, { pairs: newPairs });
                      }
                    }}
                    disabled={q.pairs.length <= 2}
                    className="p-1 text-slate-400 hover:text-red-500 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <div className="flex justify-center mt-2">
                <button
                  onClick={() => {
                    updateQuestion(q.id, {
                      pairs: [...q.pairs, { id: crypto.randomUUID(), left: '', right: '' }]
                    });
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium py-1 px-3 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                >
                  + Add Pair
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {(q.type === 'subjective' || q.type === 'short_answer') && (
        <div className="flex items-center gap-2 mt-2">
          <label className="text-xs text-slate-600 font-medium">Answer Lines:</label>
          <input
            type="number"
            className="w-16 px-2 py-1 border border-transparent hover:border-slate-200 focus:border-slate-300 rounded text-sm bg-slate-50 focus:bg-white outline-none transition-colors"
            value={q.lines}
            onChange={(e) => updateQuestion(q.id, { lines: parseInt(e.target.value) || 1 })}
            min={1}
            max={20}
          />
        </div>
      )}
      {q.itemCount === 1 && q.manualPoints && q.type !== 'section' && q.type !== 'page_break' && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
           <label className="text-xs text-slate-600 font-bold uppercase">Manual Total Points:</label>
           <input 
             type="number"
             className="w-16 px-2 py-1 border border-slate-200 rounded text-sm outline-none focus:border-blue-400"
             value={q.points}
             onChange={(e) => updateQuestion(q.id, { points: parseInt(e.target.value) || 0 })}
           />
        </div>
      )}
    </div>
  );
}
