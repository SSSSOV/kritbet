import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../main";
import { MATCHES_ROUTE } from "../utils/consts";
import logoAuth from "../assets/logo_auth.svg";

const Registration = observer(() => {
  const { user } = useContext(Context);
  const history = useNavigate();

  const [full_name, setFullName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");

  const register = async () => {
    try {
      let data;
      console.log(
        "Регистрация:\nФИО:",
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
      data = await registration(full_name, login, password, email, birthday, phone);
      console.log(data);
      user.setUser(data);
      user.setIsAuth(true);
      history(MATCHES_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <>
      <form className="auth row">
        <div className="auth_left col-md-6 col-12">
          <img src={logoAuth} alt="" />
        </div>

        <div className="auth_right col-md-6 col-12">
          <h5 style={{ fontWeight: 700 }}>Регистрация</h5>

          <label htmlFor="">
            <span>фамилия имя отчество</span>
            <input name="fullName" type="text" onChange={(e) => setFullName(e.target.value)} />
          </label>

          <label htmlFor="">
            <span>номер телефона</span>
            <input name="phone" type="tel" onChange={(e) => setPhone(e.target.value)} />
          </label>

          <label htmlFor="">
            <span>дата рождения</span>
            <input name="birthday" type="date" onChange={(e) => setBirthday(e.target.value)} />
          </label>

          <label htmlFor="">
            <span>почта</span>
            <input name="email" type="email" onChange={(e) => setEmail(e.target.value)} />
          </label>

          <label htmlFor="">
            <span>логин</span>
            <input name="login" type="text" onChange={(e) => setLogin(e.target.value)} />
          </label>

          <label htmlFor="">
            <span>пароль</span>
            <input name="password" type="password" onChange={(e) => setPassword(e.target.value)} />
          </label>

          <button
            style={{ marginTop: 16 }}
            type="button"
            className="green_button"
            onClick={register}>
            Зарегистрироваться
          </button>
        </div>
      </form>
    </>
  );
});

export default Registration;
