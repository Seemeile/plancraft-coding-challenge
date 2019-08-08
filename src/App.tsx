import React from 'react';
import './App.css';
import SpaceCard from './common/card/SpaceCard';
import SpaceShipSelector from './tree/SpaceShipSelector';

//<header className="App-header">

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <SpaceCard title="select ship modules">
          <SpaceShipSelector/>
        </SpaceCard>
      </header>
    </div>
  );
}

export default App;
