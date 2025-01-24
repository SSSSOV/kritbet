import { createContext, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./main.css";
import UserStore from "./store/UserStore.js";
import MatchStore from "./store/MatchStore.js";
import BetStore from "./store/BetStore.js";

export const Context = createContext(null);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Context.Provider
      value={{
        user: new UserStore(),
        matches: new MatchStore(),
        bet: new BetStore(),
      }}>
      <App />
    </Context.Provider>
  </StrictMode>
);
