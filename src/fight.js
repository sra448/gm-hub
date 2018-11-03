import React, { useState, Fragment } from 'react';
import { over, lensProp } from 'ramda';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
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

const FightPreparation = () => {
  const [current, setCurrent] = useState('');
  const [opponents, addOpponent, _del, _set, overOpponent] = useRecordList([]);
  const opponentsCount = opponents.reduce((count, o) => o.count + count, 0);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Fight Preparation
      </Typography>
      <Paper>
        <div>
          <TextField
            value={current}
            onChange={e => setCurrent(e.target.value)}
          />
          <Button
            onClick={() => {
              addOpponent({ name: current, count: 1 });
              setCurrent('');
            }}
          >
            add
          </Button>
        </div>
        <List>
          {opponents.map(opponent => (
            <Fragment key={opponent.name}>
              <Opponent opponent={opponent} overOpponent={overOpponent} />
              <Divider />
            </Fragment>
          ))}
        </List>{' '}
      </Paper>
      <Button disabled={opponentsCount < 1}>Start Fight</Button>
    </div>
  );
};

export default FightPreparation;
