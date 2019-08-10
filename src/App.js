import React from 'react';
import './App.scss';
import Container from './components/Container';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Employee Directory</h1>
      </header>
      <section>
        <Container />
      </section>
    </div>
  );
}

export default App;
