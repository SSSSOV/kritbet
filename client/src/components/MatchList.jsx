import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../main";
import MatchCard from "./MatchCard";
import { fetchMatches } from "../http/matchAPI";

function compareById(a, b) {
  var dateA = new Date(a.id);
  var dateB = new Date(b.id);

  return dateA - dateB;
}

const MatchList = observer(() => {
  const { matches } = useContext(Context);

  return (
    <div className="match_list">
      {matches.matches.map((match) => (
        <MatchCard
          key={match.id}
          name={match.name}
          date={match.date}
          matchStatus={matches.matchStatuses.find(({ id }) => id === match.matchStatusId)}
          matchSport={matches.sports.find(({ id }) => id === match.matchSportId)}
          location={matches.locations.find(({ id }) => id === match.locationId)}
          participants={match.participants}
          events={
            matches.events
              ? matches.events.filter(({ matchId }) => matchId === match.id).sort(compareById)
              : null
          }
          statusId={match.matchStatusId}
          matchId={match.id}
        />
      ))}
    </div>
  );
});

export default MatchList;
