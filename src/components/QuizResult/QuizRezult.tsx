import React from 'react';

const QuizResult: React.FC<{ score: number, total: number, onRetake: () => void }> = ({ score, total, onRetake }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Quiz Result</h1>
      <p>You scored {score} out of {total}.</p>
      <button onClick={onRetake} className="bg-blue-500 text-white px-2 py-1 mt-2">Retake Quiz</button>
    </div>
  );
};

export default QuizResult;
