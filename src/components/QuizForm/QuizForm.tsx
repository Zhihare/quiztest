import React, { useState } from 'react';
import { saveQuiz } from '../../redax/api';

interface Question {
  id: string
  text: string;
  answers: { text: string, isCorrect: boolean }[];
}

interface Quiz {
  id: string;
  name: string;
  questions: Question[];
}


interface QuizFormProps {
  quiz: Quiz | null;
  onSave: () => void;
}

const QuizForm: React.FC<QuizFormProps> = ({ quiz, onSave }) => {
  const [name, setName] = useState(quiz?quiz.name: '');
    const [questions, setQuestions] = useState<Question[]>(quiz?.questions || []);
    const [id, setId] = useState(quiz?`${quiz.id}0001`:'');

  const handleAddQuestion = () => {
    setQuestions([...questions, { id: '',text: '', answers: [] }]);
  };

  const handleAddAnswer = (qIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers.push({ text: '', isCorrect: false });
    setQuestions(newQuestions);
  };

  const handleSave = async () => {
    await saveQuiz({ id: quiz?quiz.id:'', name, questions });
    onSave();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">{quiz ? 'Edit Quiz' : 'New Quiz'}</h1>
      <div>
        <label className="block">Name</label>
        <input value={name} onChange={e => setName(e.target.value)} className="border p-1" />
      </div>
      <div>
        <h2 className="text-xl">Questions</h2>
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="border p-2 my-2">
            <input value={q.text} onChange={e => {
              const newQuestions = [...questions];
              newQuestions[qIndex].text = e.target.value;
              setQuestions(newQuestions);
            }} className="border p-1" />
            <div>
              <h3>Answers</h3>
              {q.answers.map((a, aIndex) => (
                <div key={aIndex} className="flex items-center">
                  <input value={a.text} onChange={e => {
                    const newQuestions = [...questions];
                    newQuestions[qIndex].answers[aIndex].text = e.target.value;
                    setQuestions(newQuestions);
                  }} className="border p-1" />
                  <label>
                    <input type="checkbox" checked={a.isCorrect} onChange={e => {
                      const newQuestions = [...questions];
                      newQuestions[qIndex].answers[aIndex].isCorrect = e.target.checked;
                      setQuestions(newQuestions);
                    }} />
                    Correct
                  </label>
                </div>
              ))}
              <button onClick={() => handleAddAnswer(qIndex)} className="bg-blue-500 text-white px-2 py-1">Add Answer</button>
            </div>
          </div>
        ))}
        <button onClick={handleAddQuestion} className="bg-blue-500 text-white px-2 py-1">Add Question</button>
      </div>
      <button onClick={handleSave} className="bg-green-500 text-white px-2 py-1 mt-2">Save Quiz</button>
    </div>
  );
};

export default QuizForm;
