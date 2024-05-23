import { Quiz } from './types';

export const initialQuizzes: Quiz[] = [
  {
    id: '1',
    name: 'General Knowledge',
    questions: [
        {
        id: '10001',
        text: 'What is the capital of France?',
        answers: [
          { text: 'Paris', isCorrect: true },
          { text: 'London', isCorrect: false },
          { text: 'Berlin', isCorrect: false },
          { text: 'Madrid', isCorrect: false },
        ],
      },
        {
        id: '10002',
        text: 'What is 2 + 2?',
        answers: [
          { text: '3', isCorrect: false },
          { text: '4', isCorrect: true },
          { text: '5', isCorrect: false },
          { text: '6', isCorrect: false },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Programming',
    questions: [
        {
        id: '20001',
        text: 'What does HTML stand for?',
        answers: [
          { text: 'Hyper Text Markup Language', isCorrect: true },
          { text: 'Home Tool Markup Language', isCorrect: false },
          { text: 'Hyperlinks and Text Markup Language', isCorrect: false },
          { text: 'Hyperlinking Text Marking Language', isCorrect: false },
        ],
      },
        {
        id: '2002',
        text: 'Which language is used for styling web pages?',
        answers: [
          { text: 'HTML', isCorrect: false },
          { text: 'JQuery', isCorrect: false },
          { text: 'CSS', isCorrect: true },
          { text: 'XML', isCorrect: false },
        ],
      },
    ],
  },
];