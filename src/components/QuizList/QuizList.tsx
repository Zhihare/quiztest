import React, { useState, useEffect } from 'react';
import { getQuizzes, deleteQuiz } from '../../redax/api';
import { Quiz as QuizType } from '../../redax/types';


const QuizList: React.FC<{ onEdit: (quiz: QuizType) => void, onStart: (quiz: QuizType) => void }> = ({ onEdit, onStart }) => {
  const [quizzes, setQuizzes] = useState<QuizType[]>([]);

  useEffect(() => {
    getQuizzes().then(setQuizzes);
  }, []);

  const handleDelete = async (id: string) => {
    await deleteQuiz(id);
    setQuizzes(quizzes.filter(quiz => quiz.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Quizzes</h1>
      <ul>
        {quizzes.map(quiz => (
          <li key={quiz.id} className="flex justify-between items-center">
            <span>{quiz.name}</span>
            <div>
              <button onClick={() => onEdit(quiz)} className="bg-blue-500 text-white px-2 py-1">Edit</button>
              <button onClick={() => handleDelete(quiz.id)} className="bg-red-500 text-white px-2 py-1">Delete</button>
              <button onClick={() => onStart(quiz)} className="bg-green-500 text-white px-2 py-1">Start</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
