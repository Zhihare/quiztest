
import { Quiz} from '../../redax/types';

const calculateScore = (
  quiz: Quiz,
  selectedAnswers: Map<number, Set<number>>
): number => {
  let totalScore = 0;

  quiz.questions.forEach((question, questionIndex) => {
    const correctAnswers = question.answers
      .map((answer, answerIndex) => (answer.isCorrect ? answerIndex : null))
      .filter((index) => index !== null) as number[];

    const selectedAnswersForQuestion = Array.from(
      selectedAnswers.get(questionIndex) || new Set<number>()
    );

    const correctAnswersSet = new Set(correctAnswers);

    let questionScore = 0;

    if (arraysEqual(correctAnswers, selectedAnswersForQuestion)) {
      questionScore = 1;
    } else if (
      selectedAnswersForQuestion.some((ans) => correctAnswersSet.has(ans))
    ) {
      const partialCorrectCount = selectedAnswersForQuestion.filter((ans) =>
        correctAnswersSet.has(ans)
      ).length;
      questionScore = partialCorrectCount / correctAnswers.length;
    }

    totalScore += questionScore;
  });

  return totalScore;
};

const arraysEqual = (a: number[], b: number[]): boolean => {
  return JSON.stringify(a.sort()) === JSON.stringify(b.sort());
};

export default calculateScore;
