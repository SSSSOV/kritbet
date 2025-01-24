import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { fetchBalance, fetchVerification } from "../http/userAPI";
import moment from "moment-timezone";
import { fetchBets, fetchBetStatuses, fetchBetTypes, fetchEventResults } from "../http/betAPI";
import {
  fetchEvents,
  fetchLocations,
  fetchMatches,
  fetchMatchStatuses,
  fetchParticipants,
  fetchSports,
} from "../http/matchAPI";
import { observer } from "mobx-react-lite";

function Profile() {
  const { user, bet, matches } = useContext(Context);

  moment.tz.add(
    "Asia/Barnaul|LMT +06 +07 +08|-5z -60 -70 -80|0123232323232323232323212323232321212121212121212121212121212121212|-21S5z pCnz 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 p90 LE0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0|"
  );

  const [balance, setBalance] = useState({});
  const [verification, setVerification] = useState({});
  const [bets, setBets] = useState([]);

  useEffect(() => {
    fetchBets(user.user.id).then((data) => {
      setBets(data);
      bet.setBets(data);
    });
    fetchBalance(user.user.id).then((data) => setBalance(data));
    fetchVerification(user.user.userVerificationId).then((data) => setVerification(data));
  }, []);

  useEffect(() => {
    fetchSports().then((data) => matches.setSports(data));
    fetchMatches().then((data) => matches.setMatches(data));
    fetchParticipants().then((data) => matches.setParticipants(data));
    fetchMatchStatuses().then((data) => matches.setMatchStatuses(data));
    fetchLocations().then((data) => matches.setLocations(data));
    fetchEvents().then((data) => matches.setEvents(data));
    fetchEventResults().then((data) => bet.setEventResults(data));
    fetchBetTypes().then((data) => bet.setBetTypes(data));
    fetchBetStatuses().then((data) => bet.setBetStatuses(data));
  }, []);

  return (
    <div className="container">
      <div className="profile">
        <div className="profile_card">
          <h5>Личный кабинет</h5>
          <div className="profile_card_content">
            <div className="profile_card_lk">
              <h5>{user.user.login}</h5>
              <button className="dark_button outline">Выйти</button>
            </div>
          </div>
        </div>
        <div className="profile_card">
          <h5>Баланс</h5>
          <div className="profile_card_content">
            <div className="profile_card_lk">
              <h5>{balance.amount} ₽</h5>
              <div className="button_group">
                <button className="green_button">Пополнить</button>
                <button className="dark_button outline">Вывести</button>
              </div>
            </div>
          </div>
        </div>
        <div className="profile_card">
          <div className="profile_card_title">
            <h5>Верификация</h5>
            {verification.id === 1 ? (
              <span className="verif" style={{ color: "tomato" }}>
                {verification.name}
              </span>
            ) : (
              <span className="verif">{verification.name}</span>
            )}
          </div>
          <div className="profile_card_content">
            <div className="name_group">
              <label htmlFor="surname">
                <span>фамилия</span>
                <input
                  name="surname"
                  type="text"
                  value={user.user.full_name.split(" ")[0]}
                  readOnly
                />
              </label>
              <label htmlFor="name">
                <span>имя</span>
                <input name="name" type="text" value={user.user.full_name.split(" ")[1]} readOnly />
              </label>
              <label htmlFor="patronymic">
                <span>отчество</span>
                <input
                  name="patronymic"
                  type="text"
                  value={user.user.full_name.split(" ")[2]}
                  readOnly
                />
              </label>
            </div>
          </div>
        </div>
        <div className="profile_card">
          <h5>Контакты</h5>
          <div className="profile_card_content">
            <div className="name_group">
              <label htmlFor="email">
                <span>почта</span>
                <input name="email" type="email" value={user.user.email} readOnly />
              </label>
              <label htmlFor="phone">
                <span>номер телефона</span>
                <input name="phone" type="tel" value={user.user.phone} readOnly />
              </label>
            </div>
          </div>
        </div>
        <div className="profile_card">
          <h5>Ваши последние ставки:</h5>
        </div>
        {bet.bets.length > 0 ? (
          <div className="profile_bets">
            {bet.bets.map((bett) => (
              <div key={bett.id} className="profile_bet">
                <div className="button_group">
                  <h5>Ставка #{bett.id}</h5>
                  <a className="button dark_button small outline">
                    {bet.betTypes.find(({ id }) => id === bett.betTypeId).name}
                  </a>
                  {bett.events.find(({ eventResultId }) => eventResultId === 3) ? (
                    <a className="button red_button small">
                      {bet.betStatuses.find(({ id }) => id === 3).name}
                    </a>
                  ) : bett.events.filter(({ eventResultId }) => eventResultId === 2) &&
                    bett.events.filter(({ eventResultId }) => eventResultId === 2).length ===
                      bett.events.length ? (
                    <a className="button green_button small">
                      {bet.betStatuses.find(({ id }) => id === 2).name}
                    </a>
                  ) : (
                    <a className="button gray_button small outline">
                      {bet.betStatuses.find(({ id }) => id === 1).name}
                    </a>
                  )}
                </div>
                <h5>События в ставке:</h5>
                {bett.events.map((event) => (
                  <div className="profile_bet_event" key={event.id}>
                    <div className="profile_bet_event_left">
                      <span>{matches.matches.find(({ id }) => id === event.matchId).name}: </span>
                      <h5>
                        {event.name} - {event.coefficient.toFixed(1)}x
                      </h5>
                    </div>
                    <div className="profile_bet_event_right">
                      <span>статус события: </span>
                      <a
                        className={`button small outline ${
                          event.eventResultId === 1
                            ? "gray_button"
                            : event.eventResultId === 2
                            ? "green_button"
                            : "red_button"
                        }`}>
                        {bet.eventResults.find(({ id }) => id === event.eventResultId).name}
                      </a>
                    </div>
                  </div>
                ))}
                <div className="profile_bet_row">
                  <h5>Сумма: {bett.bet_amount} ₽</h5>
                  <h5>Коэффициент: {bett.coefficient.toFixed(2)}x</h5>
                  <span>Выигрыш: {(bett.bet_amount * bett.coefficient).toFixed(2)} ₽</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="profile_card">
            <h5>Ставок нет</h5>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
