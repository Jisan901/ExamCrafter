import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import PreviewArea from './components/PreviewArea';
import { Question, SchoolInfo, QuestionType, MCQQuestion, ExamDocument } from './types';

function loadDocuments(): ExamDocument[] {
  const saved = localStorage.getItem('examcraft_docs');
  if (saved) {
    try { 
      return JSON.parse(saved); 
    } catch (e) {
      console.error('Failed to parse documents', e);
    }
  }

  // Migration from older version
  const oldInfo = localStorage.getItem('examcraft_schoolInfo');
  const oldQuestions = localStorage.getItem('examcraft_questions');
  let migratedInfo = getDefaultSchoolInfo();
  let migratedQuestions: Question[] = [];

  if (oldInfo) {
    try { migratedInfo = JSON.parse(oldInfo); } catch (e) {}
  }
  if (oldQuestions) {
    try { migratedQuestions = JSON.parse(oldQuestions); } catch (e) {}
  }

  const initialDoc: ExamDocument = {
    id: crypto.randomUUID(),
    name: 'Version A',
    schoolInfo: migratedInfo,
    questions: migratedQuestions,
    updatedAt: Date.now(),
  };

  return [initialDoc];
}

function getDefaultSchoolInfo(): SchoolInfo {
  return {
    name: 'Springfield High School',
    address: '',
    examName: 'Mid-Term Examination 2026',
    date: '2026-05-15',
    time: '2 Hours',
    totalMarks: 100,
    instructions: 'Answer all questions. Write clearly and legibly.',
    examSet: 'A',
    language: 'en',
    className: '',
  };
}

