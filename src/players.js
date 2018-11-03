import React, { useState } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Player = props => {
  const { name, ac, hp, expanded } = props;
  const { toggleExpanded, onChange, onRemove } = props;

  return (
    <ExpansionPanel expanded={expanded} onChange={toggleExpanded}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div>{name}</div>
        <div>{ac}</div>
        <div>{hp}</div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <input value={name} onChange={e => onChange('name', e.target.value)} />
        <input value={ac} onChange={e => onChange('ac', e.target.value)} />
        <input value={hp} onChange={e => onChange('hp', e.target.value)} />
        <button onClick={onRemove}>remove</button>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const Players = ({ players, onCreate, onChange, onRemove }) => {
  const [expandedPlayerId, setExpandedPlayerId] = useState();

  return (
    <div>
      <h2>Players</h2>
      <div>
        {players.map(player => (
          <Player
            key={player.id}
            {...player}
            expanded={expandedPlayerId === player.id}
            toggleExpanded={() =>
              setExpandedPlayerId(
                player.id !== expandedPlayerId ? player.id : null,
              )
            }
            onChange={(prop, value) => onChange(player, prop, value)}
            onRemove={() => onRemove(player)}
          />
        ))}
      </div>
      <button onClick={onCreate}>add player</button>
    </div>
  );
};

export default Players;
