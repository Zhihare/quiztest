import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getQuizzes } from '../../redax/api';
import { Quiz } from '../../redax/types';

type LocationState = {
  score: number;
  total: number;
  selectedAnswers: [number, Set<number>][];
};

const QuizResult: React.FC = () => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const state = location.state as LocationState;

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

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const correctAnswers = quiz.questions.map(question => {
    return question.answers.reduce((acc: number[], answer, answerIndex) => {
      if (answer.isCorrect) {
        acc.push(answerIndex);
      }
      return acc;
    }, []);
  });

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-md rounded-lg" style={{ background: quiz.color }}>
      <h2 className="text-2xl font-bold mb-4">Quiz Result</h2>
      <p className="text-xl text-center font-semibold mb-2">
        You scored <span className="text-green-500 p-1 bg-cyan-50 rounded-lg">{state.score}</span> out of {state.total * quiz.pointsPerAnswer}
      </p>
      <img
        src={state.score < state.total*quiz.pointsPerAnswer / 2 ? 'https://i.gifer.com/YQDs.gif' : 'https://i.gifer.com/5UKC.gif'}
        alt="scoreanimation"
        className="w-20 h-20 m-auto mb-5"
      />
      <button onClick={() => navigate(`/quiz/${id}`)} className="px-4 py-2 bg-blue-500 text-white rounded">
        Retake Quiz
      </button>
      <button onClick={() => navigate('/')} className="ml-2 px-4 py-2 bg-green-500 text-white rounded">
        Back to Quiz List
      </button>
      <button onClick={toggleDetails} className="ml-2 px-4 py-2 bg-yellow-500 text-white rounded">
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>

      {showDetails && (
        <div className="mt-4">
          {quiz.questions.map((question, questionIndex) => (
            <div key={question.id} className="mb-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{question.text}</h3>
              <h4 className="text-md font-medium mb-2">User Answers:</h4>
              {question.answers.map((answer, answerIndex) => {
                const userAnswers = state.selectedAnswers.find(([index]) => index === questionIndex)?.[1] || new Set<number>();
                const isSelected = userAnswers.has(answerIndex);
                const isCorrect = correctAnswers[questionIndex].includes(answerIndex);
                let answerStyle = 'text-black';

                if (isSelected && isCorrect) {
                  answerStyle = 'text-green-500';
                } else if (isSelected && !isCorrect) {
                  answerStyle = 'text-red-500';
                } else if (!isSelected && isCorrect) {
                  answerStyle = 'text-green-500';
                }

                return (
                  <div key={answerIndex} className={`mb-2 p-2 rounded-lg ${answerStyle}`}>
                    <input type="checkbox" checked={isSelected} readOnly className="mr-2" />
                    <span>{answer.text}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizResult;
