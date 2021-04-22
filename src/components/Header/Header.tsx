import React, { FC, useState } from "react";
import { Layout } from "antd";
import { NavLink } from "react-router-dom";
import Hamburger from "hamburger-react";

import "./header.scss";

const { Header } = Layout;

const Navbar: FC = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Layout>
      <Header className="header">
        <div className="nav-large">
          <div className="nav-left">
            <div className="app-name">STAR WARS</div>
          </div>

          <div className="nav-center"></div>

          <div className="nav-right">
            <ul>
              <li>
                <NavLink activeClassName="active" to="/people">
                  People
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" to="/planets">
                  Planets
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" to="/films">
                  Films
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" to="/species">
                  Species
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" to="/vehicles">
                  Vehicles
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" to="/starships">
                  Starships
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="mobile-nav">
          <Hamburger rounded size={20} toggled={isOpen} toggle={setOpen} />

          {isOpen ? (
            <div className="mobile-nav-menu">
              <ul>
                <li>
                  <NavLink to="/people" activeClassName="active">
                    People
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/planets" activeClassName="active">
                    Planets
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/films" activeClassName="active">
                    Films
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/species" activeClassName="active">
                    Species
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/vehicles" activeClassName="active">
                    Vehicles
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/starships" activeClassName="active">
                    Starships
                  </NavLink>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </Header>
    </Layout>
  );
};

export default Navbar;
