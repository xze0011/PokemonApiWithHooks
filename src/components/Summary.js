import React from 'react';

import './Summary.css';

const Summary = props => {
  return (
    <div className="summary">
      <h1>{props.name}</h1>
      <p>
        Height: <span className="summary__output">{props.height}</span>
      </p>
      <p>
        Base Experience: <span className="summary__output">{props.baseExperience}</span>
      </p>
      <p>
        Abilities:
      </p>
      {props.abilities.map((ability, key) => {
        return (
          <div key={key} className={`summary__abilities_${key}`}
                style={{display: 'inline-block', margin: '0 15px'}}> 
            <div>{ability.ability.name}</div>
            <div>{ability.ability.is_hidden ? 'Hidden' : 'Not Hidden'}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Summary;