import React, { Fragment, useState } from 'react';
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

const Fight = () => {
  const [current, setCurrent] = useState('');
  const [opponents, addOpponent, _del, _set, overOpponent] = useRecordList([]);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Fight
      </Typography>
      <Paper>
        <TextField
          label="name"
          value={current}
          variant="filled"
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
        <List>
          {opponents.map(opponent => (
            <Fragment key={opponent.name}>
              <ListItem>
                <ListItemText>{opponent.name}</ListItemText>
                <ListItemSecondaryAction>
                  <Button
                    onClick={() =>
                      overOpponent(opponent, o => {
                        o.count = Math.max(0, o.count - 1);
                        return o;
                      })
                    }
                  >
                    <RemoveIcon />
                  </Button>
                  {opponent.count}
                  <Button
                    onClick={() =>
                      overOpponent(opponent, o => {
                        o.count = o.count + 1;
                        return o;
                      })
                    }
                  >
                    <AddIcon />
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </Fragment>
          ))}
        </List>{' '}
      </Paper>
    </div>
  );
};

export default Fight;
