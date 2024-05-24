import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Quiz, Question, Answer } from '../../redax/types';
import { getQuizzes, saveQuiz } from '../../redax/api';

const QuizForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<Quiz>({
    id: '',
    name: '',
    timeLimit: undefined, 
    pointsPerAnswer: undefined, 
    questions: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const quizzes = await getQuizzes();
      if (id && quizzes.length > 0) {
        const currentQuiz = quizzes.find(q => q.id === id);
        if (currentQuiz) {
          setQuiz(currentQuiz);
        }
      }
    };
    fetchData();
  }, [id]);

  const handleSave = async () => {
    await saveQuiz(quiz);
    navigate('/');
  };

  const handleQuestionChange = (index: number, value: Partial<Question>) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], ...value };
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleAnswerChange = (questionIndex: number, answerIndex: number, value: Partial<Answer>) => {
    const updatedQuestions = [...quiz.questions];
    const updatedAnswers = [...updatedQuestions[questionIndex].answers];
    updatedAnswers[answerIndex] = { ...updatedAnswers[answerIndex], ...value };
    updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], answers: updatedAnswers };
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, { id: Date.now().toString(), text: '', answers: [] }],
    });
  };

  const deleteQuestion = (index: number) => {
    const updatedQuestions = quiz.questions.filter((q, i) => i !== index);
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const addAnswer = (questionIndex: number) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      answers: [...updatedQuestions[questionIndex].answers, { text: '', isCorrect: false }],
    };
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const deleteAnswer = (questionIndex: number, answerIndex: number) => {
    const updatedQuestions = [...quiz.questions];
    const updatedAnswers = updatedQuestions[questionIndex].answers.filter((a, i) => i !== answerIndex);
    updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], answers: updatedAnswers };
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Quiz' : 'Create Quiz'}</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Quiz Name:</label>
        <input
          type="text"
          value={quiz.name}
          onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}
          className="w-full px-3 py-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Time Limit (seconds):</label>
        <input
          type="number"
          value={quiz.timeLimit}
          onChange={(e) => setQuiz({ ...quiz, timeLimit: +e.target.value })}
          className="w-full px-3 py-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Points per Correct Answer:</label>
        <input
          type="number"
          value={quiz.pointsPerAnswer}
          onChange={(e) => setQuiz({ ...quiz, pointsPerAnswer: +e.target.value })}
          className="w-full px-3 py-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Questions:</h3>
        {quiz.questions.map((question, questionIndex) => (
          <div key={question.id} className="mb-4 p-2 border border-gray-300 rounded">
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Question Text:</label>
              <input
                type="text"
                value={question.text}
                onChange={(e) => handleQuestionChange(questionIndex, { text: e.target.value })}
                className="w-full px-3 py-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <h4 className="text-md font-medium mb-2">Answers:</h4>
            {question.answers.map((answer, answerIndex) => (
              <div key={answerIndex} className="mb-2 flex items-center">
                <input
                  type="checkbox"
                  checked={answer.isCorrect}
                  onChange={(e) => handleAnswerChange(questionIndex, answerIndex, { isCorrect: e.target.checked })}
                  className="mr-2"
                />
                <input
                  type="text"
                  value={answer.text}
                  onChange={(e) => handleAnswerChange(questionIndex, answerIndex, { text: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none"
                />
                <button onClick={() => deleteAnswer(questionIndex, answerIndex)} className="text-xs px-3 py-1  bg-red-500 text-white rounded">
                  Delete Answer
                </button>
              </div>
            ))}
            <button onClick={() => addAnswer(questionIndex)} className="px-3 py-1 bg-blue-500 text-white rounded mr-2">
              Add Answer
            </button>
            <button onClick={() => deleteQuestion(questionIndex)} className="px-3 py-1  bg-red-500 text-white rounded">
              Delete Question
            </button>
          </div>
        ))}
        <button onClick={addQuestion} className="px-3 py-1 bg-blue-500 text-white rounded">
          Add Question
        </button>
      </div>
      <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded">
        Save
      </button>
    </div>
  );
};

export default QuizForm;
