import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import routes from "./routes";
//import App from "../App";

const Routing = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            {routes.map((route) => {
              return (
                <li key={route.path}>
                  <Link to={route.path}>{route.name}</Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.component}
              ></Route>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
};

export default Routing;
