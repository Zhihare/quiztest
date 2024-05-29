import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Quiz as QuizType, Question } from '../../redax/types';
import { getQuizzes } from '../../redax/api';
import calculateScore from './CalculateScore';

const Quiz: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<QuizType | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Map<number, Set<number>>>(new Map());
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    const fetchQuiz = async () => {
      const quizzes = await getQuizzes();
      const foundQuiz = quizzes.find(q => q.id === id);
      if (foundQuiz) {
        setQuiz(foundQuiz);
        setTimeLeft(foundQuiz.timeLimit ? foundQuiz.timeLimit : 20);
        initializeSelectedAnswers(foundQuiz.questions);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleNextQuestion = useCallback(() => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1 && timeLeft && timeLeft > 0) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if ((quiz && currentQuestionIndex === quiz.questions.length - 1) || (quiz && timeLeft === 0)) {
      const finalScore = calculateScore(quiz, selectedAnswers, quiz.pointsPerAnswer);
      const selectedAnswersArray = Array.from(selectedAnswers.entries());
      navigate(`/result/${id}`, { state: { score: finalScore, total: quiz.questions.length, selectedAnswers: selectedAnswersArray } });
    }
  }, [currentQuestionIndex, quiz, id, navigate, timeLeft, selectedAnswers]);

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const newSelectedAnswers = new Map(prevSelectedAnswers);
      const selected = newSelectedAnswers.get(questionIndex) || new Set<number>();
      if (selected.has(answerIndex)) {
        selected.delete(answerIndex);
      } else {
        selected.add(answerIndex);
      }
      newSelectedAnswers.set(questionIndex, selected);
      return newSelectedAnswers;
    });
  };

  const initializeSelectedAnswers = (questions: Question[]) => {
    const initialMap = new Map<number, Set<number>>();
    questions.forEach((_, questionIndex) => {
      initialMap.set(questionIndex, new Set<number>());
    });
    setSelectedAnswers(initialMap);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft && timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        handleNextQuestion();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, handleNextQuestion]);

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white shadow-md rounded-lg" style={{ background: quiz.color }}>
      <h2 className="text-4xl font-bold text-center mb-4 p-2 bg-blue-200 rounded-lg">{quiz.name}</h2>
      <div className="mb-4 p-4 bg-gray-100 rounded-lg">
        <p className="text-md font-extralight text-sm mb-4">Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
        <h3 className="text-4xl text-center font-semibold mb-2">{currentQuestion.text}</h3>
        <h4 className="text-md font-medium mb-2">Answers:</h4>
        {currentQuestion.answers.map((answer, answerIndex) => (
          <div key={answerIndex} className="mb-2 flex items-center bg-white border p-2 rounded-lg">
            <input
              type="checkbox"
              checked={selectedAnswers.get(currentQuestionIndex)?.has(answerIndex) || false}
              onChange={() => handleAnswerChange(currentQuestionIndex, answerIndex)}
              className="mr-2"
            />
            <p>{answer.text}</p>
          </div>
        ))}
      </div>
      <div className="mb-4 flex justify-between items-center">
        <button onClick={handleNextQuestion} className="px-4 py-2 bg-blue-500 text-white rounded">
          {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Finish'}
        </button>
        <p className=" bg-white text-red-500 px-4 py-2 rounded-lg">Time left: {formatTime(timeLeft)}</p>
      </div>
    </div>
  );
};

export default Quiz;
