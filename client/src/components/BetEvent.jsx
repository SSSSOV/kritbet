import React, { useContext } from "react";
import icon_delete from "../assets/icon_delete.svg";
import { Context } from "../main";

const BetEvent = ({ event }) => {
  const { matches, bet } = useContext(Context);

  const match = matches.matches.find(({ id }) => id === event.matchId);
  const sport = matches.sports.find(({ id }) => id === match.matchSportId);

  const handleDelEvent = async (id) => {
    try {
      bet.deleteEventById(id);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <div className="bet_event">
      <div className="event_left">
        <h5>
          {event.name} - {event.coefficient.toFixed(1)}
        </h5>
        <span>
          {sport.name}: {match.name}.
          <br />
          {match.participants.map((participant) => (
            <span key={participant.id}>{participant.name + " "}</span>
          ))}
        </span>
      </div>
      <div className="event_right">
        <button className="event_del" onClick={() => handleDelEvent(event.id)}>
          <img src={icon_delete} alt="" />
        </button>
      </div>
    </div>
  );
};

export default BetEvent;
