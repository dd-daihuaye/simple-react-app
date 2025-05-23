import React from 'react';
import './App.css';
import Carousel from './Carousel';

function App() {
  const items = [
    'Card 1',
    'Card 2',
    'Card 3',
    'Card 4',
    'Card 5',
  ];

  return (
    <div className="App">
      <Carousel items={items.map((text) => <div>{text}</div>)} visibleCards={2} />
    </div>
  );
}

export default App;
