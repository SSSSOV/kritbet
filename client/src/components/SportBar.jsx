import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../main";

const SportBar = observer(() => {
  const { matches } = useContext(Context);

  return (
    <div className="sport_bar">
      {matches.sports.map((sport) => (
        <button
          key={sport.id}
          className={sport.id === matches.selectedSport.id ? "green_button" : "light_button"}
          onClick={() => matches.setSelectedSport(sport)}>
          {sport.name}
        </button>
      ))}
    </div>
  );
});

export default SportBar;
