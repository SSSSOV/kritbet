// client\src\http\betAPI.js
import { $authHost, $host } from "./index";

// Ставка
export const createBet = async (bet) => {
  const { data } = await $authHost.post("api/bet", bet);
  return data;
};
export const fetchBets = async (userId) => {
  const { data } = await $authHost.get("api/bet", { params: { userId } });
  return data;
};

// Статус события
export const fetchEventResults = async () => {
  const { data } = await $host.get("api/event/result");
  return data;
};

// Тип ставки
export const fetchBetTypes = async () => {
  const { data } = await $host.get("api/bet/type");
  return data;
};

// Статус ставки
export const fetchBetStatuses = async () => {
  const { data } = await $host.get("api/bet/status");
  return data;
};
