import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (full_name, login, password, email, birthday, phone) => {
  console.log(
    "userApi:\nФИО:",
    full_name,
    "логин:",
    login,
    "пароль:",
    password,
    "почта:",
    email,
    "рождение:",
    birthday,
    "тел:",
    phone
  );
  const { data } = await $host.post("api/user/registration", {
    full_name,
    phone,
    birthday,
    email,
    login,
    password,
  });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const loginn = async (login, password) => {
  const { data } = await $host.post("api/user/login", { login, password });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const fetchBalance = async (userId) => {
  const { data } = await $authHost.get("api/balance", { params: { userId } });
  return data;
};

export const fetchVerification = async (id) => {
  const { data } = await $authHost.get("api/verification", { params: { id } });
  return data;
};
