import React from 'react';
import { render } from 'react-dom';

import { useRecordList } from './helpers';
import Players from './players';
import Fight from './fight';

const initPlayers = JSON.parse(localStorage.getItem('players') || '[]');

const onPlayersChange = players => {
  localStorage.setItem('players', JSON.stringify(players));
};

const Main = () => {
  const [players, addPlayer, removePlayer, setPlayer] = useRecordList(
    initPlayers,
    onPlayersChange,
  );

  return (
    <div>
      <h1>GM Hub</h1>
      <Players
        players={players}
        addPlayer={addPlayer}
        setPlayer={setPlayer}
        removePlayer={removePlayer}
      />
      <Fight />
    </div>
  );
};

render(<Main />, document.getElementById('main'));
