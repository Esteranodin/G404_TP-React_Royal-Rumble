import { useState } from "react";
import PlayerCard from "./PlayerCard";

function PlayerList() {
  const [players] = useState({
    1: { name: "John", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 1 },
    2: { name: "Jack", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 2 },
    3: { name: "Jessy", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 3 },
    4: { name: "Jenny", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 4 },
  });

  return (
    <div className="row">
      {Object.values(players).map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}
    </div>
  );
}

export default PlayerList;
