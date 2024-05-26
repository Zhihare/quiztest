import { getRandomGradient } from "../components/Service/generateRandomGradient";

export const quizData = {
  id: '1',
  name: 'React Quiz',
  timeLimit: 600,
  pointsPerAnswer: 10,
  color: getRandomGradient(),
  questions: [
    {
      id: '1',
      text: 'What is React?',
      answers: [
        { text: 'A JavaScript library for building user interfaces', isCorrect: true },
        { text: 'A programming language', isCorrect: false },
        { text: 'A type of database', isCorrect: false },
        { text: 'A framework for backend development', isCorrect: false },
      ],
    },
    {
      id: '2',
      text: 'Who maintains React?',
      answers: [
        { text: 'Google', isCorrect: false },
        { text: 'Facebook', isCorrect: true },
        { text: 'Microsoft', isCorrect: false },
        { text: 'Apple', isCorrect: false },
      ],
    },
    {
      id: '3',
      text: 'Which of the following are hooks in React?',
      answers: [
        { text: 'useState', isCorrect: true },
        { text: 'useEffect', isCorrect: true },
        { text: 'useRequest', isCorrect: false },
        { text: 'useFetch', isCorrect: false },
      ],
    },
    {
      id: '4',
      text: 'How do you create a functional component in React?',
      answers: [
        { text: 'function MyComponent() {}', isCorrect: true },
        { text: 'class MyComponent extends React.Component {}', isCorrect: false },
        { text: 'const MyComponent = () => {}', isCorrect: true },
        { text: 'new MyComponent()', isCorrect: false },
      ],
    },
    {
      id: '5',
      text: 'What is JSX?',
      answers: [
        { text: 'A syntax extension for JavaScript', isCorrect: true },
        { text: 'A way to write HTML in JavaScript', isCorrect: true },
        { text: 'A type of database query', isCorrect: false },
        { text: 'A JavaScript library', isCorrect: false },
      ],
    },
    {
      id: '6',
      text: 'How do you pass data to a child component?',
      answers: [
        { text: 'Using props', isCorrect: true },
        { text: 'Using state', isCorrect: false },
        { text: 'Using context', isCorrect: false },
        { text: 'Using refs', isCorrect: false },
      ],
    },
    {
      id: '7',
      text: 'Which method in a React class component is used to handle side effects?',
      answers: [
        { text: 'componentDidMount', isCorrect: true },
        { text: 'render', isCorrect: false },
        { text: 'constructor', isCorrect: false },
        { text: 'getDerivedStateFromProps', isCorrect: false },
      ],
    },
    {
      id: '8',
      text: 'What is the use of useEffect hook?',
      answers: [
        { text: 'To handle side effects in functional components', isCorrect: true },
        { text: 'To manage state in functional components', isCorrect: false },
        { text: 'To create context in functional components', isCorrect: false },
        { text: 'To fetch data in functional components', isCorrect: true },
      ],
    },
    {
      id: '9',
      text: 'How do you update the state in a functional component?',
      answers: [
        { text: 'Using setState', isCorrect: false },
        { text: 'Using this.setState', isCorrect: false },
        { text: 'Using useState hook', isCorrect: true },
        { text: 'Using useReducer hook', isCorrect: true },
      ],
    },
    {
      id: '10',
      text: 'What is the virtual DOM?',
      answers: [
        { text: 'A copy of the real DOM that is kept in memory', isCorrect: true },
        { text: 'A method to directly manipulate the real DOM', isCorrect: false },
        { text: 'A feature to improve CSS performance', isCorrect: false },
        { text: 'A way to handle backend operations', isCorrect: false },
      ],
    },
  ],
};

