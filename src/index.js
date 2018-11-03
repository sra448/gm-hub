import React from "react";
import { render } from "react-dom";

import { useRecordList } from "./helpers";
import Players from "./players";

const defaultPlayer = {
  name: "foo",
  ac: "",
  hp: ""
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
