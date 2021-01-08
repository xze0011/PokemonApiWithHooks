import React, { useState ,useEffect} from 'react';

import './CharPicker.css';

const CharPicker = props => {
  const [characters,setCharacters] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  
  useEffect(()=>{
    setIsLoading(true)
    fetch('https://pokeapi.co/api/v2/pokemon/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch.');
        }
        return response.json();
      })
      .then(charData => {
        const selectedCharacters = charData.results.slice(0, 20);
        setCharacters(selectedCharacters.map((char,index)=>({
          name: char.name,
          id: index + 1
        })));
        setIsLoading(false);
      })  
      .catch(err => {
        setIsLoading(false)
      });
  },[])

    let content = <p>Loading characters...</p>;

    if (
      !isLoading &&
      characters &&
      characters.length > 0
    ) {
      content = (
        <select
          onChange={props.onCharSelect}
          value={props.selectedChar}
          className={props.side}
        >
          {characters.map(char => (
            <option key={char.id} value={char.id}>
              {char.name}
            </option>
          ))}
        </select>
      );
    } else if (
      !isLoading &&
      (!characters || characters.length === 0)
    ) {
      content = <p>Could not fetch any data.</p>;
    }
    return content;
}

export default CharPicker;
