import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Quiz as QuizType, Question } from '../../redax/types';
import { getQuizzes } from '../../redax/api';
import calculateScore from './CalculateScore'; // Импорт функции calculateScore

const Quiz: React.FC = () => {
  const { id } = useParams();
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
        initializeSelectedAnswers(foundQuiz.questions);
      }
    };

    fetchQuiz();
  }, [id]);
    
      const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < quiz!.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const finalScore = calculateScore(quiz!, selectedAnswers);
      navigate(`/result/${id}`, { state: { score: finalScore, total: quiz!.questions.length } });
    }
  }, [currentQuestionIndex, quiz, id, navigate, selectedAnswers]);


  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, handleNextQuestion]);

  useEffect(() => {
    setTimeLeft(20);
    resetSelectedAnswers();
  }, [currentQuestionIndex]);

    
  const initializeSelectedAnswers = (questions: Question[]) => {
    const initialMap = new Map<number, Set<number>>();
    questions.forEach((_, questionIndex) => {
      initialMap.set(questionIndex, new Set<number>());
    });
    setSelectedAnswers(initialMap);
  };

    
const resetSelectedAnswers = useCallback(() => {
  const newSelectedAnswers = new Map(selectedAnswers);
  newSelectedAnswers.set(currentQuestionIndex, new Set<number>());
  setSelectedAnswers(newSelectedAnswers);
}, [currentQuestionIndex, selectedAnswers]);


    
    
  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    const newSelectedAnswers = new Map(selectedAnswers);
    const selected = newSelectedAnswers.get(questionIndex) || new Set<number>();
    if (selected.has(answerIndex)) {
      selected.delete(answerIndex);
    } else {
      selected.add(answerIndex);
    }
    newSelectedAnswers.set(questionIndex, selected);
    setSelectedAnswers(newSelectedAnswers);
  };


  if (!quiz) {
    return <div>Loading...</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const correctAnswers = currentQuestion.answers
    .map((answer, answerIndex) => answer.isCorrect ? answerIndex : null)
    .filter(index => index !== null) as number[];
  const selectedAnswersForQuestion = Array.from(selectedAnswers.get(currentQuestionIndex) || new Set<number>());

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
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
        <p className="bg-red-500 text-white px-4 py-2 rounded-lg">Time left: {timeLeft} seconds</p>
      </div>
      <div className="mt-4 p-4 bg-gray-200 rounded-lg">
        <h4 className="text-md font-medium mb-2">Debug Info:</h4>
        <p>Correct Answers for Current Question: {JSON.stringify(correctAnswers)}</p>
        <p>Selected Answers for Current Question: {JSON.stringify(selectedAnswersForQuestion)}</p>
      </div>
    </div>
  );
};

export default Quiz;
