export interface Answer {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  answers: Answer[];
}

export interface Quiz {
  id: string;
  name: string;
  questions: Question[];
}