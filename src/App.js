import React from 'react';
import RenderBarChart from './components/RenderBarChart';
import AuthForm from "./components/AuthComponent";


import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <RenderBarChart />
      <AuthForm />
    </div>
  );
};

export default App;
