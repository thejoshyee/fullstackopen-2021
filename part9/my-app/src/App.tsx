import React from 'react';
import logo from './logo.svg';
import './App.css';


interface WelcomeProps {
  name: string;
}

const Welcome = (props: WelcomeProps) => {
  return <h1>Hello, {props.name}</h1>;
};

const Welcome2 = ({ name }: { name: string }) => (
  <h1>Hello, {name}</h1>
);

const element = <Welcome name="Mowg" />;

const element2 = <Welcome name="Mowgy" />;


function App() {
  return (
    <div className="App">
        {element}
        {element2}
    </div>
  );
}




export default App;
