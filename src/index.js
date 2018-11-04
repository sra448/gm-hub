import React, { useState, Fragment } from 'react';
import { render } from 'react-dom';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import GroupIcon from '@material-ui/icons/Group';
import GavelIcon from '@material-ui/icons/Gavel';

import { useRecordList } from './helpers';
import Players from './players';
import Fight from './fight';

import './style.css';

const initPlayers = JSON.parse(localStorage.getItem('players') || '[]');

const onPlayersChange = players => {
  localStorage.setItem('players', JSON.stringify(players));
};

const Main = () => {
  const [navIndex, setNavIndex] = useState(0);
  const [players, addPlayer, removePlayer, setPlayer] = useRecordList(
    initPlayers,
    onPlayersChange,
  );

  const changeNavIndex = (_event, value) => {
    setNavIndex(value);
  };

  return (
    <Fragment>
      <div className="header">
        <h1>GM Hub</h1>
      </div>
      <div className="body">
        {navIndex === 0 ? (
          <Players
            players={players}
            addPlayer={addPlayer}
            setPlayer={setPlayer}
            removePlayer={removePlayer}
          />
        ) : null}
        {navIndex === 1 ? <Fight players={players} /> : null}
      </div>
      <div className="footer">
        <BottomNavigation value={navIndex} onChange={changeNavIndex} showLabels>
          <BottomNavigationAction label="Players" icon={<GroupIcon />} />
          <BottomNavigationAction label="Fight" icon={<GavelIcon />} />
        </BottomNavigation>
      </div>
    </Fragment>
  );
};

render(<Main />, document.getElementById('main'));
