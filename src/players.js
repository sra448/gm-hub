import React, { useState } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
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
        <div>{name || 'New Char'}</div>
        <div>{ac}</div>
        <div>{hp}</div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <input
          value={name}
          onChange={e => onChange('name', e.target.value)}
          autoFocus
        />
        <input value={ac} onChange={e => onChange('ac', e.target.value)} />
        <input value={hp} onChange={e => onChange('hp', e.target.value)} />
        <button onClick={onRemove}>remove</button>
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
    setExpandedPlayerId(id);
  };

  return (
    <div>
      <h2>Players</h2>
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
      <button onClick={onCreate}>add player</button>
    </div>
  );
};

export default Players;
