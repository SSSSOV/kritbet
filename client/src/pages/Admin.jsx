// client\src\pages\Admin.jsx
import React, { useContext, useState, useEffect } from "react";
import moment from "moment-timezone";
import {
  createCity,
  createCountry,
  createEvent,
  createLocation,
  createMatch,
  createParticipant,
  createSport,
  fetchCities,
  fetchCountries,
  fetchLocations,
  fetchMatches,
  fetchMatchStatuses,
  fetchParticipants,
  fetchSports,
} from "../http/matchAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../main";

const Admin = observer(() => {
  const { matches } = useContext(Context);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = () => {
    fetchCountries().then((data) => matches.setCountries(data));
    fetchCities().then((data) => matches.setCities(data));
    fetchLocations().then((data) => matches.setLocations(data));
    fetchParticipants().then((data) => matches.setParticipants(data));
    fetchSports().then((data) => matches.setSports(data));
    fetchMatches().then((data) => matches.setMatches(data));
    fetchMatchStatuses().then((data) => matches.setMatchStatuses(data));
  };

  const [countryName, setCountry] = useState("");
  const [cityName, setCity] = useState("");
  const [locationName, setLocation] = useState("");
  const [locationCapacity, setLocationCapacity] = useState(1000);
  const [sportName, setSport] = useState("");
  const [matchName, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [participant1Name, setParticipant1] = useState("");
  const [participant1type, setParticipant1type] = useState("Команда");
  const [participant2Name, setParticipant2] = useState("");
  const [participant2type, setParticipant2type] = useState("Команда");
  const [c1Value, setC1] = useState(1);
  const [c2Value, setC2] = useState(1);
  const [c3Value, setC3] = useState(1);

  const addMatch = async () => {
    fetchAll();

    // Страна
    if (!countryName) {
      alert("Введите название страны!");
      return;
    }
    let country = await matches.countries.find(({ name }) => name === countryName);
    if (!country) country = await createCountry({ name: countryName });

    // Город
    if (!cityName) {
      alert("Введите название города!");
      return;
    }
    let city = await matches.cities.find(({ name }) => name === cityName);
    if (!city) city = await createCity({ name: cityName, countryId: country.id });

    // Локация
    if (!locationName) {
      alert("Введите название локации!");
      return;
    }
    let location = await matches.locations.find(({ name }) => name === locationName);
    if (!location) {
      if (!locationCapacity) {
        alert("Введите вместительность локации!");
        return;
      }
      location = await createLocation({
        name: locationName,
        cityId: city.id,
        capacity: locationCapacity,
      });
    }

    // Спорт
    if (!sportName) {
      alert("Введите название спорта!");
      return;
    }
    let sport = await matches.sports.find(({ name }) => name === sportName);
    if (!sport) sport = await createSport({ name: sportName });

    // Участник 1
    if (!participant1Name) {
      alert("Введите название первого участника!");
      return;
    }
    let participant1 = await matches.participants.find(({ name }) => name === participant1Name);
    if (!participant1) {
      if (!participant1type) {
        alert("Введите тип первого участника!");
        return;
      }
      let participantTypeId = participant1type === "Команда" ? 1 : 2;
      participant1 = await createParticipant({ name: participant1Name, participantTypeId });
    }

    // Участник 2
    if (!participant2Name) {
      alert("Введите название второго участника!");
      return;
    }
    let participant2 = await matches.participants.find(({ name }) => name === participant2Name);
    if (!participant2) {
      if (!participant2type) {
        alert("Введите тип второго участника!");
        return;
      }
      let participantTypeId = participant2type === "Команда" ? 1 : 2;
      participant2 = await createParticipant({ name: participant2Name, participantTypeId });
    }

    // Дата
    let matchDateString = `${date} ${time}`;
    moment.tz.add(
      "Asia/Barnaul|LMT +06 +07 +08|-5z -60 -70 -80|0123232323232323232323212323232321212121212121212121212121212121212|-21S5z pCnz 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 p90 LE0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0|"
    );
    const formattedDate = moment
      .tz(matchDateString, "Asia/Barnaul")
      .format("YYYY-MM-DD HH:mm:ss.SSS Z");

    // Матч
    const match = await createMatch({
      name: matchName,
      date: formattedDate,
      matchStatusId: 1,
      matchSportId: sport.id,
      locationId: location.id,
      participantIds: [participant1.id, participant2.id],
    });

    await createEvent({
      name: "П1",
      coefficient: c1Value,
      eventResultId: 1,
      matchId: match.id,
    });
    await createEvent({
      name: "Ничья",
      coefficient: c2Value,
      eventResultId: 1,
      matchId: match.id,
    });
    await createEvent({
      name: "П2",
      coefficient: c3Value,
      eventResultId: 1,
      matchId: match.id,
    });

    alert("Матч создан!");

    setCountry("");
    setCity("");
    setLocation("");
    setLocationCapacity(1000);
    setSport("");
    setName("");
    setDate("");
    setTime("");
    setParticipant1("");
    setParticipant1type("Команда");
    setParticipant2("");
    setParticipant2type("Команда");
    setC1(1);
    setC2(1);
    setC3(1);
    fetchAll();
  };

  return (
    <div className="admin">
      <form className="add_match" action="add">
        <h5 style={{ fontWeight: 700 }}>Добавление матча</h5>

        <div className="form_row">
          <label htmlFor="country">
            <span>страна</span>
            <input
              name="country"
              type="text"
              value={countryName}
              onChange={(e) => setCountry(e.target.value)}
            />
          </label>

          <label htmlFor="city">
            <span>город</span>
            <input
              name="city"
              type="text"
              value={cityName}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
        </div>
        <div className="form_row">
          <label htmlFor="location">
            <span>название локации</span>
            <input
              name="location"
              type="text"
              value={locationName}
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>

          <label htmlFor="locationCapacity">
            <span>вместительность локации</span>
            <input
              name="locationCapacity"
              type="number"
              value={locationCapacity}
              onChange={(e) => setLocationCapacity(e.target.value)}
            />
          </label>
        </div>

        <label htmlFor="sport">
          <span>вид спорта</span>
          <input
            name="sport"
            type="text"
            value={sportName}
            onChange={(e) => setSport(e.target.value)}
          />
        </label>

        <label htmlFor="name">
          <span>название матча</span>
          <input
            name="name"
            type="text"
            value={matchName}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <div className="form_row">
          <label htmlFor="date">
            <span>дата</span>
            <input name="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          <label htmlFor="time">
            <span>время</span>
            <input name="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </label>
        </div>

        <div className="form_row">
          <label htmlFor="participant1">
            <span>первый участник</span>
            <input
              name="participant1"
              type="text"
              value={participant1Name}
              onChange={(e) => setParticipant1(e.target.value)}
            />
          </label>

          <label htmlFor="participant1type">
            <span>тип участника (команда/игрок)</span>
            <input
              name="participant1type"
              type="text"
              value={participant1type}
              onChange={(e) => setParticipant1type(e.target.value)}
            />
          </label>
        </div>
        <div className="form_row">
          <label htmlFor="participant2">
            <span>второй участник</span>
            <input
              name="participant2"
              type="text"
              value={participant2Name}
              onChange={(e) => setParticipant2(e.target.value)}
            />
          </label>
          <label htmlFor="participant2type">
            <span>тип участника (команда/игрок)</span>
            <input
              name="participant2type"
              type="text"
              value={participant2type}
              onChange={(e) => setParticipant2type(e.target.value)}
            />
          </label>
        </div>

        <label htmlFor="coeffients">
          <span>коэффициенты на П1, Н, П2</span>
          <div id="coeffients" className="inputs">
            <input
              name="coef1"
              placeholder="Победа 1"
              type="number"
              max={10}
              min={0}
              step={0.1}
              value={c1Value}
              onChange={(e) => setC1(e.target.value)}
            />
            <input
              name="coef2"
              placeholder="Ничья"
              type="number"
              max={10}
              min={0}
              step={0.1}
              value={c2Value}
              onChange={(e) => setC2(e.target.value)}
            />
            <input
              name="coef3"
              placeholder="Победа 2"
              type="number"
              max={10}
              min={0}
              step={0.1}
              value={c3Value}
              onChange={(e) => setC3(e.target.value)}
            />
          </div>
        </label>

        <button style={{ marginTop: 16 }} type="button" className="green_button" onClick={addMatch}>
          Добавить
        </button>
      </form>
    </div>
  );
});

export default Admin;
