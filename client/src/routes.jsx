import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Matches from "./pages/Matches";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  MATCHES_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
} from "./utils/consts";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: PROFILE_ROUTE,
    Component: Profile,
  },
];

export const publicRoutes = [
  {
    path: MATCHES_ROUTE,
    Component: Matches,
  },
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Registration,
  },
];
