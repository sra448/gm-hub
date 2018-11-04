import React, { useState, Fragment } from 'react';
import {
  concat,
  set,
  over,
  lensProp,
  sortBy,
  prop,
  repeat,
  drop,
  take,
  type,
} from 'ramda';

import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { useRecordList } from './helpers';

const Counter = ({ count, increment, decrement }) => (
  <div>
    <Button onClick={decrement}>
      <RemoveIcon />
    </Button>
    {count}
    <Button onClick={increment}>
      <AddIcon />
    </Button>
  </div>
);

const Opponent = ({ opponent, overOpponent }) => {
  return (
    <ListItem>
      <ListItemText>{opponent.name}</ListItemText>
      <ListItemSecondaryAction>
        <Counter
          count={opponent.count}
          increment={() => {
            overOpponent(opponent, over(lensProp('count'), c => c + 1));
          }}
          decrement={() => {
            overOpponent(
              opponent,
              over(lensProp('count'), c => Math.max(0, c - 1)),
            );
          }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const FightPreparation = ({ startInit }) => {
  const [name, setName] = useState('');
  const [opponents, addOpponent, _del, _set, overOpponent] = useRecordList([]);

  const opponentsCount = opponents.reduce((count, o) => o.count + count, 0);

  const onCurrentChange = e => setName(e.target.value);

  const onAddOpponent = () => {
    addOpponent({ name: name, count: 1 });
    setName('');
  };

  const onStartInit = () => {
    let i = 1;
    return startInit(
      opponents
        .reduce((acc, { count, ...opponent }) => {
          return [...acc, ...repeat(opponent, count)];
        }, [])
        .map(o => set(lensProp('id'), i++, o)),
    );
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Pick Opponents
      </Typography>

      <Paper>
        <div>
          <TextField value={name} onChange={onCurrentChange} />
          <Button onClick={onAddOpponent}>add</Button>
        </div>
        <List>
          {opponents.map(opponent => (
            <Fragment key={opponent.name}>
              <Opponent opponent={opponent} overOpponent={overOpponent} />
              <Divider />
            </Fragment>
          ))}
        </List>
      </Paper>

      <div className="big-padding center">
        <Button
          variant="contained"
          color="secondary"
          disabled={opponentsCount < 1}
          onClick={onStartInit}
        >
          Start Initiative
        </Button>
      </div>
    </div>
  );
};

const Initiative = ({ players, opponents, startFight }) => {
  const [playersWithInit, _add, _del, setPlayer] = useRecordList(players);
  const initSet = playersWithInit.reduce((acc, p) => acc && p.init, true);

  const onStartFight = () => {
    const fighters = concat(
      opponents.map(
        over(lensProp('init'), () => 8 + Math.ceil(Math.random() * 20)),
      ),
      playersWithInit.map(over(lensProp('init'), x => +x)),
    );
    startFight(sortBy(x => -x.init, fighters));
  };

  return (
    <div>
      {playersWithInit.map(char => (
        <TextField
          key={char.name}
          type="number"
          label={char.name}
          value={char.init || ''}
          onChange={e => setPlayer(char, 'init', e.target.value)}
        />
      ))}
      <div className="big-padding center">
        <Button
          variant="contained"
          color="secondary"
          disabled={!initSet}
          onClick={onStartFight}
        >
          Start Fight
        </Button>
      </div>
    </div>
  );
};

const BattleField = ({ fighters }) => {
  const [chars, _add, _del, setChar] = useRecordList(fighters);
  const [currentCharId, setCurrentCharId] = useState(0);
  const [roundId, setRoundId] = useState(1);
  const charsInOrder = [
    ...drop(currentCharId, chars),
    ...take(currentCharId, chars),
  ];

  const onNext = () => {
    if (currentCharId + 1 === chars.length) setRoundId(roundId + 1);
    setCurrentCharId((currentCharId + 1) % chars.length);
  };

  return (
    <div>
      <Typography variant="h6">Round {roundId}</Typography>
      <Paper>
        <List>
          {charsInOrder.map(char => (
            <Fragment key={char.id}>
              <ListItem>
                <ListItemIcon>
                  <Avatar>{type(char.id) === 'String' ? 'P' : char.id}</Avatar>
                </ListItemIcon>
                <ListItemText>{char.name}</ListItemText>
              </ListItem>
              <Divider />
            </Fragment>
          ))}
        </List>
      </Paper>
      <div className="big-padding center">
        <Button variant="contained" color="secondary" onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

// Main Component

const Fight = ({ players }) => {
  const [state, setState] = useState('prep');
  const [opponents, setOpponents] = useState();
  const [fighters, setFighters] = useState();

  const startInit = os => {
    setOpponents(os);
    setState('init');
  };

  const startFight = fs => {
    setFighters(fs);
    setState('fight');
  };

  if (state === 'prep') {
    return <FightPreparation startInit={startInit} />;
  } else if (state === 'init') {
    return (
      <Initiative
        players={players}
        opponents={opponents}
        startFight={startFight}
      />
    );
  } else if (state === 'fight') {
    return <BattleField fighters={fighters} />;
  }
};

export default Fight;
