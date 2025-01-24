import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import moment from "moment-timezone";
import { editEventResult, editMatchStatus, fetchMatches } from "../http/matchAPI";
import { observer } from "mobx-react-lite";
import icon_done from "../assets/icon_done.svg";
import icon_cancel from "../assets/icon_cancel.svg";
import icon_time from "../assets/icon_time.svg";

const MatchCard = observer(
  ({ name, date, matchSport, participants, events, statusId, matchId }) => {
    moment.tz.add(
      "Asia/Barnaul|LMT +06 +07 +08|-5z -60 -70 -80|0123232323232323232323212323232321212121212121212121212121212121212|-21S5z pCnz 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 p90 LE0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0|"
    );
    const objData = new Date(date);

    const { bet, matches, user } = useContext(Context);

    const [matchStatusId, setMatchStatusId] = useState(statusId);

    useEffect(() => {
      if (matchStatusId !== statusId) {
        // Только если статус изменился, вызываем изменения
        const updateMatchStatus = async () => {
          try {
            await editMatchStatus({ matchId, matchStatusId });
            console.log("Изменение");
            const data = await fetchMatches(matches.selectedSport);
            matches.setMatches(data);
          } catch (error) {
            console.error("Ошибка при изменении статуса матча", error);
          }
        };
        updateMatchStatus();
      }
    }, [matchStatusId, matchId, matches.selectedSport, matches]);

    const handleAddEvent = async (event) => {
      try {
        bet.addEvent(event);
      } catch (e) {
        alert(e.response.data.message);
      }
    };

    const handleChangeEventStatus = async (eventId, eventResultId) => {
      try {
        editEventResult({ eventId, eventResultId });
      } catch (e) {
        alert(e.response.data.message);
      }
    };

    return (
      <div className={`${user.user.role === "ADMIN" ? "g-sm" : ""}`}>
        <div className="match_card">
          <div className="match_left">
            <div className="match_title">
              {matchSport.name}: {name}.
            </div>
            <div className="match_desc">
              <div className="match_date">
                <span>{`${moment.tz(objData, "Asia/Barnaul").format("DD.MM.YYYY")}`}</span>
                <br />
                <span>{`${moment.tz(objData, "Asia/Barnaul").format("в HH:mm")}`}</span>
              </div>
              <div className="match_comands">
                {participants.map((participant) => (
                  <span key={participant.id}>{participant.name}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="match_right">
            {events
              ? events.map((event) => (
                  <div key={event.id} className="match_right_button">
                    {user.user.role === "ADMIN" ? (
                      <div className="button_group">
                        <button
                          className={`small gray_button ${
                            event.eventResultId === 1 ? "" : "outline"
                          }`}
                          onClick={() => handleChangeEventStatus(event.id, 1)}>
                          <img src={icon_time} alt="" />
                        </button>
                        <button
                          className={`small green_button ${
                            event.eventResultId === 2 ? "" : "outline"
                          }`}
                          onClick={() => handleChangeEventStatus(event.id, 2)}>
                          <img src={icon_done} alt="" />
                        </button>
                        <button
                          className={`small red_button ${
                            event.eventResultId === 3 ? "" : "outline"
                          }`}
                          onClick={() => handleChangeEventStatus(event.id, 3)}>
                          <img src={icon_cancel} alt="" />
                        </button>
                      </div>
                    ) : null}

                    <button
                      key={event.id}
                      className="match_event"
                      onClick={() => {
                        handleAddEvent(event);
                      }}>
                      <h5 className="match_coef">{event.coefficient.toFixed(1)}</h5>
                      <span>{event.name}</span>
                    </button>
                  </div>
                ))
              : null}
          </div>
        </div>
        <div className="button_group">
          {user.user.role === "ADMIN"
            ? matches.matchStatuses.map((matchStatus) => (
                <button
                  key={matchStatus.id}
                  className={`small ${
                    matchStatusId === matchStatus.id ? "green_button" : "light_button"
                  }`}
                  onClick={() => {
                    setMatchStatusId(matchStatus.id);
                  }}>
                  {matchStatus.name}
                </button>
              ))
            : null}
        </div>
      </div>
    );
  }
);

export default MatchCard;
