import React, { useContext, useEffect, useState } from "react";
import BetEvent from "./BetEvent";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import { createBet } from "../http/betAPI";

const Bet = observer(() => {
  const { bet, user } = useContext(Context);

  const [betAmount, setBetAmount] = useState(1000);

  const handleClearBet = async () => {
    bet.clearEvents();
  };
  const handleCreateBet = async () => {
    if (!user.isAuth) {
      alert("Вы не авторизованы!");
      return;
    }
    if (bet.events.length < 1) {
      alert("События не выбраны!");
      return;
    }
    let betEventsId = [];
    bet.events.map(({ id }) => betEventsId.push(id));

    const created_bet = await createBet({
      coefficient: bet.coefficient,
      bet_amount: betAmount,
      userId: user.user.id,
      betStatusId: 1,
      betTypeId: bet.events.length > 1 ? 2 : 1,
      betEventsId,
    }).then(() => {
      bet.clearEvents();
      alert("Ставка создана!");
    });
  };

  return (
    <div className="bet">
      <h5>Корзина</h5>
      <div className="bet_buttons">
        <div className="bet_type">
          <button className={`dark_button small ${bet.events.length > 1 ? "outline" : ""}`}>
            ординар
          </button>
          <button className={`dark_button small ${bet.events.length <= 1 ? "outline" : ""}`}>
            экспресс
          </button>
        </div>
        <button className="green_button small" onClick={handleClearBet}>
          очистить
        </button>
      </div>
      <div className="bet_events">
        {bet.events && bet.events.length > 0 ? (
          bet.events.map((event) => <BetEvent key={event.id} event={event} />)
        ) : (
          <p style={{ textAlign: "center" }}>Нет событий</p>
        )}
      </div>
      <div className="bet_control">
        <label htmlFor="">
          <span>сумма ставки</span>
          <div className="bet_row">
            <input
              name="amount"
              type="number"
              onChange={(e) => setBetAmount(e.target.value)}
              value={betAmount}
            />
            <h5 className="match_coef">{bet.coefficient.toFixed(2)}x</h5>
          </div>
        </label>
        <button
          style={{ marginTop: 8 }}
          type="submit"
          className="green_button"
          onClick={handleCreateBet}>
          Сделать ставку
        </button>
      </div>
    </div>
  );
});

export default Bet;
