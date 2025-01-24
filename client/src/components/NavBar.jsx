import { Context } from "../main";
import React, { useContext } from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const history = useNavigate();
  const logOut = () => {
    history("/login");
    user.setUser({});
    user.setIsAuth(false);
    localStorage.setItem("token", "");
  };

  return (
    <>
      <div className="navbar">
        <div className="container">
          <a className="navbar_logo" onClick={() => history("/")}>
            <img src={logo} alt="" />
          </a>
          {user.isAuth ? (
            <div className="navbar_right">
              <div className="link_profile">
                <h5>
                  Пользователь:{" "}
                  <a onClick={() => history("/profile")} className="link">
                    {user.user.login}
                  </a>
                </h5>
              </div>
              {user.user.role === "ADMIN" ? (
                <button className="dark_button" onClick={() => history("/admin")}>
                  Админ панель
                </button>
              ) : null}
              <button onClick={() => logOut()} className="dark_button outline">
                Выйти
              </button>
            </div>
          ) : (
            <div className="navbar_right">
              <button className="dark_button" onClick={() => history("/registration")}>
                Регистрация
              </button>
              <button className="dark_button outline" onClick={() => history("/login")}>
                Войти
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
});

export default NavBar;
