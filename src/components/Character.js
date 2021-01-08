import React, { useEffect,useState } from 'react';

import Summary from './Summary';

const Character = props => {
  const [loadedCharacter,setLoadedCharacter] = useState({})
  const [isLoading,setIsLoading] = useState(false) 

  // componentDidUpdate(prevProps) {
  //   console.log('Component did update');
  //   if (prevProps.selectedChar !== this.props.selectedChar) {
  //     this.fetchData();
  //   }
  // }
  
  // componentWillUnmount() {
  //   console.log('Too soon...');
  // }

  useEffect(()=>{
    fetchData();
    return()=>{
      console.log('Too soon...');
    }
  },[props.selectedChar])

  // useEffect(()=>{
  //   fetchData()
  // },[])

  const fetchData = () => {
    console.log(
      'Sending Http request for new character with id ' +
        props.selectedChar
    );
    setIsLoading(true);
      fetch(`https://pokeapi.co/api/v2/pokemon/${props.selectedChar}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not fetch person!');
        }
        return response.json();
      })
      .then(charData => {
        console.log(charData)
        const loadedCharacter = {
          id: props.selectedChar,
          name: charData.name,
          height: charData.height,
          abilities: charData.abilities,
          baseExperience: charData.base_experience
        };
        setLoadedCharacter(loadedCharacter);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

    let content = <p>Loading Character...</p>;

    if (!isLoading && loadedCharacter.id) {
      content = (
        <Summary
          name={loadedCharacter.name}
          gender={loadedCharacter.gender}
          height={loadedCharacter.height}
          baseExperience={loadedCharacter.baseExperience}
          abilities={loadedCharacter.abilities}

        />
      );
    } else if (!isLoading && !loadedCharacter.id) {
      content = <p>Failed to fetch character.</p>;
    }
    return content;
}
// shouldComponentUpdate(nextProps, nextState) {
//   console.log('shouldComponentUpdate');
//   return (
//     nextProps.selectedChar !== this.props.selectedChar ||
//     nextState.loadedCharacter.id !== this.state.loadedCharacter.id ||
//     nextState.isLoading !== this.state.isLoading
//   );
// }

export default React.memo(Character);