export default function App() {
  const [documents, setDocuments] = useState<ExamDocument[]>(loadDocuments);
  const [activeDocId, setActiveDocId] = useState<string>(documents[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'info' | 'questions'>('info');
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    if (documents.length > 0) {
      localStorage.setItem('examcraft_docs', JSON.stringify(documents));
    }
  }, [documents]);

  const activeDoc = documents.find(d => d.id === activeDocId) || documents[0];
  const schoolInfo = activeDoc?.schoolInfo || getDefaultSchoolInfo();
  const questions = activeDoc?.questions || [];

  const updateActiveDoc = (updates: Partial<ExamDocument>) => {
    setDocuments(docs => docs.map(d => d.id === activeDocId ? { ...d, ...updates, updatedAt: Date.now() } : d));
  };

  const setSchoolInfo = (info: SchoolInfo) => updateActiveDoc({ schoolInfo: info });
  const setQuestions = (qs: Question[]) => updateActiveDoc({ questions: qs });

  const createNewVersion = () => {
    const newDoc: ExamDocument = {
      id: crypto.randomUUID(),
      name: `Version ${String.fromCharCode(65 + documents.length)}`, // Version B, C, D...
      schoolInfo: { ...schoolInfo },
      questions: JSON.parse(JSON.stringify(questions)), // Deep copy questions
      updatedAt: Date.now(),
    };
    setDocuments([...documents, newDoc]);
    setActiveDocId(newDoc.id);
  };

  const deleteCurrentVersion = () => {
    if (documents.length <= 1) return; // Prevent deleting the last version
    const newDocs = documents.filter(d => d.id !== activeDocId);
    setDocuments(newDocs);
    setActiveDocId(newDocs[0].id);
  };

  const importDocument = (importedData: any) => {
    const newDoc: ExamDocument = {
      ...importedData,
      id: crypto.randomUUID(),
      name: importedData.name ? `${importedData.name} (Imported)` : 'Imported Version',
      updatedAt: Date.now()
    };
    setDocuments([...documents, newDoc]);
    setActiveDocId(newDoc.id);
  };

  const handlePrint = () => {
    window.print();
  };

  const addQuestion = (type: QuestionType) => {
    const base = {
      id: crypto.randomUUID(),
      type,
      points: (type === 'section' || type === 'page_break') ? 0 : 1,
      itemCount: 1,
      text: type === 'section' ? 'Section A' : '',
      subItems: [{ id: crypto.randomUUID(), text: '', options: type === 'mcq' ? ['', '', '', ''] : undefined }]
    };

    let newQuestion: Question;
    if (type === 'mcq') {
      newQuestion = { ...base, type: 'mcq', options: ['', '', '', ''] };
    } else if (type === 'subjective') {
      newQuestion = { ...base, type: 'subjective', lines: 3 };
    } else if (type === 'short_answer') {
      newQuestion = { ...base, type: 'short_answer', lines: 1 };
    } else if (type === 'section') {
      newQuestion = { ...base, type: 'section', instructions: '' };
    } else if (type === 'page_break') {
      newQuestion = { ...base, type: 'page_break' };
    } else if (type === 'matching') {
      newQuestion = { ...base, type: 'matching', text: 'Match the items from Column A with Column B:', points: 5, pairs: [
        { id: crypto.randomUUID(), left: '', right: '' },
        { id: crypto.randomUUID(), left: '', right: '' },
        { id: crypto.randomUUID(), left: '', right: '' },
        { id: crypto.randomUUID(), left: '', right: '' }
      ] };
    } else {
      newQuestion = { ...base, type: 'gap_filling' };
    }

    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map((q) => {
      if (q.id === id) {
        const updated = { ...q, ...updates } as Question;
        if (updates.itemCount !== undefined) {
          const count = updates.itemCount;
          let newSubItems = updated.subItems || [];
          
          if (q.itemCount === 1 && count > 1 && newSubItems.length <= 1) {
            newSubItems = [{
              id: crypto.randomUUID(),
              text: q.text,
              options: q.type === 'mcq' ? [...(q as MCQQuestion).options] : undefined
            }];
            updated.text = 'Answer the following questions:';
          }

          if (newSubItems.length < count) {
            const toAdd = count - newSubItems.length;
            for (let i = 0; i < toAdd; i++) {
              newSubItems.push({
                id: crypto.randomUUID(),
                text: '',
                options: updated.type === 'mcq' ? ['', '', '', ''] : undefined
              });
            }
          } else if (newSubItems.length > count) {
            newSubItems = newSubItems.slice(0, count);
          }
          updated.subItems = newSubItems;
        }
        return updated;
      }
      return q;
    }));
  };

  const updateSubItem = (qId: string, subId: string, text: string) => {
    setQuestions(questions.map(q => {
      if (q.id === qId && q.subItems) {
        return {
          ...q,
          subItems: q.subItems.map(sub => sub.id === subId ? { ...sub, text } : sub)
        };
      }
      return q;
    }));
  };

  const updateSubItemOption = (qId: string, subId: string, optIndex: number, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id === qId && q.subItems) {
        return {
          ...q,
          subItems: q.subItems.map(sub => {
            if (sub.id === subId && sub.options) {
              const newOptions = [...sub.options];
              newOptions[optIndex] = value;
              return { ...sub, options: newOptions };
            }
            return sub;
          })
        };
      }
      return q;
    }));
  };

  const updateMCQOption = (id: string, index: number, value: string) => {
    setQuestions(questions.map((q) => {
      if (q.id === id && q.type === 'mcq') {
        const newOptions = [...q.options];
        newOptions[index] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const clearQuestions = () => {
    if (window.confirm('Are you sure you want to clear all questions from this version? This cannot be undone.')) {
      setQuestions([]);
    }
  };

  const moveQuestion = (id: string, direction: 'up' | 'down') => {
    const idx = questions.findIndex(q => q.id === id);
    if (idx < 0) return;
    const newQuestions = [...questions];
    if (direction === 'up' && idx > 0) {
      [newQuestions[idx], newQuestions[idx - 1]] = [newQuestions[idx - 1], newQuestions[idx]];
    } else if (direction === 'down' && idx < newQuestions.length - 1) {
      [newQuestions[idx], newQuestions[idx + 1]] = [newQuestions[idx + 1], newQuestions[idx]];
    }
    setQuestions(newQuestions);
  };

  const totalPoints = questions.reduce((sum, q) => {
    if (q.type === 'section' || q.type === 'page_break') return sum;
    if (q.manualPoints) {
      if (q.itemCount && q.itemCount > 1 && q.subItems) {
         return sum + q.subItems.reduce((subSum, sub) => subSum + (sub.points || 0), 0);
      }
      return sum + (q.points || 0);
    }
    return sum + (q.points * (q.itemCount || 1));
  }, 0);

  const totalQuestions = questions.filter(q => q.type !== 'section' && q.type !== 'page_break').length;
  const totalSubItems = questions.reduce((sum, q) => {
    if (q.type === 'section' || q.type === 'page_break') return sum;
    return sum + (q.itemCount || 1);
  }, 0);

  if (!activeDoc) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 print:block print:min-h-0 print:bg-white">
      <Sidebar
        schoolInfo={schoolInfo}
        setSchoolInfo={setSchoolInfo}
        questions={questions}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        addQuestion={addQuestion}
        updateQuestion={updateQuestion}
        updateSubItem={updateSubItem}
        updateSubItemOption={updateSubItemOption}
        updateMCQOption={updateMCQOption}
        removeQuestion={removeQuestion}
        clearQuestions={clearQuestions}
        moveQuestion={moveQuestion}
        totalPoints={totalPoints}
        totalQuestions={totalQuestions}
        totalSubItems={totalSubItems}
        documents={documents}
        activeDocId={activeDocId}
        setActiveDocId={setActiveDocId}
        createNewVersion={createNewVersion}
        deleteCurrentVersion={deleteCurrentVersion}
        updateDocName={(name) => updateActiveDoc({ name })}
        importDocument={importDocument}
        showPreview={showPreview}
        setShowPreview={setShowPreview}
      />
      {showPreview && (
        <PreviewArea
          schoolInfo={schoolInfo}
          questions={questions}
          totalPoints={totalPoints}
          handlePrint={handlePrint}
        />
      )}
    </div>
  );
}
