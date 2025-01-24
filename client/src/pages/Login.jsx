import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginn } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../main";
import { MATCHES_ROUTE } from "../utils/consts";

const Login = observer(() => {
  const { user } = useContext(Context);
  const history = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      let data;
      data = await loginn(login, password);
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
        <div className="auth_right col-12">
          <h5 style={{ fontWeight: 700 }}>Авторизация</h5>

          <label htmlFor="">
            <span>логин</span>
            <input
              name="login"
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </label>

          <label htmlFor="">
            <span>пароль</span>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button style={{ marginTop: 16 }} type="button" className="green_button" onClick={signIn}>
            Войти
          </button>
        </div>
      </form>
    </>
  );
});

export default Login;
