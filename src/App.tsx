import React, { useState } from 'react';
import QuizList from './components/QuizList/QuizList';
import QuizForm from './components/QuizForm/QuizForm';
import Quiz from './components/Quiz/Quiz';
import QuizResult from './components/QuizResult/QuizRezult';
import { Quiz as QuizType } from './redax/types';

const App: React.FC = () => {
  const [view, setView] = useState<'list' | 'form' | 'quiz' | 'result'>('list');
  const [selectedQuiz, setSelectedQuiz] = useState<QuizType | null>(null);
  const [score, setScore] = useState(0);

  const handleEdit = (quiz: QuizType) => {
    setSelectedQuiz(quiz);
    setView('form');
  };

  const handleStart = (quiz: QuizType) => {
    setSelectedQuiz(quiz);
    setView('quiz');
  };

  const handleSave = () => {
    setView('list');
    setSelectedQuiz(null);
  };

  const handleFinish = (score: number) => {
    setScore(score);
    setView('result');
  };

  return (
    <div className="p-4">
      {view === 'list' && <QuizList onEdit={handleEdit} onStart={handleStart} />}
      {view === 'form' && <QuizForm quiz={selectedQuiz} onSave={handleSave} />}
      {view === 'quiz' && selectedQuiz && <Quiz quiz={selectedQuiz} onFinish={handleFinish} />}
      {view === 'result' && selectedQuiz && <QuizResult score={score} total={selectedQuiz.questions.length} onRetake={() => setView('list')} />}
    </div>
  );
};

export default App;
