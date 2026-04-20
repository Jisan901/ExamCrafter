import React, { useRef } from 'react';
import { Question, SchoolInfo, QuestionType, ExamDocument } from '../types';
import SettingsTab from './SettingsTab';
import QuestionEditor from './QuestionEditor';
import langData from '../lang.json';
import { formatNumber } from '../utils';

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
  totalQuestions: number;
  totalSubItems: number;
  documents: ExamDocument[];
  activeDocId: string;
  setActiveDocId: (id: string) => void;
  createNewVersion: () => void;
  deleteCurrentVersion: () => void;
  updateDocName: (name: string) => void;
  importDocument: (doc: any) => void;
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
  totalPoints,
  totalQuestions,
  totalSubItems,
  documents,
  activeDocId,
  setActiveDocId,
  createNewVersion,
  deleteCurrentVersion,
  updateDocName,
  importDocument
}: SidebarProps) {
  const langConf = (langData as any)[schoolInfo.language] || langData.en;
  const activeDoc = documents.find(d => d.id === activeDocId) || documents[0];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    if (!activeDoc) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(activeDoc, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `ExamBuilder_${activeDoc.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json && typeof json === 'object' && 'questions' in json && 'schoolInfo' in json) {
           importDocument(json);
        } else {
           alert('Invalid file format. Please upload a valid ExamBuilder JSON file.');
        }
      } catch(error) {
        alert('Error parsing file.');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
       fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-[280px] bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 print:hidden z-10">
      <div className="p-6 pb-4">
        <div className="text-xl font-extrabold text-blue-600 mb-6 flex items-center gap-2">
          <span className="bg-blue-600 text-white rounded w-7 h-7 flex items-center justify-center text-sm">Q</span>
          ExamBuilder
        </div>

        <div className="mb-6 relative">
          <select 
            className="w-full appearance-none bg-slate-100 border border-slate-200 text-slate-900 text-[0.85rem] font-bold rounded px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-ellipsis truncate"
            value={activeDocId}
            onChange={(e) => {
              if (e.target.value === 'NEW') {
                createNewVersion();
              } else {
                setActiveDocId(e.target.value);
              }
            }}
          >
            <optgroup label="Saved Papers">
              {documents.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </optgroup>
            <option value="NEW">+ Duplicate & Create Version</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
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
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Version Name</label>
              <input
                type="text"
                className="w-full px-2 py-1.5 border border-transparent hover:border-slate-200 hover:bg-[#fafafa] focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded text-sm font-semibold text-blue-600 bg-blue-50 transition-colors outline-none"
                value={activeDoc?.name || ''}
                onChange={(e) => updateDocName(e.target.value)}
                placeholder="e.g. Set A, Draft 1"
              />
            </div>
            <div className="border-t border-slate-200 my-4" />
            <SettingsTab schoolInfo={schoolInfo} setSchoolInfo={setSchoolInfo} />
            <div className="border-t border-slate-200 my-4" />
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button 
                onClick={handleExport}
                className="py-2 px-3 text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 hover:bg-slate-200 rounded transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Export
              </button>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="py-2 px-3 text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 hover:bg-slate-200 rounded transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                Import
              </button>
              <input 
                type="file" 
                accept=".json" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleImport}
              />
            </div>

            <button 
              onClick={() => {
                if(window.confirm('Are you sure you want to delete this version?')) {
                  deleteCurrentVersion();
                }
              }}
              disabled={documents.length <= 1}
              className="w-full py-2 px-3 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete This Version
            </button>
          </div>
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
                onClick={() => addQuestion('matching')}
                className="w-full flex items-center px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg mb-2 cursor-pointer text-[0.9rem] font-medium transition-colors hover:bg-slate-200 text-slate-900"
              >
                <span className="mr-3 text-lg font-normal">⏏️</span> Column Match
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
        <div className="bg-[#f0fdf4] p-4 rounded-lg border border-[#dcfce7] mb-3">
          <p className="text-xs text-[#166534] font-semibold uppercase tracking-wider mb-1">{langConf.totalPoints}</p>
          <p className="text-2xl font-extrabold text-[#166534]">{formatNumber(totalPoints, schoolInfo.language)} / {formatNumber(schoolInfo.totalMarks, schoolInfo.language)}</p>
        </div>
        <div className="flex justify-between items-center text-xs text-slate-500 font-medium px-2">
          <span>{totalQuestions} Questions</span>
          <span>{totalSubItems} Items</span>
        </div>
      </div>
    </div>
  );
}
