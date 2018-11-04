import React, { useState } from 'react';
import { render } from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Typography from '@material-ui/core/Typography';
import GroupIcon from '@material-ui/icons/GroupTwoTone';
import GavelIcon from '@material-ui/icons/GavelTwoTone';
import BookIcon from '@material-ui/icons/BookTwoTone';

import { useRecordList } from './helpers';
import Players from './players';
import Fight from './fight';

import './style.css';

const initPlayers = JSON.parse(localStorage.getItem('players') || '[]');

const onPlayersChange = players => {
  localStorage.setItem('players', JSON.stringify(players));
};

const theme = createMuiTheme({
  palette: {
    primary: { main: '#622296' },
  },
  typography: {
    useNextVariants: true,
  },
});

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
    <MuiThemeProvider theme={theme}>
      <div className="header">
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              GM Hub
            </Typography>
          </Toolbar>
        </AppBar>
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
        {navIndex === 2 ? <div>not yet implemented</div> : null}
      </div>
      <div className="footer">
        <BottomNavigation value={navIndex} onChange={changeNavIndex} showLabels>
          <BottomNavigationAction label="Players" icon={<GroupIcon />} />
          <BottomNavigationAction label="Fight" icon={<GavelIcon />} />
          <BottomNavigationAction label="Bestiary" icon={<BookIcon />} />
        </BottomNavigation>
      </div>
    </MuiThemeProvider>
  );
};

render(<Main />, document.getElementById('main'));
