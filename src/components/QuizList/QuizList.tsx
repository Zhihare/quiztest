import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Quiz } from '../../redax/types';
import { deleteQuiz, getQuizzes } from '../../redax/api';
import { generateId, getRandomColor } from '../Service/generateId';



const QuizList: React.FC = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    const data = await getQuizzes();
    setQuizzes(data);
  };

  const handleDelete = async (id: string) => {
    await deleteQuiz(id);
    fetchQuizzes();
    };
    
    const handleEdit = (id: string) => {
    navigate(`/form/${id}`);
    };
    
     const handleStart = (id: string) => {
    navigate(`/quiz/${id}`);
    };

    const filteredQuizzes = quizzes.filter(quiz =>
    quiz.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

return(
   <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Quiz List</h2>
      <button onClick={() => navigate(`/form/${generateId()}`)} className="px-4 py-2 bg-blue-500 text-white rounded mb-4">
        Add New Quiz
        </button>
        <div>
              <input
          type="text"
          placeholder="Search by quiz name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border-2 border-gray-200 p-2 rounded mb-4"
        />
       <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredQuizzes.map(quiz => (
          <li key={quiz.id} className="flex flex-col justify-between h-48 p-4 border-4 rounded-lg" style={{ background: getRandomColor() }}>
            <div className="flex-grow">
              <p className="font-bold text-xl mb-2">{quiz.name}</p>
              <span className="text-gray-700">Number of questions: {quiz.questions.length}</span>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={() => handleStart(quiz.id)} className="px-3 py-1 bg-green-500 text-white rounded">
                Start
              </button>
              <button onClick={() => handleEdit(quiz.id)} className="px-3 py-1 bg-yellow-500 text-white rounded">
                Edit
              </button>
              <button onClick={() => handleDelete(quiz.id)} className="px-3 py-1 bg-red-500 text-white rounded">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default QuizList;