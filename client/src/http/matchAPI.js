// client\src\http\matchAPI.js
import { $authHost, $host } from "./index";

// Страны
export const createCountry = async (country) => {
  const { data } = await $authHost.post("api/country", country);
  return data;
};

export const fetchCountries = async () => {
  const { data } = await $host.get("api/country");
  return data;
};

// Города
export const createCity = async (city) => {
  const { data } = await $authHost.post("api/city", city);
  return data;
};

export const fetchCities = async () => {
  const { data } = await $host.get("api/city");
  return data;
};

// Локации
export const createLocation = async (location) => {
  const { data } = await $authHost.post("api/location", location);
  return data;
};

export const fetchLocations = async () => {
  const { data } = await $host.get("api/Location");
  return data;
};

// Участники
export const createParticipant = async (participant) => {
  const { data } = await $authHost.post("api/participant", participant);
  return data;
};

export const fetchParticipants = async () => {
  const { data } = await $host.get("api/participant");
  return data;
};

// Виды спорта
export const createSport = async (sport) => {
  const { data } = await $authHost.post("api/sport", sport);
  return data;
};

export const fetchSports = async () => {
  const { data } = await $host.get("api/sport");
  return data;
};

// Матчи
export const createMatch = async (match) => {
  const { data } = await $authHost.post("api/match", match);
  return data;
};

export const fetchMatches = async (selectedSport) => {
  if (!selectedSport || selectedSport.name === "Все") {
    const { data } = await $host.get("api/match");
    return data;
  } else {
    const { data } = await $host.get("api/match", {
      params: { matchSportId: selectedSport.id },
    });
    return data;
  }
};

// События
export const createEvent = async (event) => {
  const { data } = await $authHost.post("api/event", event);
  return data;
};

export const fetchEvents = async () => {
  const { data } = await $host.get("api/event");
  return data;
};

// Статусы матчей
export const createMatchStatus = async (status) => {
  const { data } = await $authHost.post("api/match/status", status);
  return data;
};

export const editMatchStatus = async (body) => {
  const { data } = await $authHost.patch("api/match", body);
  return data;
};

export const editEventResult = async (body) => {
  const { data } = await $authHost.patch("api/event", body);
  return data;
};

export const fetchMatchStatuses = async () => {
  const { data } = await $host.get("api/match/status");
  return data;
};
