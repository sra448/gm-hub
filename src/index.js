import React, { useState, useReducer } from "react";
import { render } from "react-dom";

import { useRecordList } from "./helpers";

const defaultPlayer = {
  name: "foo",
  ac: "",
  hp: ""
};

const Player = ({ name, ac, hp, isExpanded, expand, onChange, onRemove }) => {
  return !isExpanded ? (
    <div onClick={expand}>
      <div>{name}</div>
      <div>{ac}</div>
      <div>{hp}</div>
    </div>
  ) : (
    <div>
      <input value={name} onChange={e => onChange("name", e.target.value)} />
      <input value={ac} onChange={e => onChange("ac", e.target.value)} />
      <input value={hp} onChange={e => onChange("hp", e.target.value)} />
      <button onClick={onRemove}>remove</button>
    </div>
  );
};

const Players = ({ players, onCreate, onChange, onRemove }) => {
  const [expandedPlayerId, setExpandedPlayerId] = useState();

  return (
    <div>
      <h2>Players</h2>
      <ul>
        {players.map(player => (
          <li key={player.uid}>
            <Player
              {...player}
              isExpanded={expandedPlayerId === player.uid}
              expand={() => setExpandedPlayerId(player.uid)}
              onChange={(prop, value) => onChange(player, prop, value)}
              onRemove={() => onRemove(player)}
            />
          </li>
        ))}
      </ul>
      <button onClick={onCreate}>add player</button>
    </div>
  );
};

const Main = () => {
  const [players, addPlayer, setPlayer, removePlayer] = useRecordList([]);

  return (
    <div>
      <h1>GM Hub</h1>
      <Players
        players={players}
        onCreate={() => addPlayer(defaultPlayer)}
        onChange={setPlayer}
        onRemove={removePlayer}
      />
    </div>
  );
};

render(<Main />, document.getElementById("main"));
