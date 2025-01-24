import SportBar from "../components/SportBar";
import MatchList from "../components/MatchList";
import Bet from "../components/Bet";
import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../main";
import {
  fetchLocations,
  fetchMatches,
  fetchMatchStatuses,
  fetchParticipants,
  fetchSports,
  fetchEvents,
} from "../http/matchAPI";

const Matches = observer(() => {
  const { matches } = useContext(Context);

  useEffect(() => {
    fetchSports().then((data) => {
      matches.setSports(data);
      matches.setSelectedSport(data[0]);
    });
    fetchMatches(matches.selectedSport).then((data) => matches.setMatches(data));
    fetchParticipants().then((data) => matches.setParticipants(data));
    fetchMatchStatuses().then((data) => matches.setMatchStatuses(data));
    fetchLocations().then((data) => matches.setLocations(data));
    fetchEvents().then((data) => matches.setEvents(data));
  }, []);

  useEffect(() => {
    fetchMatches(matches.selectedSport).then((data) => matches.setMatches(data));
  }, [matches.selectedSport]);

  return (
    <div className="container matches">
      <SportBar />
      <div className="row flex-column-reverse flex-md-row">
        <div className="col-12 col-md-8 g-md">
          <MatchList />
        </div>
        <div className="col-12 col-md-4">
          <Bet />
        </div>
      </div>
    </div>
  );
});

export default Matches;
