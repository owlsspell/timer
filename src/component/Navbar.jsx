import s from "./Nav.module.css";
import React from "react";
import { withRouter, Switch, Route, NavLink } from "react-router-dom";
import Statistics from "./Statistics";
import HomeContainer from "./HomeContainer";

const Navbar = (props) => {
  console.log(props);
  return (
    <div>
      <ul className={s.menu}>
        <li title="home">
          <NavLink to="/" className={s.home}>
            Home
          </NavLink>
        </li>
        <li title="Statistics">
          <NavLink to="/statistics" className={s.search}>
            Statistics
          </NavLink>
        </li>
        {/* <li title="search">
          <NavLink to="#" className={s.search}>
            search
          </NavLink>
        </li>
        <li title="about">
          <NavLink to="#" className={s.about}>
            about
          </NavLink>
        </li>
        <li title="archive">
          <NavLink to="#" className={s.archive}>
            archive
          </NavLink>
        </li>
        <li title="contact">
          <NavLink to="#" className={s.contact}>
            contact
          </NavLink>
        </li> */}
      </ul>
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <HomeContainer
              user={props.user}
              isAuth={props.isAuth}
              toggleAurh={props.toggleAurh}
              getUserInBase={props.getUserInBase}
            />
          )}
        ></Route>
        <Route
          path="/statistics"
          component={() => (
            <Statistics
              id={props.user.id}
              getUserInBase={props.getUserInBase}
            />
          )}
        ></Route>
      </Switch>
    </div>
  );
};

export default withRouter(Navbar);
