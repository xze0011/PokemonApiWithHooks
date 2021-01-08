import React,{useState} from 'react';

import CharPicker from './components/CharPicker';
import Character from './components/Character';

const App = props => {
  const [selectedCharacter,setSelectedCharacter] = useState(1)
  const [side,setSide] = useState('red')
  const [destroyed,setDestroyed] = useState(false)

  const sideHandler = side => {
    setSide(side);
  };

  const charSelectHandler = event => {
    const charId = event.target.value;
    setSelectedCharacter(charId);
  };

  const destructionHandler = () => {
    setDestroyed(true);
  };
    let content = (
      <React.Fragment>
        <CharPicker
          side={side}
          selectedChar={selectedCharacter}
          onCharSelect={charSelectHandler}
        />
        <Character selectedChar={selectedCharacter} />
        <button onClick={sideHandler.bind(this, 'red')}>
          Red Light
        </button>
        <button onClick={sideHandler.bind(this, 'blue')}>Blue Light</button>
        {side === 'blue' && (
          <button onClick={destructionHandler}>DESTROY!</button>
        )}
      </React.Fragment>
    );

    if (destroyed) {
      content = <h1>Total destruction!</h1>;
    }
    return content;
}

export default App;
