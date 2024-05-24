

import { Quiz } from './types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getQuizzes = async (): Promise<Quiz[]> => {
  await delay(500);
  const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
  return quizzes;
};

export const getQuizById = async (id: string): Promise<Quiz | null> => {
  await delay(500);
  const quizzes: Quiz[] = JSON.parse(localStorage.getItem('quizzes') || '[]');
  const quiz = quizzes.find(q => q.id === id) || null;
  return quiz;
};

export const saveQuiz = async (quiz: Quiz): Promise<void> => {
  await delay(500);
  let quizzes: Quiz[] = JSON.parse(localStorage.getItem('quizzes') || '[]');

  const existingQuizIndex = quizzes.findIndex(q => q.id === quiz.id);
  if (existingQuizIndex !== -1) {
    quizzes[existingQuizIndex] = quiz;
  } else {
    quiz.id = Date.now().toString();
    quizzes.push(quiz);
  }

  localStorage.setItem('quizzes', JSON.stringify(quizzes));
};

export const deleteQuiz = async (id: string): Promise<void> => {
  await delay(500);
  let quizzes: Quiz[] = JSON.parse(localStorage.getItem('quizzes') || '[]');
  quizzes = quizzes.filter(q => q.id !== id);
  localStorage.setItem('quizzes', JSON.stringify(quizzes));
};

export const updateQuiz = async (quiz: Quiz): Promise<void> => {
    await delay(500);
    let quizzes: Quiz[] = JSON.parse(localStorage.getItem('quizzes') || '[]');
  const existingQuizIndex = quizzes.findIndex(q => q.id === quiz.id);
  if (existingQuizIndex !== -1) {
    quizzes[existingQuizIndex] = quiz;
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
  }
};
