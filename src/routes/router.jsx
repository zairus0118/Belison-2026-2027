import { createBrowserRouter } from "react-router";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "hobby/:pk", element: <Profile /> },
    ],
  },
]);