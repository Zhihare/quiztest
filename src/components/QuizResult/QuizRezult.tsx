import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getQuizzes } from '../../redax/api';
import { Quiz } from '../../redax/types';

const QuizResult: React.FC = () => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const { state } = useLocation() as any;
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
    useEffect(() => {
    const fetchQuiz = async () => {
      const quizzes = await getQuizzes();
      const foundQuiz = quizzes.find(q => q.id === id);
      if (foundQuiz) {
          setQuiz(foundQuiz);
      }
    };

    fetchQuiz();
  }, [id]);

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg" style={{background: quiz?.color}}>
      <h2 className="text-2xl font-bold mb-4">Quiz Result</h2>
      <p className="text-xl text-center font-semibold mb-2">You scored <span className=' text-green-500'>{state.score}</span> out of {state.total}</p>
      <img src={state.score === 0 ? "https://i.gifer.com/YQDs.gif" : "https://i.gifer.com/5UKC.gif"} alt="scoreanimation" className=' w-20 h-20 m-auto mb-5'/>
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
