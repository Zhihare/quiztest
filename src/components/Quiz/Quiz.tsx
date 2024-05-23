import React, { useState } from 'react';
import { Quiz as QuizType, Question } from '../../redax/types';

const Quiz: React.FC<{ quiz: QuizType, onFinish: (score: number) => void }> = ({ quiz, onFinish }) => {
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswer = (qIndex: number, aIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = aIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let score = 0;
    quiz.questions.forEach((q, qIndex) => {
      if (q.answers[answers[qIndex]]?.isCorrect) {
        score++;
      }
    });
    onFinish(score);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">{quiz.name}</h1>
      {quiz.questions.map((q, qIndex) => (
        <div key={qIndex} className="border p-2 my-2">
          <h2>{q.text}</h2>
          {q.answers.map((a, aIndex) => (
            <div key={aIndex}>
              <label>
                <input type="radio" name={`question-${qIndex}`} onChange={() => handleAnswer(qIndex, aIndex)} />
                {a.text}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} className="bg-green-500 text-white px-2 py-1 mt-2">Submit</button>
    </div>
  );
};

export default Quiz;
