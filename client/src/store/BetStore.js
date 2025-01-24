import { makeAutoObservable } from "mobx";

export default class MatchStore {
  constructor() {
    this._events = [];
    this._betType = {};
    this._coefficient = 0;
    this._betAmount;
    this._bets = [];
    this._eventResults = [];
    this._betStatuses = [];
    this._betTypes = [];
    makeAutoObservable(this);
  }

  calculateBetCoefficient() {
    let coeficcient = 1;
    if (this._events.length < 1) coeficcient = 0;
    else
      this._events.map((event) => {
        coeficcient = coeficcient * event.coefficient;
      });
    this._coefficient = coeficcient;
  }
  get coefficient() {
    return this._coefficient;
  }

  addEvent(event) {
    if (!event) return;
    if (this._events.find(({ id }) => id === event.id)) {
      console.log("Это событие уже добавлено");
      return;
    }
    this._events.push(event);
    this.calculateBetCoefficient();
  }
  clearEvents() {
    this._coefficient = 0;
    this._events = [];
  }
  deleteEventById(id) {
    this._events = this._events.filter((event) => event.id !== id);
    this.calculateBetCoefficient();
  }
  get events() {
    return this._events;
  }

  setBetType(type) {
    this._betType = type;
  }
  get betType() {
    return this._betType;
  }

  setBetAmount(betAmount) {
    this._betAmount = betAmount;
  }
  get betAmount() {
    return this._betAmount;
  }

  setBets(bets) {
    this._bets = bets;
  }
  get bets() {
    return this._bets;
  }

  setEventResults(eventResults) {
    this._eventResults = eventResults;
  }
  get eventResults() {
    return this._eventResults;
  }

  setBetTypes(betTypes) {
    this._betTypes = betTypes;
  }
  get betTypes() {
    return this._betTypes;
  }

  setBetStatuses(betStatuses) {
    this._betStatuses = betStatuses;
  }
  get betStatuses() {
    return this._betStatuses;
  }
}
