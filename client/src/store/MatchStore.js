import { makeAutoObservable } from "mobx";

function compare(a, b) {
  var dateA = new Date(a.date);
  var dateB = new Date(b.date);

  return dateA - dateB;
}

export default class MatchStore {
  constructor() {
    this._sports = [];
    this._countries = [];
    this._cities = [];
    this._locations = [];
    this._participants = [];
    this._events = [];
    this._matches = [];

    this._matchStatuses = [];

    this._selectedSport = {};
    makeAutoObservable(this);
  }

  // Виды спорты
  setSports(sports) {
    this._sports = sports;
  }
  get sports() {
    return this._sports;
  }

  // Страны
  setCountries(countries) {
    this._countries = countries;
  }
  get countries() {
    return this._countries;
  }

  // Города
  setCities(cities) {
    this._cities = cities;
  }
  get cities() {
    return this._cities;
  }

  // Локации
  setLocations(locations) {
    this._locations = locations;
  }
  get locations() {
    return this._locations;
  }

  // Участники
  setParticipants(participants) {
    this._participants = participants;
  }
  get participants() {
    return this._participants;
  }

  // События
  setEvents(events) {
    this._events = events;
  }
  get events() {
    return this._events;
  }

  // Матчи
  setMatches(matches) {
    this._matches = matches;
    this._matches.sort(compare);
    // console.log("Mathces ", this._matches);
    // this._matches.map((match) => match.events.sort(compareById));
  }
  get matches() {
    return this._matches;
  }

  // Выбранный спорт
  setSelectedSport(sport) {
    this._selectedSport = sport;
  }
  get selectedSport() {
    return this._selectedSport;
  }

  // Статусы матчей
  setMatchStatuses(statuses) {
    this._matchStatuses = statuses;
  }
  get matchStatuses() {
    return this._matchStatuses;
  }
}
