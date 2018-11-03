import React from 'react';
import { render } from 'react-dom';

import { useRecordList } from './helpers';
import Players from './players';

const Main = () => {
  const [players, addPlayer, setPlayer, removePlayer] = useRecordList([]);

  return (
    <div>
      <h1>GM Hub</h1>
      <Players
        players={players}
        addPlayer={addPlayer}
        setPlayer={setPlayer}
        removePlayer={removePlayer}
      />
    </div>
  );
};

render(<Main />, document.getElementById('main'));
