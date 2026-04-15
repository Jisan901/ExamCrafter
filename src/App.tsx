import { useState } from 'react';
import Sidebar from './components/Sidebar';
import PreviewArea from './components/PreviewArea';
import { Question, SchoolInfo, QuestionType, MCQQuestion } from './types';

export default function App() {
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo>({
    name: 'Springfield High School',
    examName: 'Mid-Term Examination 2026',
    date: '2026-05-15',
    time: '2 Hours',
    totalMarks: 100,
    instructions: 'Answer all questions. Write clearly and legibly.',
    examSet: 'A',
    language: 'en',
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeTab, setActiveTab] = useState<'info' | 'questions'>('info');

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

  const totalPoints = questions.reduce((sum, q) => sum + (q.points * (q.itemCount || 1)), 0);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
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
        totalPoints={totalPoints}
      />
      <PreviewArea
        schoolInfo={schoolInfo}
        questions={questions}
        totalPoints={totalPoints}
        handlePrint={handlePrint}
      />
    </div>
  );
}
