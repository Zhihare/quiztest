# React Quiz Application

This is a React-based quiz application that allows users to take quizzes, view their scores, and manage quizzes through a CRUD interface. The application supports functionalities such as time-limited quizzes, multiple correct answers, and persistent storage using `localStorage`.

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Components](#components)
5. [Running the App](#running-the-app)


## Features

- **Quiz Management**: Create, read, update, and delete quizzes.
- **Time-Limited Quizzes**: Set a time limit for the entire quiz.
- **Multiple Correct Answers**: Support for questions with multiple correct answers.
- **Score Calculation**: Calculate and display the score based on correct answers.
- **Persistent Storage**: Store quizzes and user progress in `localStorage`.

## Installation

1. Clone the repository:
   ```shell
   git clone https://github.com/yourusername/react-quiz-app.git
   cd react-quiz-app
   ```

2. Install dependencies:
   ```shell
    npm install
   ```
   
4. Start the development server:
   ```shell
   npm run start
   ```

   
## Usage
- **Create a Quiz**: Navigate to the quiz creation form to add new quizzes with multiple questions and answers.
- **Take a Quiz**: Start a quiz and answer the questions within the time limit.
- **View Results**: After completing the quiz, view your score and the correct answers.
- **Edit a Quiz**: Modify existing quizzes and their questions/answers.
- **Delete a Quiz**: Remove quizzes that are no longer needed.

## Components
- **QuizList**: Displays a list of quizzes with options to start, edit, or delete.
- **QuizForm**: Form for creating or editing quizzes.
- **Quiz**: Component to take the quiz, handle timing, and calculate scores.
-**Result**: Displays the quiz results after completion.


## Running the App

1. Ensure you have the latest Node.js installed.
2. Run the app locally using:
```shell
npm start
```
3. Open http://localhost:3000 in your browser to view the app.
