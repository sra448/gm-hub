import React from 'react';
import { render } from 'react-dom';

import { useRecordList, uuid } from './helpers';
import Players from './players';

const defaultPlayer = {
  name: 'foo',
  ac: '',
  hp: '',
};

const Main = () => {
  const [players, addPlayer, setPlayer, removePlayer] = useRecordList([]);

  return (
    <div>
      <h1>GM Hub</h1>
      <Players
        players={players}
        onCreate={() => addPlayer({ id: uuid(), ...defaultPlayer })}
        onChange={setPlayer}
        onRemove={removePlayer}
      />
    </div>
  );
};

render(<Main />, document.getElementById('main'));
