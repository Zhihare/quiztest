import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const QuizResult: React.FC = () => {
  const { state } = useLocation() as any;
  const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    console.log(state);

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Quiz Result</h2>
      <p className="text-xl text-center font-semibold mb-2">You scored <span className=' text-green-500'>{state.score}</span> out of {state.total}</p>
      <button onClick={() => navigate(`/quiz/${id}`)} className="px-4 py-2 bg-blue-500 text-white rounded">
        Retake Quiz
      </button>
      <button onClick={() => navigate('/')} className="ml-2 px-4 py-2 bg-green-500 text-white rounded">
        Back to Quiz List
      </button>
    </div>
  );
};

export default QuizResult;
