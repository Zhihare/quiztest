import { Quiz } from '../../redax/types';

const calculateScore = (
  quiz: Quiz,
  selectedAnswers: Map<number, Set<number>>,
  score: number
): number => {
  let totalScore = 0;
  const scoreAnswers = score ? score : 1;
  
  quiz.questions.forEach((question, questionIndex) => {
    const correctAnswers = question.answers
      .map((answer, answerIndex) => (answer.isCorrect ? answerIndex : null))
      .filter((index) => index !== null) as number[];

    const selectedAnswersForQuestion = Array.from(
      selectedAnswers.get(questionIndex) || new Set<number>()
    );
   
    const correctAnswersSet = new Set(correctAnswers);
    let questionScore = 0;

    const correctSelectedCount = selectedAnswersForQuestion.filter((ans) =>
      correctAnswersSet.has(ans)
    ).length;

    const incorrectSelectedCount = selectedAnswersForQuestion.length - correctSelectedCount;

    if (arraysEqual(correctAnswers, selectedAnswersForQuestion)) {
      questionScore = scoreAnswers;
    } else if (correctSelectedCount > 0 && incorrectSelectedCount === 0) {
      
      questionScore = (correctSelectedCount / correctAnswers.length) * scoreAnswers;
    } else if (correctSelectedCount > 0 && incorrectSelectedCount > 0) {
      
      questionScore = ((correctSelectedCount / correctAnswers.length) - (incorrectSelectedCount / question.answers.length)) * scoreAnswers;
      if (questionScore < 0) questionScore = 0; 
    }

    totalScore += questionScore;
  });

  return totalScore;
};

const arraysEqual = (a: number[], b: number[]): boolean => {
  return JSON.stringify(a.sort()) === JSON.stringify(b.sort());
};

export default calculateScore;
