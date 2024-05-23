import { initialQuizzes } from './initialQuiz';
import { Quiz } from './types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const initializeQuizzes = () => {
  const quizzes = localStorage.getItem('quizzes');
  if (!quizzes) {
    localStorage.setItem('quizzes', JSON.stringify(initialQuizzes));
  }
};

initializeQuizzes();

export const getQuizzes = async (): Promise<Quiz[]> => {
  await delay(500);
  return JSON.parse(localStorage.getItem('quizzes') || '[]');
};

export const saveQuiz = async (quiz: Quiz): Promise<void> => {
  await delay(500);
  const quizzes: Quiz[] = JSON.parse(localStorage.getItem('quizzes') || '[]');
  if (quiz.id) {
    const index = quizzes.findIndex(q => q.id === quiz.id);
    quizzes[index] = quiz;
  } else {
    quiz.id = Date.now().toString();
    quizzes.push(quiz);
  }
  localStorage.setItem('quizzes', JSON.stringify(quizzes));
};

export const deleteQuiz = async (id: string): Promise<void> => {
  await delay(500);
  const quizzes: Quiz[] = JSON.parse(localStorage.getItem('quizzes') || '[]');
  const updatedQuizzes = quizzes.filter(q => q.id !== id);
  localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
};