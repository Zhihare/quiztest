import React from 'react';
import {Route, Routes} from 'react-router-dom';
import QuizList from './components/QuizList/QuizList';
import QuizForm from './components/QuizForm/QuizForm';
import Quiz from './components/Quiz/Quiz';
import QuizResult from './components/QuizResult/QuizRezult';


const App: React.FC = () => {
  return (
   
      <div className="container mx-auto p-4">
     
        <Routes>
          <Route path="/" element={<QuizList />} />
          <Route path="/form/:id" element={<QuizForm />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/result/:id" element={<QuizResult />} />
        </Routes>
      </div>
  
  );
};

export default App;
