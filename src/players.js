import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { uuid } from './helpers';

const defaultPlayer = {
  name: '',
  ac: '',
  hp: '',
};

const Player = props => {
  const { name, ac, hp, expanded } = props;
  const { toggleExpanded, onChange, onRemove } = props;

  return (
    <ExpansionPanel expanded={expanded} onChange={toggleExpanded}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{name || 'New Char'}</Typography>
        <Typography>{ac}</Typography>
        <Typography>{hp}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <form>
          <TextField
            label="name"
            value={name}
            onChange={e => onChange('name', e.target.value)}
            autoFocus
            variant="filled"
          />
          <TextField
            label="ac"
            value={ac}
            variant="filled"
            onChange={e => onChange('ac', e.target.value)}
          />
          <TextField
            label="hp"
            value={hp}
            variant="filled"
            onChange={e => onChange('hp', e.target.value)}
          />
          <Button onClick={onRemove}>remove</Button>
        </form>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const Players = ({ players, addPlayer, setPlayer, removePlayer }) => {
  const [expandedPlayerId, setExpandedPlayerId] = useState();

  const toggleExpanded = id => () => {
    setExpandedPlayerId(id !== expandedPlayerId ? id : null);
  };

  const onCreate = () => {
    const id = uuid();
    addPlayer({ id, ...defaultPlayer });
    requestAnimationFrame(() => {
      setExpandedPlayerId(id);
    });
  };

  return (
    <div>
      <Typography variant="h6">Players</Typography>
      <div>
        {players.map(player => (
          <Player
            key={player.id}
            {...player}
            expanded={expandedPlayerId === player.id}
            toggleExpanded={toggleExpanded(player.id)}
            onChange={(prop, value) => setPlayer(player, prop, value)}
            onRemove={() => removePlayer(player)}
          />
        ))}
      </div>
      <div className="big-padding center">
        <Button variant="contained" onClick={onCreate}>
          Add Player
        </Button>
      </div>
    </div>
  );
};

export default Players;
